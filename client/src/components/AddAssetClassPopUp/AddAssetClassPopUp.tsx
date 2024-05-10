import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	TextField,
} from "@mui/material";
import React from "react";
import AssetClasses from "services/AssetClasses";

interface IAddAssetClassPopUp {
	currentTotalTarget: number;
	closeModal: () => void;
	open: boolean;
	updateData: () => void;
}

const AddAssetClassPopUp: React.FC<IAddAssetClassPopUp> = (
	props: IAddAssetClassPopUp
) => {
	const [formData, setFormData] = React.useState({
		name: "",
		amount: 0,
		target: 0,
	});
	const [alert, setAlert] = React.useState<React.ReactNode>();

	const handleSave = async () => {
		await AssetClasses.createAssetClass(
			formData.name,
			formData.amount,
			formData.target
		);

		setAlert(<Alert severity="success">new asset saved</Alert>);

		props.updateData();
	};

	const handleAmountInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		let value = e.target.value.replace(/,/g, '');
		let valueAsNum = Number(value);
		valueAsNum = isNaN(valueAsNum) ? formData.amount : valueAsNum;
		setFormData({ ...formData, amount: valueAsNum })
	}

	const handleTargetInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		let value = Number(e.target.value);
		value = isNaN(value) || value > 100 || (value / 100) + props.currentTotalTarget > 1 ? formData.target : value;
		setFormData({ ...formData, target: value })
	}

	return (
		<Dialog open={props.open} onClose={props.closeModal}>
			<DialogTitle align="center" style={{ paddingTop: "3vh" }}>
				ADD NEW ASSET CLASS
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
					placeholder="STOCKS"
					InputProps={{
						inputProps: {
							maxLength: 24,
						},
					}}
				/>
				<TextField
					required
					margin="dense"
					label="Amount"
					type="text"
					fullWidth
					variant="outlined"
					value={
						formData.amount > 0 ? Number(formData.amount).toLocaleString() : ""
					}
					onChange={(e) => handleAmountInput(e)}
					placeholder="1000"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
						inputProps: {
							maxLength: 8,
						},
					}}
				/>
				<TextField
					required
					margin="dense"
					label="Target allocation"
					type="text"
					fullWidth
					variant="outlined"
					value={formData.target > 0 ? formData.target : ""}
					onChange={(e) => handleTargetInput(e)}
					placeholder={Math.round((1 - props.currentTotalTarget) * 100).toString()}
					InputProps={{
						endAdornment: <InputAdornment position="end">%</InputAdornment>,
						inputProps: {
							maxLength: 3,
						},
					}}
				/>
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

export default AddAssetClassPopUp;
