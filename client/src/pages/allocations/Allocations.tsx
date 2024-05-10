import styles from "./Allocations.module.css";
import AllocationsChart from "components/AllocationChart/AllocationsChart";
import Button from "@mui/material/Button";
import { AllocationsGrid } from "components/AllocationsGrid/AllocationsGrid";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AddAssetClassPopUp from "components/AddAssetClassPopUp/AddAssetClassPopUp";
import { Tooltip } from "@mui/material";
import { useAppSelector } from "hooks/hooks";
import { useUtils } from "hooks/useUtils";

const Allocations: React.FC = () => {
	const data = useAppSelector((state) => state.data);
	const [openModal, setOpenModal] = React.useState(false);
	const [simulationData, setSimulationData] = React.useState<{
		data: { asset_class_id: string; allocate: number }[];
	} | null>(null);
	const { sumMarketValue, calculateAllocation } = useUtils();

	const closeModal = () => {
		setOpenModal(false);
	};

	const handleRebalance = () => {
		const response = [];
		let amountToReinvest = 0;

		for (let i = 0; i < data.assetClasses.length; i++) {
			const current = data.assetClasses[i];
			const currentAmount = sumMarketValue(current.id);
			const currentAllocation = calculateAllocation(currentAmount);

			if (currentAllocation <= current.asset_classes_target) continue;

			const targetAmount = current.asset_classes_target * data.totalPortfolio;

			const amountToSell = Math.round(currentAmount - targetAmount);
			amountToReinvest += amountToSell;

			response.push({
				asset_class_id: current.id,
				allocate: -amountToSell,
			});
		}

		for (
			let i = 0;
			i < data.assetClasses.length && amountToReinvest >= 0;
			i++
		) {
			const current = data.assetClasses[i];
			const currentAmount = sumMarketValue(current.id);
			const currentAllocation = calculateAllocation(currentAmount);

			if (currentAllocation >= current.asset_classes_target) continue;

			const targetAmount = current.asset_classes_target * data.totalPortfolio;

			const amountToBuy = Math.min(
				Math.round(targetAmount - currentAmount),
				amountToReinvest
			);

			response.push({
				asset_class_id: current.id,
				allocate: amountToBuy,
			});

			amountToReinvest -= amountToBuy;
		}

		setSimulationData({
			data: response,
		});
	};

	return (
		<div className={styles.Home}>
			{openModal ? (
				<AddAssetClassPopUp open={openModal} closeModal={closeModal} />
			) : null}
			<h2>€{data.totalPortfolio.toLocaleString()}</h2>
			<div className={styles.Chart}>
				<AllocationsChart />
			</div>
			<Button
				className={styles.Rebalance}
				onClick={handleRebalance}
				color="primary"
				variant="outlined"
				size="small"
			>
				<strong>REBALANCE</strong>
			</Button>
			<div className={styles.Table}>
				<AllocationsGrid simulation={simulationData ?? undefined} />
			</div>
			<div className={styles.Buttons}>
				<div>
					<Tooltip
						title={
							data.totalTarget >= 1 ? "Total targets already sum to 100%" : ""
						}
					>
						<span>
							<Button
								color="primary"
								onClick={() => setOpenModal(true)}
								disabled={data.totalTarget >= 1 || simulationData != null}
							>
								<AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET CLASS</p>
							</Button>
						</span>
					</Tooltip>
				</div>
				<div>
					<Button
						color="warning"
						variant="outlined"
						disabled={!simulationData}
						onClick={() => setSimulationData(null)}
					>
						CLEAR
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Allocations;
