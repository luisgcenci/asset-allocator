import { useMemo } from "react";
import { useAppSelector } from "./hooks";
import { AssetClass } from "services/AssetClasses";

export interface AllocationChange {
	asset_class_id: string;
	allocate: number;
}

interface useUtilsResponseType {
	sumMarketValue: (assetClassId: string) => number;
	calculateAllocation: (amount: number) => number;
	rebalancePortfolio: () => AllocationChange[];
}

export function useUtils(): useUtilsResponseType {
	const data = useAppSelector((state) => state.data);

	/**
	 * Calculates the total market value of each asset class.
	 *
	 * @returns A map of asset class IDs to their total market values.
	 */
	const assetClassTotals = useMemo(() => {
		const map: Record<string, number> = {};
		for (const { asset_market_value, expand } of data.assets) {
			const classId = expand.asset_class.id;
			map[classId] = (map[classId] || 0) + asset_market_value;
		}
		return map;
	}, [data.assets]);

	/**
	 * Calculates the total market value of a specific asset class.
	 *
	 * @param assetClassId - The ID of the asset class to sum values for.
	 * @returns The total market value.
	 */
	function sumMarketValue(assetClassId: string): number {
		return assetClassTotals[assetClassId] || 0;
	}

	/**
	 * Calculates the allocation percentage for a given amount.
	 *
	 * @param amount - The amount to calculate the allocation from.
	 * @returns The allocation as a decimal (e.g., 0.25 for 25%).
	 */
	function calculateAllocation(amount: number): number {
		return parseFloat((amount / data.totalPortfolio).toFixed(2));
	}

	/**
	 * Selling from asset classes with allocation above target
	 * Buying into asset classes below target using the funds from sales
	 *
	 * @param assetClasses asset classes to rebalance
	 * @param totalPortfolio total portfolio value
	 * @returns An array of allocation changes indicating how much to buy/sell for each asset class.
	 */
	function rebalancePortfolio(
		assetClasses: AssetClass[],
		totalPortfolio: number,
	) {
		const changes: AllocationChange[] = [];
		let amountToReinvest = 0;

		// Sell from asset classes exceeding targets
		for (const assetClass of assetClasses) {
			const currentAmount = sumMarketValue(assetClass.id);
			const currentAllocation = calculateAllocation(currentAmount);

			if (currentAllocation <= assetClass.asset_classes_target) continue;

			const targetAmount = assetClass.asset_classes_target * totalPortfolio;

			const amountToSell = Math.round(currentAmount - targetAmount);
			amountToReinvest += amountToSell;

			changes.push({
				asset_class_id: assetClass.id,
				allocate: -amountToSell,
			});
		}

		// Buy into asset classes below targets using available funds
		for (const assetClass of assetClasses) {
			if (amountToReinvest <= 0) break;

			const currentAmount = sumMarketValue(assetClass.id);
			const currentAllocation = calculateAllocation(currentAmount);

			if (currentAllocation >= assetClass.asset_classes_target) continue;

			const targetAmount = assetClass.asset_classes_target * totalPortfolio;

			const amountToBuy = Math.min(
				Math.round(targetAmount - currentAmount),
				amountToReinvest,
			);

			changes.push({
				asset_class_id: assetClass.id,
				allocate: amountToBuy,
			});

			amountToReinvest -= amountToBuy;
		}

		return changes;
	}

	return {
		sumMarketValue,
		calculateAllocation,
		rebalancePortfolio,
	};
}
