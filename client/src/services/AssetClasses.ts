import { GridRowId } from "@mui/x-data-grid";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

type UserAssetClassesData = {
	totalTarget: number;
	totalPortfolio: number;
	assetClasses: AssetClass[]
}

type AssetClass = {
	id: number;
	asset_classes_userid: number;
	asset_classes_name: string;
	asset_classes_amount: number;
	asset_classes_target: number;
};

const createAssetClass = async (
	name: string,
	amount: number,
	target: number
): Promise<AssetClass> => {
	const assetClass = {
		asset_classes_userid: "0wv6i9siap9vn4u",
		asset_classes_name: name,
		asset_classes_amount: amount,
		asset_classes_target: target / 100,
	};

	try {
		return await pb.collection("asset_classes").create(assetClass);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const getAllAssetClasses = async (): Promise<UserAssetClassesData> => {
	try {
		const assetClasses = await pb.collection("asset_classes").getFullList<AssetClass>({
			sort: "-created",
			filter: "asset_classes_userid = \"0wv6i9siap9vn4u\"",
		});

		const totalTarget = getTotalTarget(assetClasses);
		const totalPortfolio = getTotalPortfolio(assetClasses);

		return {
			totalTarget: totalTarget,
			totalPortfolio: totalPortfolio,
			assetClasses: assetClasses
		}

	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const updateAssetClass = async (id: string, name: string, amount: number, target: number): Promise<boolean> => {

	const data = {
    "asset_classes_name": name,
    "asset_classes_amount": amount,
    "asset_classes_target": target,
	};
	
	try {
		return await pb
			.collection("asset_classes")
			.update(id, data);
	}
	catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
}

const deleteAssetClass = async (id: string): Promise<boolean> => {
	try {
		return await pb.collection("asset_classes").delete(id);
	}
	catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
}

type AllocationSimulation = {
	asset_class_id: number;
	allocate: number;
};

const calculateAllocation = (
	newFunds: number,
	portfolio: AssetClass[]
): AllocationSimulation[] => {
	if (portfolio.length === 0) {
		throw new Error("Portfolio cannot be empty");
	}

	const portfolioTotal = getTotalPortfolio(portfolio);

	const portfolioValueWithNewInvestment = portfolioTotal + newFunds;

	const response: AllocationSimulation[] = [];

	let remainingFunds = newFunds;

	for (let i = 0; i < portfolio.length && remainingFunds > 0; i++) {
		const current = portfolio[i];
		const currentAmountInPercentage =
			current.asset_classes_amount / portfolioValueWithNewInvestment;

		if (currentAmountInPercentage >= current.asset_classes_target) continue;

		const targetAmount =
			current.asset_classes_target * portfolioValueWithNewInvestment;

		const moneyToInvest = targetAmount - current.asset_classes_amount;

		let investmentAmount = Math.min(moneyToInvest, remainingFunds);

		investmentAmount = Math.round(investmentAmount);

		response.push({
			asset_class_id: current.id,
			allocate: investmentAmount,
		});

		remainingFunds -= investmentAmount;
	}

	if (remainingFunds) {
		response.push({
			asset_class_id: -1,
			allocate: remainingFunds
		})
	}

	return response;
};

const getTotalPortfolio = (assetClasses: AssetClass[]):number => {
	return assetClasses.reduce(
		(sum, { asset_classes_amount }) => sum + asset_classes_amount,
		0
	);
}

const getTotalTarget = (assetClasses: AssetClass[]):number => {
	return assetClasses.reduce(
		(sum, { asset_classes_target }) => sum + asset_classes_target,
		0
	);
}

export default {
	createAssetClass,
	getAllAssetClasses,
	updateAssetClass,
	deleteAssetClass,
	calculateAllocation,
};

export type { UserAssetClassesData, AllocationSimulation };
