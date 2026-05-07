import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
const mockedAssetUserId = "0wv6i9siap9vn4u";

type AssetClass = {
	id: string;
	asset_classes_userid: number;
	asset_classes_name: string;
	asset_classes_amount: number;
	asset_classes_target: number;
};

const createAssetClass = async (
	name: string,
	target: number,
): Promise<AssetClass> => {
	const assetClass = {
		asset_classes_userid: mockedAssetUserId,
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
		const data = await pb.collection("asset_classes").getFullList<AssetClass>({
			filter: `asset_classes_userid="${mockedAssetUserId}"`,
		});

		return data;
	} catch (e) {
		console.log(e);
		throw new Error("Failed to fetch asset classes");
	}
};

const updateAssetClass = async (
	id: string,
	name: string,
	target: number,
): Promise<boolean> => {
	const data = {
		asset_classes_userid: mockedAssetUserId,
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
