import { Select, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useAppSelector } from "hooks/hooks";
import React from "react";

export const SelectEditInputCell: React.FC<GridRenderCellParams> = (
	props: GridRenderCellParams
) => {
	const { id, value, field } = props;
	const apiRef = useGridApiContext();
	const assetClasses = useAppSelector((state) => state.data.assetClasses);
	const [options, setOptions] = React.useState<JSX.Element[]>();

	const handleChange = async (event: SelectChangeEvent) => {
		await apiRef.current.setEditCellValue({
			id,
			field,
			value: event.target.value,
		});
		apiRef.current.stopCellEditMode({ id, field });
	};

	const fetchOptions = async () => {
		try {
			const assetClassesNames: JSX.Element[] = [];

			assetClasses.forEach((assetClass) => {
				assetClassesNames.push(
					<option key={assetClass.id}>{assetClass.asset_classes_name}</option>
				);
			});

			setOptions(assetClassesNames);
		} catch (e) {
			console.log(e);
			throw new Error(
				"Failed to load options for asset classes column in asset table. "
			);
		}
	};

	React.useEffect(() => {
		fetchOptions();
	}, []);

	return (
		<Select
			value={value}
			onChange={handleChange}
			size="small"
			sx={{ height: 1, width: "100%" }}
			native
			autoFocus
		>
			{options}
		</Select>
	);
};

SelectEditInputCell.displayName = "Select Edit Input Cell";
