import styles from "./Home.module.css";
import AllocationsChart from "components/AllocationChart/AllocationsChart";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { AllocationsGrid } from "components/AllocationsGrid/AllocationsGrid";
import React, { useContext } from "react";
import AssetClasses, {
	AllocationSimulation,
	UserAssetClassesData,
} from "services/AssetClasses";
import AddIcon from "@mui/icons-material/Add";
import AddAssetClassPopUp from "components/AddAssetClassPopUp/AddAssetClassPopUp";
import { TextField } from "@mui/material";
import { Tooltip } from "@mui/material";

const Home: React.FC = () => {
	const [userAssetClassesData, setUserAssetClassesData] =
		React.useState<UserAssetClassesData>();
	const [openModal, setOpenModal] = React.useState(false);
	const [amountSimulation, setAmountSimulation] = React.useState<string>("");
	const [simulationData, setSimulationData] = React.useState<{
		newAmount: number;
		data: AllocationSimulation[];
	} | null>(null);
	
	const fetchAllAssetClassesData = async () => {
		const userAssetClassesData = await AssetClasses.getAllAssetClasses();

		setUserAssetClassesData({
			assetClasses: userAssetClassesData.assetClasses,
			totalPortfolio: userAssetClassesData.totalPortfolio,
			totalTarget: userAssetClassesData.totalTarget,
		});
	};

	React.useEffect(() => {
		fetchAllAssetClassesData();
	}, []);

	if (!userAssetClassesData) {
		return <div>loading...</div>;
	}

	const closeModal = () => {
		setOpenModal(false);
	};

	const handleSimulation = () => {
		if (!amountSimulation) {
			return;
		}

		const newAmount = Math.floor(
			parseFloat(amountSimulation.replace(/,/g, ""))
		);

		if (Number.isNaN(newAmount) || newAmount <= 0) {
			return;
		}

		setSimulationData({
			newAmount: newAmount,
			data: AssetClasses.calculateAllocation(
				newAmount,
				userAssetClassesData.assetClasses
			),
		});
	};

	const handleAmountSimulationInput = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		let value = e.target.value.replace(/,/g, "");
		let valueAsNum = Number(value);
		value = isNaN(valueAsNum) ? amountSimulation : valueAsNum.toLocaleString();
		setAmountSimulation(value);
	};

	return (
		<div className={styles.Home}>
			{openModal ? (
				<AddAssetClassPopUp
					currentTotalTarget={userAssetClassesData.totalTarget}
					open={openModal}
					closeModal={closeModal}
					updateData={fetchAllAssetClassesData}
				/>
			) : null}
			<h2>${userAssetClassesData.totalPortfolio.toLocaleString()}</h2>
			<div className={styles.Chart}>
				<AllocationsChart userAssetClassesData={userAssetClassesData} />
			</div>
			<div className={styles.SimulatorInput}>
				<TextField
					required
					autoFocus
					margin="dense"
					label="Amount"
					type="text"
					fullWidth
					variant="outlined"
					value={amountSimulation}
					onChange={(e) => {
						handleAmountSimulationInput(e);
					}}
					placeholder="Enter new amount to invest"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
						inputProps: {
							maxLength: 8,
						},
					}}
					style={{
						flex: 2,
						margin: "0 1vw 0 0",
					}}
				/>
				<Button
					onClick={handleSimulation}
					color="primary"
					variant="outlined"
					style={{
						width: "100%",
						height: "100%",
						flex: 3,
					}}
					size="small"
				>
					<strong>WHERE SHOULD I ALLOCATE IT TO?</strong>
				</Button>
			</div>
			<div className={styles.Table}>
				<AllocationsGrid
					updateData={fetchAllAssetClassesData}
					userAssetClassesData={userAssetClassesData}
					simulation={simulationData ?? undefined}
				/>
			</div>
			<div className={styles.Buttons}>
				<div>
					<Tooltip
						title={
							userAssetClassesData.totalTarget >= 1
								? "Total targets already sum to 100%"
								: ""
						}
					>
						<span>
							<Button
								color="primary"
								onClick={() => setOpenModal(true)}
								disabled={userAssetClassesData.totalTarget >= 1 || simulationData != null}
							>
								<AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET CLASS</p>
							</Button>
						</span>
					</Tooltip>
				</div>
				<div>
					{!simulationData && (
						<Button color="primary" variant="outlined">
							SAVE ALL
						</Button>
					)}
					{simulationData && (
						<Button
							color="warning"
							variant="outlined"
							disabled={!simulationData}
							onClick={() => setSimulationData(null)}
						>
							CLEAR
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
