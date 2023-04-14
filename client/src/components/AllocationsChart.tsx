import React from "react";
import Chart from "react-apexcharts";
import { AssetClass } from "services/AssetClasses";

interface IAllocationsChart {
	allAssetClasses: AssetClass[];
};

const AllocationsChart: React.FC<IAllocationsChart> = (props: IAllocationsChart) => {

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
					seriesIndex: number; dataPointIndex: number; w: {
						config: {
							series: Array<{ data: [{ x: string, y: number, z: string}]  }>
						}
				} }
			) => {
				const infoPath = op.w.config.series[op.seriesIndex].data[op.dataPointIndex];
				const x = infoPath.x;
				const y = infoPath.y;
				const z = infoPath.z;
        return `${x}: $${y} (${z})`;
      },
      offsetY: -4,
    },
	};
	
	type SeriesDataItem = {
		x: string;
		y: string;
		z: string;
	};

	const getSeries = (): { data: SeriesDataItem[] }[] => {
    const portfolioValue = props.allAssetClasses.reduce(
      (sum, { asset_classes_amount }) => sum + asset_classes_amount,
      0
    );

    const seriesData: SeriesDataItem[] = [];

    props.allAssetClasses.map((assetClass) => {
      seriesData.push({
        x: assetClass.asset_classes_name,
        y: assetClass.asset_classes_amount.toLocaleString("en-US", {
          currency: "USD",
        }),
        z: (assetClass.asset_classes_amount / portfolioValue).toLocaleString(
          "en-US",
          {
            style: "percent",
          }
        ),
      });
		});

    const series = [
      {
        data: seriesData
      },
    ];

    return series;
  };
  
	return props.allAssetClasses.length > 0 ? (
    <Chart
      height="100%"
      width="100%"
      type="treemap"
      series={getSeries()}
      options={options}
    />
  ) : null;
}

export default AllocationsChart;