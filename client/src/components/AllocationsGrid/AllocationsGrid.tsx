import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import React from "react";
import AssetClasses from "services/AssetClasses";
import styles from "./AllocationsGrid.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { updateAll } from "store/features/dataSlice";
import { useUtils } from "hooks/useUtils";

interface IAllocationsGrid {
	simulation?: {
		data: { asset_class_id: string; allocate: number }[];
	};
}

export const AllocationsGrid: React.FC<IAllocationsGrid> = React.memo(
	(props: IAllocationsGrid) => {
		const data = useAppSelector((state) => state.data);
		const dispatch = useAppDispatch();
		const { sumMarketValue, calculateAllocation } = useUtils();
		const columns: GridColDef[] = [
			{
				field: "assetClass",
				headerName: "Asset class",
				flex: 1,
				editable: true,
				headerAlign: "center",
				align: "center",
			},
			{
				field: "currentAmount",
				headerName: "Amount",
				flex: 0.5,
				editable: false,
				headerAlign: "center",
				align: "center",
				valueFormatter: ({ value }) => `€${Number(value).toLocaleString()}`,
			},
			{
				field: "newAmount",
				headerName: "",
				flex: 1,
				disableColumnMenu: true,
				hideSortIcons: true,
				headerAlign: "center",
				align: "left",
				renderCell: ({ value }) => {
					return value != 0 ? (
						<span style={{ color: value > 0 ? "green" : "red" }}>
							{Number(value).toLocaleString("en-US", {
								style: "currency",
								currency: "EUR",
							})}
						</span>
					) : (
						""
					);
				},
			},
			{
				field: "currentAllocation",
				headerName: "Allocation",
				flex: 0.5,
				headerAlign: "center",
				align: "center",
				valueFormatter: ({ value }) => `${value}%`,
			},
			{
				field: "newAllocation",
				headerName: "",
				flex: 1,
				disableColumnMenu: true,
				hideSortIcons: true,
				headerAlign: "center",
				align: "left",
				renderCell: ({ value }) => {
					return value[0] > 0 ? (
						<>
							{value[1] != 0 && (
								<span style={{ color: "orange", paddingRight: "1vw" }}>
									{Math.round(value[0] * 100)}%
								</span>
							)}

							{value[1] != 0 && (
								<span
									style={{
										color: value[1] > 0 ? "green" : "red",
										fontSize: "10px",
									}}
								>
									{value[1] > 0
										? "(+" + value[1] + "%)"
										: "(" + value[1] + "%)"}
								</span>
							)}
						</>
					) : (
						""
					);
				},
			},
			{
				field: "targetAllocation",
				headerName: "Target",
				flex: 1,
				editable: true,
				headerAlign: "center",
				align: "center",
				valueFormatter: ({ value }) => `${value}%`,
			},
			{
				field: "actions",
				headerName: "Actions",
				flex: 1,
				headerAlign: "center",
				align: "center",
				renderCell: ({ id }) => {
					return (
						id != -1 && (
							<DeleteIcon
								onClick={() => handleDelete(id.toString())}
								className={styles["delete-icon"]}
							/>
						)
					);
				},
			},
		];

		const handleDelete = async (id: string) => {
			const assetClassIsLinked = data.assets.some(
				(asset) => asset.expand.asset_class.id === id
			);

			if (!assetClassIsLinked) {
				await AssetClasses.deleteAssetClass(id);
				await dispatch(updateAll());
			}
		};

		type RowsType = {
			id: string;
			assetClass: string;
			currentAmount: number;
			newAmount: number;
			currentAllocation: number;
			newAllocation: [number, number];
			targetAllocation: number;
		};

		const getRows = (): RowsType[] => {
			const response: RowsType[] = [];

			data.assetClasses.forEach((assetClass) => {
				const currentAmount = sumMarketValue(assetClass.id);
				const currentAllocation = calculateAllocation(currentAmount);
				const newAmount =
					props.simulation?.data.find((d) => d.asset_class_id == assetClass.id)
						?.allocate ?? 0;
				const newAllocation = calculateAllocation(currentAmount + newAmount);
				const allocationChange = newAllocation - currentAllocation;

				response.push({
					id: assetClass.id,
					assetClass: assetClass.asset_classes_name,
					currentAmount: currentAmount,
					newAmount: newAmount,
					currentAllocation: parseFloat((currentAllocation * 100).toFixed(2)),
					newAllocation: [
						newAllocation,
						parseFloat((allocationChange * 100).toFixed(2)),
					],
					targetAllocation: parseFloat(
						(assetClass.asset_classes_target * 100).toFixed(2)
					),
				});
			});

			if (data.totalTarget < 1) {
				const notDefinedTarget = props.simulation?.data.find(
					(item) => item.asset_class_id == "-1"
				);
				let newCurrentAllocation = 0;
				let newAmount = 0;

				if (notDefinedTarget && props.simulation) {
					newAmount = notDefinedTarget.allocate;
					newCurrentAllocation =
						notDefinedTarget.allocate / data.totalPortfolio;
				}

				response.push({
					id: "-1",
					assetClass: "Not classified",
					currentAmount: 0,
					newAmount: newAmount,
					currentAllocation: 0,
					newAllocation: [newCurrentAllocation, newCurrentAllocation],
					targetAllocation: parseFloat(
						((1 - data.totalTarget) * 100).toFixed(2)
					),
				});
			}

			return response;
		};

		const handleRowUpdate = async (
			newRow: GridRowModel,
			oldRow: GridRowModel
		): Promise<GridRowModel> => {
			const newTargetAsNum =
				parseFloat(parseFloat(newRow.targetAllocation).toFixed(0)) / 100;

			if (isNaN(newTargetAsNum) || newTargetAsNum > 1) {
				return oldRow;
			}

			const updatedCurrentTotalTargetAmount =
				data.totalTarget - oldRow.targetAllocation / 100 + newTargetAsNum;

			if (updatedCurrentTotalTargetAmount <= 1) {
				await AssetClasses.updateAssetClass(
					newRow.id,
					newRow.assetClass,
					newTargetAsNum
				);

				await dispatch(updateAll());
				return newRow;
			}

			return oldRow;
		};

		return (
			<DataGrid
				autoHeight
				experimentalFeatures={{ newEditingApi: true }}
				columns={columns}
				rows={getRows()}
				editMode="row"
				isCellEditable={(params) => params.id != -1}
				isRowSelectable={(params) => params.id != -1}
				getRowClassName={(params) =>
					params.id == -1 ? styles["fixed-row"] : ""
				}
				processRowUpdate={handleRowUpdate}
			/>
		);
	}
);

AllocationsGrid.displayName = "Allocation Grid";
