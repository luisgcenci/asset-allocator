"use client";

import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AddAssetClassPopUp from "components/AddAssetClassPopUp/AddAssetClassPopUp";
import AllocationsChart from "components/AllocationChart/AllocationsChart";
import { AllocationsGrid } from "components/AllocationsGrid/AllocationsGrid";
import { useAppSelector } from "hooks/hooks";
import { useCallback, useMemo, useState } from "react";

import styles from "./page.module.css";

/**
 * AllocationsPage component
 *
 * Displays the user's portfolio allocations, allowing rebalancing of asset classes.
 * Integrates charts, data grid, and controls for adding asset classes and clearing simulations.
 *
 * Uses `useUtils` hook to calculate portfolio rebalancing based on asset classes and targets.
 *
 * State:
 * - `openModal`: controls visibility of the add asset class popup.
 * - `simulationData`: holds simulated allocation changes after rebalance.
 *
 * Handlers:
 * - `handleRebalance`: computes buy/sell actions to rebalance portfolio allocations.
 * - `closeModal`: closes the add asset class popup.
 *
 * Performance:
 * - Memoizes portfolio total formatting and handlers to minimize re-renders.
 */
export default function AllocationsPage() {
	const data = useAppSelector((state) => state.data);

	const [openModal, setOpenModal] = useState(false);

	const closeModal = useCallback(() => {
		setOpenModal(false);
	}, []);

	const formattedPortfolio = useMemo(
		() => data.totalPortfolio.toLocaleString(),
		[data.totalPortfolio],
	);

	return (
		<div className={styles.Home}>
			{openModal && (
				<AddAssetClassPopUp open={openModal} closeModal={closeModal} />
			)}

			<h2>€{formattedPortfolio}</h2>

			<div className={styles.Chart}>
				<AllocationsChart />
			</div>

			<div className={styles.Table}>
				<AllocationsGrid />
			</div>

			<div className={styles.Buttons}>
				<Tooltip
					title={
						data.totalTarget >= 1 ? "Total targets already sum to 100%" : ""
					}
				>
					<span>
						<Button
							color="primary"
							onClick={() => setOpenModal(true)}
							disabled={data.totalTarget >= 1 || simulationData !== undefined}
						>
							<AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET CLASS</p>
						</Button>
					</span>
				</Tooltip>

				<Button
					color="warning"
					variant="outlined"
					disabled={!simulationData}
					onClick={() => setSimulationData(undefined)}
				>
					CLEAR
				</Button>
			</div>
		</div>
	);
}
