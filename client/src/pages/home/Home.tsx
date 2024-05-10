import Allocations from "pages/allocations/Allocations";
import styles from "./Home.module.css";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import Assets from "pages/assets/Assets";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import {
	calculateTotalPortfolio,
	calculateTotalTarget,
	getAllAssetClasses,
	getAllAssets,
	mapAssetClassesNames,
} from "store/features/dataSlice";

const Home: React.FC = () => {
	const [value, setValue] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(true);
	const dispatch = useAppDispatch();
	const update = useAppSelector((state) => state.data.update);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const renderContent = () => {
		switch (value) {
			case 0:
				return <Allocations />;
			case 1:
				return <Assets />;
		}
	};

	React.useEffect(() => {
		dispatch(getAllAssets());
		dispatch(getAllAssetClasses());
		dispatch(mapAssetClassesNames());
		dispatch(calculateTotalPortfolio());
		dispatch(calculateTotalTarget());
		setLoading(false);
	}, [dispatch, update]);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<Box className={styles.Home}>
			<Box>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="Allocations" />
					<Tab label="Assets" />
				</Tabs>
			</Box>
			{renderContent()}
		</Box>
	);
};

export default Home;
