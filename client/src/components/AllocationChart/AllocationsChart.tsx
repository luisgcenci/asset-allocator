import React from "react";
import Chart from "react-apexcharts";
import { UserAssetClassesData } from "services/AssetClasses";
import styles from "./AllocationsChart.module.css";

interface IAllocationsChart {
	userAssetClassesData: UserAssetClassesData;
}

const AllocationsChart: React.FC<IAllocationsChart> = (
	props: IAllocationsChart
) => {
	const options = {
		plotOptions: {
			treemap: {
				distributed: true,
			},
		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: "14px",
			},
			formatter: (
				_text: string,
				op: {
					seriesIndex: number;
					dataPointIndex: number;
					w: {
						config: {
							series: Array<{ data: [{ x: string; y: number; z: string }] }>;
						};
					};
				}
			) => {
				const infoPath =
					op.w.config.series[op.seriesIndex].data[op.dataPointIndex];
				const x = infoPath.x;
				const y = infoPath.y;
				const z = infoPath.z;
				return `${x}: $${y} (${z}%)`;
			},
			offsetY: -4,
		},
		style: {
			colors: ["#ccc"],
		},
	};

	type SeriesDataItem = {
		x: string;
		y: number;
		z: number;
	};

	const getSeries = (): { data: SeriesDataItem[] }[] => {
		const seriesData: SeriesDataItem[] = [];

		props.userAssetClassesData.assetClasses.map((assetClass) => {
			seriesData.push({
				x: assetClass.asset_classes_name,
				y: assetClass.asset_classes_amount,
				z: Math.round((assetClass.asset_classes_amount / props.userAssetClassesData.totalPortfolio) * 100),
			});
		});

		const series = [
			{
				data: seriesData,
			},
		];

		return series;
	};

	const series = getSeries();
	const seriesIsEmpty =
		series[0].data.length <= 0 ||
		series[0].data.every((assetClass) => assetClass.y <= 0);

	return !seriesIsEmpty ? (
		<Chart
			height="100%"
			width="100%"
			type="treemap"
			series={series}
			options={options}
		/>
	) : (
		<div className={styles.EmptyChartMessage}>
			<p>There is no data to display.</p>
		</div>
	);
};

export default AllocationsChart;
