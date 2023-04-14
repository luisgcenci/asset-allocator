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
  closeModal: () => void;
	open: boolean;
	updateData: () => void;
}

const AddAssetClassPopUp: React.FC<IAddAssetClassPopUp> = (
	props: IAddAssetClassPopUp
) => {
	const [formData, setFormData] = React.useState({
		name: '',
		amount: '',
		target: ''
	});
	const [alert, setAlert] = React.useState<React.ReactNode>();
	
	const handleSave = async () => {

		await AssetClasses.createAssetClass(
			formData.name,
			parseInt(formData.amount),
			parseInt(formData.target)
		);

		setAlert(
      <Alert severity='success'>
        new asset saved
      </Alert>
		);
		
		props.updateData();
	}

  return (
    <Dialog open={props.open} onClose={props.closeModal}>
      <DialogTitle align="center" style={{paddingTop: '3vh'}}>ADD NEW ASSET CLASS</DialogTitle>
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
				/>
        <TextField
          required
          autoFocus
          margin="dense"
					label="Amount"
					type="number"
          fullWidth
					variant="outlined"
					value={formData.amount}
					onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
					placeholder="1000"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
					}}
        />
				<TextField
          required
          autoFocus
          margin="dense"
          label="Target allocation"
          type="number"
          fullWidth
					variant="outlined"
					value={formData.target}
					onChange={(e) => setFormData({ ...formData, target: e.target.value })}
					placeholder="25"
					InputProps={{
						endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
			<DialogContent>
				{alert}
			</DialogContent>
    </Dialog>
  );
};

export default AddAssetClassPopUp;
