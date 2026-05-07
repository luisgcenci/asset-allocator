import AddIcon from "@mui/icons-material/Add";
import { Box, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddAssetClassPopUp from "components/AddAssetClassPopUp/AddAssetClassPopUp";
import AddAssetPopUp from "components/AddAssetPopUp/AddAssetPopUp";
import { AllocationsGrid } from "components/AllocationsGrid/AllocationsGrid";
import { AssetsGrid } from "components/AssetsGrid/AssetsGrid";
import React from "react";
import type { dataState } from "store/features/dataSlice";
import styles from "./Investments.module.css";

interface InvestmentsProps {
	data: dataState;
}

const Investments: React.FC<InvestmentsProps> = (props: InvestmentsProps) => {
	const [addAssetModelOpen, setAddAssetModelOpen] = React.useState(false);
	const [addAssetClassModelOpen, setAddAssetClassModelOpen] =
		React.useState(false);

	const closeModal = () => {
		setAddAssetModelOpen(false);
		setAddAssetClassModelOpen(false);
	};

	const assetClassesExists = props.data.assetClasses.length > 0;

	return (
		<div className={styles.Investments}>
			{addAssetModelOpen ? (
				<AddAssetPopUp open={addAssetModelOpen} closeModal={closeModal} />
			) : null}
			{addAssetClassModelOpen ? (
				<AddAssetClassPopUp
					open={addAssetClassModelOpen}
					closeModal={closeModal}
				/>
			) : null}
			<Box className={styles.AssetClasses}>
				<Typography variant="h6" className={styles.PageTitle}>
					ASSET CLASSES
				</Typography>
				<div className={styles.Buttons}>
					<Tooltip
						title={
							props.data.totalTarget >= 1
								? "Total targets already sum up to 100%"
								: ""
						}
					>
						<span>
							<Button
								color="primary"
								onClick={() => setAddAssetClassModelOpen(true)}
								disabled={props.data.totalTarget >= 1}
							>
								<AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET CLASS</p>
							</Button>
						</span>
					</Tooltip>
				</div>
				<div className={styles.Grid}>
					<AllocationsGrid />
				</div>
			</Box>
			<Box className={styles.Assets}>
				<Typography variant="h6" className={styles.PageTitle}>
					ASSETS
				</Typography>
				<div className={styles.Buttons}>
					<div>
						<Button
							color="primary"
							onClick={() => setAddAssetModelOpen(true)}
							disabled={!assetClassesExists}
						>
							<AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET</p>
						</Button>
					</div>
				</div>
				<div className={styles.Grid}>
					<AssetsGrid />
				</div>
			</Box>
		</div>
	);
};

export default Investments;
