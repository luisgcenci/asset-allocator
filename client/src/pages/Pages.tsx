import { Box, Tab, Tabs } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import Home from "pages/home/Home";
import Investments from "pages/investments/Investments";
import React from "react";
import {
	calculateTotalPortfolio,
	calculateTotalTarget,
	getAllAssetClasses,
	getAllAssets,
	mapAssetClassesNames,
} from "store/features/dataSlice";
import styles from "./Pages.module.css";

const Pages: React.FC = () => {
	const [value, setValue] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(true);
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.data);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const renderContent = () => {
		switch (value) {
			case 0:
				return <Home data={data} />;
			case 1:
				return <Investments data={data} />;
		}
	};

	React.useEffect(() => {
		dispatch(getAllAssets());
		dispatch(getAllAssetClasses());
		dispatch(mapAssetClassesNames());
		dispatch(calculateTotalPortfolio());
		dispatch(calculateTotalTarget());
		setLoading(false);
	}, [dispatch]);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<Box className={styles.Pages}>
			<Box className={styles.Tabs}>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="HOME" />
					<Tab label="INVESTMENTS" />
				</Tabs>
			</Box>
			{renderContent()}
		</Box>
	);
};

export default Pages;
