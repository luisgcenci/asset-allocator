import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

type AssetClass = {
	id: string;
	asset_classes_userid: number;
	asset_classes_name: string;
	asset_classes_amount: number;
	asset_classes_target: number;
};

const createAssetClass = async (
	name: string,
	target: number
): Promise<AssetClass> => {
	const assetClass = {
		asset_classes_userid: "0wv6i9siap9vn4u",
		asset_classes_name: name,
		asset_classes_target: target,
	};

	try {
		return await pb.collection("asset_classes").create(assetClass);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const getAll = async (): Promise<AssetClass[]> => {
	try {
		return await pb.collection("asset_classes").getFullList<AssetClass>();
	} catch (e) {
		console.log(e);
		throw new Error("Failed to fetch asset classes");
	}
};

const updateAssetClass = async (
	id: string,
	name: string,
	target: number
): Promise<boolean> => {
	const data = {
		asset_classes_name: name,
		asset_classes_target: target,
	};

	try {
		return await pb.collection("asset_classes").update(id, data);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const deleteAssetClass = async (id: string): Promise<boolean> => {
	try {
		return await pb.collection("asset_classes").delete(id);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

export default {
	createAssetClass,
	getAll,
	updateAssetClass,
	deleteAssetClass,
};

export type { AssetClass };
