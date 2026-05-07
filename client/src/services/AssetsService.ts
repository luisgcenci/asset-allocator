import PocketBase from "pocketbase";
import type { AssetClass } from "./AssetClasses";

const pb = new PocketBase("http://127.0.0.1:8090");
const mockedAssetUserId = "0wv6i9siap9vn4u";

type UserAssetsData = Asset & {
	expand: {
		asset_class: AssetClass;
	};
};

type Asset = {
	id: string;
	asset_userid: string;
	asset_name: string;
	asset_market_value: number;
	asset_class: string;
};

const createAsset = async (
	name: string,
	marketValue: number,
	assetClass: string,
): Promise<Asset> => {
	const asset = {
		asset_userid: mockedAssetUserId,
		asset_name: name,
		asset_market_value: marketValue,
		asset_class: assetClass,
	};

	try {
		// check if the asset class exists
		const assetClassExists = await pb
			.collection("asset_classes")
			.getFullList<AssetClass>({
				filter: `asset_classes_userid="${mockedAssetUserId}" && asset_classes_name="${assetClass}"`,
			});

		return await pb.collection("assets").create(asset);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const getAllAssets = async (): Promise<UserAssetsData[]> => {
	try {
		const assets = await pb.collection("assets").getFullList<UserAssetsData>({
			sort: "-created",
			expand: "asset_class",
			filter: `asset_userid="${mockedAssetUserId}"`,
		});

		return assets;
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const update = async (
	id: string,
	name: string,
	marketValue: number,
	assetClass: string,
): Promise<boolean> => {
	const data = {
		asset_name: name,
		asset_market_value: marketValue,
		asset_class: assetClass,
		asset_userid: mockedAssetUserId,
	};

	try {
		return await pb.collection("assets").update(id, data);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

const deleteAsset = async (id: string): Promise<boolean> => {
	try {
		return await pb.collection("assets").delete(id);
	} catch (e) {
		console.log(e);
		throw Error("Server error.");
	}
};

export default {
	createAsset,
	getAllAssets,
	update,
	deleteAsset,
};

export type { UserAssetsData };
