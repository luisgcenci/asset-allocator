import { useAppSelector } from "./hooks";

interface useUtilsResponseType {
	sumMarketValue: (assetClassId: string) => number;
	calculateAllocation: (amount: number) => number;
}

export const useUtils = (): useUtilsResponseType => {
	const data = useAppSelector((state) => state.data);

	const sumMarketValue = (assetClassId: string): number => {
		return data.assets.reduce((sum, { asset_market_value, expand }) => {
			if (expand.asset_class.id === assetClassId) {
				return sum + asset_market_value;
			}
			return sum;
		}, 0);
	};

	const calculateAllocation = (amount: number): number => {
		return parseFloat((amount / data.totalPortfolio).toFixed(2));
	};

	const useUtilsResponse: useUtilsResponseType = {
		sumMarketValue: sumMarketValue,
		calculateAllocation: calculateAllocation,
	};

	return useUtilsResponse;
};
