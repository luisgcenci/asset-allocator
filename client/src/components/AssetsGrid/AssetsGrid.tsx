import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import React from "react";
import styles from "./AssetsGrid.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Assets from "services/AssetsService";
import { SelectEditInputCell } from "components/SelectEditInputCell/SelectEditInputCell";
import AssetsService from "services/AssetsService";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { updateAll } from "store/features/dataSlice";

export const AssetsGrid: React.FC = React.memo(() => {
	const data = useAppSelector((state) => state.data);
	const dispatch = useAppDispatch();

	const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
		return <SelectEditInputCell {...params} />;
	};

	const columns: GridColDef[] = [
		{
			field: "asset",
			headerName: "Asset",
			flex: 1,
			editable: true,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "marketValue",
			headerName: "Market value",
			flex: 0.5,
			editable: true,
			headerAlign: "center",
			align: "center",
			valueFormatter: ({ value }) => `€${Number(value).toLocaleString()}`,
		},
		{
			field: "assetClass",
			headerName: "Asset class",
			flex: 1,
			editable: true,
			renderEditCell: renderSelectEditInputCell,
			headerAlign: "center",
			align: "center",
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

	type RowsType = {
		id: string;
		asset: string;
		marketValue: number;
		assetClass: string;
	};

	const getRows = (): RowsType[] => {
		const response: RowsType[] = [];

		data.assets.forEach((asset) => {
			response.push({
				id: asset.id,
				asset: asset.asset_name,
				marketValue: asset.asset_market_value,
				assetClass: asset.expand.asset_class.asset_classes_name,
			});
		});

		return response;
	};

	const handleDelete = async (id: string) => {
		await Assets.deleteAsset(id);
		await dispatch(updateAll());
	};

	const handleRowUpdate = async (newRow: GridRowModel) => {
		const assetClassId = data.assetClassesNamesMapping.get(newRow.assetClass);

		if (!assetClassId) {
			throw new Error(
				`Couldn't find an existing asset class id mapped to ${newRow.assetClass} `
			);
		}

		await AssetsService.update(
			newRow.id,
			newRow.asset,
			newRow.marketValue,
			assetClassId
		);

		await dispatch(updateAll());
		return newRow;
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
			getRowClassName={(params) => (params.id == -1 ? styles["fixed-row"] : "")}
			processRowUpdate={handleRowUpdate}
		/>
	);
});

AssetsGrid.displayName = "Allocation Grid";
