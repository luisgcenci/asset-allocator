import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AssetClasses, { AssetClass } from "services/AssetClasses";
import AssetsService, { UserAssetsData } from "services/AssetsService";

interface dataState {
	assets: UserAssetsData[];
	assetClasses: AssetClass[];
	assetClassesNamesMapping: Map<string, string>;
	update: boolean;
	totalTarget: number;
	totalPortfolio: number;
}

const initialState: dataState = {
	assets: [],
	assetClasses: [],
	assetClassesNamesMapping: new Map<string, string>(),
	update: false,
	totalTarget: 0,
	totalPortfolio: 0,
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		mapAssetClassesNames(state) {
			const assetClasses = state.assetClasses;
			const map = new Map<string, string>();
			assetClasses.forEach((assetClass) => {
				map.set(assetClass.asset_classes_name, assetClass.id);
			});

			state.assetClassesNamesMapping = map;
		},
		calculateTotalPortfolio(state) {
			state.totalPortfolio = state.assets.reduce(
				(sum, { asset_market_value }) => {
					return sum + asset_market_value;
				},
				0
			);
		},
		calculateTotalTarget(state) {
			state.totalTarget = parseFloat(
				state.assetClasses
					.reduce((sum, { asset_classes_target }) => {
						return sum + asset_classes_target;
					}, 0)
					.toFixed(2)
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllAssets.fulfilled, (state, action) => {
			state.assets = action.payload;
		});
		builder.addCase(getAllAssetClasses.fulfilled, (state, action) => {
			state.assetClasses = action.payload;
		});
		builder.addCase(updateAll.fulfilled, (state) => {
			state.update = !state.update;
		});
	},
});

export const getAllAssets = createAsyncThunk("data/getAllAssets", async () => {
	return await AssetsService.getAllAssets();
});

export const getAllAssetClasses = createAsyncThunk(
	"data/getAllAssetClasses",
	async () => {
		return await AssetClasses.getAll();
	}
);

export const updateAll = createAsyncThunk(
	"data/updateAll",
	async (_, { dispatch }) => {
		await dispatch(getAllAssets());
		await dispatch(getAllAssetClasses());
		dispatch(calculateTotalPortfolio());
		dispatch(calculateTotalTarget());
		dispatch(mapAssetClassesNames());
	}
);

export const {
	mapAssetClassesNames,
	calculateTotalPortfolio,
	calculateTotalTarget,
} = dataSlice.actions;

export default dataSlice.reducer;
