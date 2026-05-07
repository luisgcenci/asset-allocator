import AddIcon from "@mui/icons-material/Add";
import { Box, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AllocationsChart from "components/AllocationChart/AllocationsChart";
import { AllocationsGrid } from "components/AllocationsGrid/AllocationsGrid";
import { useUtils } from "hooks/useUtils";
import styles from "pages/home/Home.module.css";
import React from "react";
import type { dataState } from "store/features/dataSlice";

interface AllocationsProps {
	data: dataState;
}

const Home: React.FC<AllocationsProps> = (props: AllocationsProps) => {
	const [simulationData, setSimulationData] = React.useState<{
		data: { asset_class_id: string; allocate: number }[];
	} | null>(null);
	const { sumMarketValue, calculateAllocation } = useUtils();

	const handleRebalance = () => {
		const response = [];
		let amountToReinvest = 0;

		for (let i = 0; i < props.data.assetClasses.length; i++) {
			const current = props.data.assetClasses[i];
			const currentAmount = sumMarketValue(current.id);
			const currentAllocation = calculateAllocation(currentAmount);

			if (currentAllocation <= current.asset_classes_target) continue;

			const targetAmount =
				current.asset_classes_target * props.data.totalPortfolio;

			const amountToSell = Math.round(currentAmount - targetAmount);
			amountToReinvest += amountToSell;

			response.push({
				asset_class_id: current.id,
				allocate: -amountToSell,
			});
		}

		for (
			let i = 0;
			i < props.data.assetClasses.length && amountToReinvest >= 0;
			i++
		) {
			const current = props.data.assetClasses[i];
			const currentAmount = sumMarketValue(current.id);
			const currentAllocation = calculateAllocation(currentAmount);

			if (currentAllocation >= current.asset_classes_target) continue;

			const targetAmount =
				current.asset_classes_target * props.data.totalPortfolio;

			const amountToBuy = Math.min(
				Math.round(targetAmount - currentAmount),
				amountToReinvest,
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

	const disabledActions = {
		rebalance: props.data.totalTarget < 1 || simulationData != null,
		addAssetClass: false,
		clear: !simulationData,
	};

	return (
		<div className={styles.Home}>
			<Typography variant="h6" className={styles.PageTitle}>
				INVESTMENTS
			</Typography>
			<div className={styles.ChartAndTotal}>
				<div className={styles.Chart}>
					<AllocationsChart />
				</div>
				<Box className={styles.TotalContainer}>
					<Typography className={styles.Total} variant="h3">
						€{props.data.totalPortfolio.toLocaleString()}
					</Typography>
				</Box>
			</div>
			<div className={styles.Table}>
				<AllocationsGrid simulation={simulationData ?? undefined} />
			</div>
			<div className={styles.Rebalance}>
				{simulationData ? (
					<Button
						color="warning"
						variant="contained"
						onClick={() => setSimulationData(null)}
					>
						CLEAR
					</Button>
				) : (
					<Tooltip
						followCursor
						title={
							disabledActions.rebalance &&
							"Make sure all asset classes are classified."
						}
					>
						<span>
							<Button
								onClick={handleRebalance}
								color="primary"
								variant="contained"
								size="small"
								disabled={disabledActions.rebalance}
							>
								<strong>REBALANCE PORTFOLIO</strong>
							</Button>
						</span>
					</Tooltip>
				)}
			</div>
		</div>
	);
};

export default Home;
