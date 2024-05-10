import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	MenuItem,
	TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import React from "react";
import AssetsService from "services/AssetsService";
import { updateAll } from "store/features/dataSlice";

interface IAddAssetPopUp {
	closeModal: () => void;
	open: boolean;
}

const AddAssetPopUp: React.FC<IAddAssetPopUp> = (props: IAddAssetPopUp) => {
	const [formData, setFormData] = React.useState({
		name: "",
		marketValue: 0,
		assetClass: "",
	});
	const [alert, setAlert] = React.useState<React.ReactNode>();
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.data);

	const handleSave = async () => {
		await AssetsService.createAsset(
			formData.name,
			formData.marketValue,
			formData.assetClass
		);

		setAlert(<Alert severity="success">new asset saved</Alert>);
		dispatch(updateAll());
	};

	const handleMarketValueInput = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const value = e.target.value.replace(/,/g, "");
		let valueAsNum = Number(value);
		valueAsNum = isNaN(valueAsNum) ? formData.marketValue : valueAsNum;
		setFormData({ ...formData, marketValue: valueAsNum });
	};

	return (
		<Dialog open={props.open} onClose={props.closeModal}>
			<DialogTitle align="center" style={{ paddingTop: "3vh" }}>
				ADD NEW ASSET
			</DialogTitle>
			<DialogContent>
				<TextField
					required
					autoFocus
					margin="dense"
					label="Name"
					type="text"
					fullWidth
					variant="outlined"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					placeholder="VOO"
					InputProps={{
						inputProps: {
							maxLength: 24,
						},
					}}
				/>
				<TextField
					required
					margin="dense"
					label="Market value"
					type="text"
					fullWidth
					variant="outlined"
					value={
						formData.marketValue > 0
							? Number(formData.marketValue).toLocaleString()
							: ""
					}
					onChange={(e) => handleMarketValueInput(e)}
					placeholder="1000"
					InputProps={{
						startAdornment: <InputAdornment position="start">€</InputAdornment>,
						inputProps: {
							maxLength: 8,
						},
					}}
				/>
				<TextField
					select
					required
					autoFocus
					margin="dense"
					label="Asset class"
					fullWidth
					variant="outlined"
					value={formData.assetClass}
					onChange={(e) =>
						setFormData({ ...formData, assetClass: e.target.value })
					}
					placeholder="STOCKS"
					InputProps={{
						inputProps: {
							maxLength: 24,
						},
					}}
				>
					{data.assetClasses.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.asset_classes_name}
						</MenuItem>
					))}
				</TextField>
			</DialogContent>
			<DialogActions style={{ marginRight: "1vw" }}>
				<Button
					color="error"
					variant="outlined"
					size="large"
					onClick={props.closeModal}
				>
					Cancel
				</Button>
				<Button variant="outlined" size="large" onClick={handleSave}>
					Save
				</Button>
			</DialogActions>
			<DialogContent>{alert}</DialogContent>
		</Dialog>
	);
};

export default AddAssetPopUp;
