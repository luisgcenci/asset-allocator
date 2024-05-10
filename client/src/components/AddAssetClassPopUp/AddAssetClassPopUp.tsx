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
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import React from "react";
import AssetClasses from "services/AssetClasses";
import { updateAll } from "store/features/dataSlice";

interface IAddAssetClassPopUp {
	closeModal: () => void;
	open: boolean;
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
	const totalTarget = useAppSelector((state) => state.data.totalTarget);
	const dispatch = useAppDispatch();

	const handleSave = async () => {
		await AssetClasses.createAssetClass(formData.name, formData.target / 100);

		setAlert(<Alert severity="success">new asset saved</Alert>);

		await dispatch(updateAll());
	};

	const handleTargetInput = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		let value = Number(e.target.value);

		value =
			isNaN(value) || value > 100 || value + totalTarget * 100 > 100
				? formData.target
				: value;

		setFormData({ ...formData, target: value });
	};
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
					label="Target allocation"
					type="text"
					fullWidth
					variant="outlined"
					value={formData.target > 0 ? formData.target : ""}
					onChange={(e) => handleTargetInput(e)}
					placeholder={((1 - totalTarget) * 100).toFixed(0)}
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
