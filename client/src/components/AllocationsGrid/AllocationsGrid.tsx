import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowModesModel,
	GridRowParams,
	MuiEvent,
} from "@mui/x-data-grid";
import React from "react";
import AssetClasses, {
	AllocationSimulation,
	UserAssetClassesData,
} from "services/AssetClasses";
import styles from "./AllocationsGrid.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

interface IAllocationsGrid {
	userAssetClassesData: UserAssetClassesData;
	simulation?: {
		newAmount: number;
		data: AllocationSimulation[];
	};
	updateData: () => void;
}

export const AllocationsGrid: React.FC<IAllocationsGrid> = React.memo(
	(props: IAllocationsGrid) => {
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
				editable: true,
				headerAlign: "center",
				align: "center",
				valueFormatter: ({ value }) => `$${Number(value).toLocaleString()}`,
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
					return value > 0 ? (
						<span style={{ color: "green" }}>
							+ ${Number(value).toLocaleString()}
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
				valueFormatter: ({ value }) => `${Math.round(value * 100)}%`,
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
							{value[0] > 0 && (
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
										? "(+" + Math.round(value[1] * 100) + "%)"
										: "(" + Math.round(value[1] * 100) + "%)"}
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
				valueFormatter: ({ value }) => `${Math.round(value * 100)}%`,
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
			await AssetClasses.deleteAssetClass(id);
			props.updateData();
		};

		type RowsType = {
			id: number;
			assetClass: string;
			currentAmount: number;
			newAmount: number;
			currentAllocation: number;
			newAllocation: [number, number];
			targetAllocation: number;
		};

		const getRows = (): RowsType[] => {
			const getSimulationData = (
				assetClassId: number,
				assetClassAmount: number,
				portfolioValue: number
			): [number, number] => {
				if (!props.simulation) {
					return [0, 0];
				}

				const newInvested = props.simulation.data.find(
					(d) => d.asset_class_id == assetClassId
				)?.allocate ?? 0;

				const totalAmount = assetClassAmount + newInvested;
				const newPortfolioValue = portfolioValue + props.simulation.newAmount;

				const newCurrentAllocation = totalAmount / newPortfolioValue;
				
				return [newInvested, newCurrentAllocation];
			};

			const response: RowsType[] = [];
			const portfolioValue = props.userAssetClassesData.totalPortfolio;

			props.userAssetClassesData.assetClasses.forEach((assetClass) => {
				const [newInvested, newCurrentAllocation] = getSimulationData(
					assetClass.id,
					assetClass.asset_classes_amount,
					portfolioValue
				);

				let currentAllocation =
					portfolioValue > 0
						? assetClass.asset_classes_amount / portfolioValue
						: 0;

				const newAllocation = newCurrentAllocation;
				const allocationChange = newAllocation - currentAllocation;

				response.push({
					id: assetClass.id,
					assetClass: assetClass.asset_classes_name,
					currentAmount: assetClass.asset_classes_amount,
					newAmount: newInvested,
					currentAllocation: currentAllocation,
					newAllocation: [newAllocation, allocationChange],
					targetAllocation: assetClass.asset_classes_target,
				});
			});

			if (props.userAssetClassesData.totalTarget < 1) {
				let notDefinedTarget = props.simulation?.data.find(
					(item) => item.asset_class_id == -1
				);
				let newCurrentAllocation = 0;
				let newAmount = 0;

				if (notDefinedTarget && props.simulation) {
					newAmount = notDefinedTarget.allocate;
					const newPortfolioValue = portfolioValue + props.simulation.newAmount;
					newCurrentAllocation = notDefinedTarget.allocate / newPortfolioValue;
				}

				response.push({
					id: -1,
					assetClass: "Not classified",
					currentAmount: 0,
					newAmount: newAmount,
					currentAllocation: 0,
					newAllocation: [newCurrentAllocation, newCurrentAllocation],
					targetAllocation: 1 - props.userAssetClassesData.totalTarget,
				});
			}

			return response;
		};

		const handleRowUpdate = async (
			newRow: GridRowModel,
			oldRow: GridRowModel
		): Promise<GridRowModel> => {

			const newAmountAsNum = Number(Number(newRow.currentAmount).toFixed(0));
			const newTargetAsNum = Number(Number(newRow.targetAllocation).toFixed(2));

			if (
				isNaN(newAmountAsNum) || newAmountAsNum < 1 ||
				isNaN(newTargetAsNum) || newTargetAsNum < 0.01) {
				return oldRow;
			}

			const currentTotalTargetAmount = props.userAssetClassesData.totalTarget;
			const updatedCurrentTotalTargetAmount =
				currentTotalTargetAmount -
				oldRow.targetAllocation +
				newTargetAsNum;

			if (updatedCurrentTotalTargetAmount <= 1) {

				await AssetClasses.updateAssetClass(
					newRow.id,
					newRow.assetClass,
					newAmountAsNum,
					newTargetAsNum
				);

				props.updateData();
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
