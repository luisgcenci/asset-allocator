"use client";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import AddAssetPopUp from "components/AddAssetPopUp/AddAssetPopUp";
import { AssetsGrid } from "components/AssetsGrid/AssetsGrid";
import React from "react";
import styles from "./Assets.module.css";

export default function AssetsPage() {
	const [openModal, setOpenModal] = React.useState(false);

	const closeModal = () => {
		setOpenModal(false);
	};

	return (
		<div className={styles.Assets}>
			{openModal ? (
				<AddAssetPopUp open={openModal} closeModal={closeModal} />
			) : null}
			<div className={styles.Table}>
				<AssetsGrid />
			</div>
			<div className={styles.Buttons}>
				<div>
					<Button color="primary" onClick={() => setOpenModal(true)}>
						<AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET</p>
					</Button>
				</div>
			</div>
		</div>
	);
}
