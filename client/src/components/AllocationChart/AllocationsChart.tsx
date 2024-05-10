import React from "react";
import Chart from "react-apexcharts";
import styles from "./AllocationsChart.module.css";
import { useAppSelector } from "hooks/hooks";

const AllocationsChart: React.FC = () => {
	const data = useAppSelector((state) => state.data);

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
				return `${x}: €${y} (${z}%)`;
			},
			offsetY: -4,
		},
		style: {
			colors: ["#ccc"],
		},
	};

	type SeriesDataItem = {
		x: string;
		y: string;
		z: number;
	};

	const getSeries = (): { data: SeriesDataItem[] }[] => {
		const seriesData: SeriesDataItem[] = [];

		data.assetClasses.map((assetClass) => {
			const assetClassTotalAmount = data.assets.reduce(
				(sum, { asset_market_value, expand }) => {
					if (expand.asset_class.id === assetClass.id) {
						return sum + asset_market_value;
					}
					return sum;
				},
				0
			);

			seriesData.push({
				x: assetClass.asset_classes_name,
				y: assetClassTotalAmount.toLocaleString("en-US", {
					style: "decimal",
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
				}),
				z: Math.round((assetClassTotalAmount / data.totalPortfolio) * 100),
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
		series[0].data.every(
			(assetClass) => parseFloat(assetClass.y.replace(/,/g, "")) <= 0
		);

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
