import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { AllocationSimulation, AssetClass } from 'services/AssetClasses';

interface IAllocationsGrid {
  data: AssetClass[];
  simulation?: {
    newAmount: number;
    data: AllocationSimulation[];
  };
}

export const AllocationsGrid: React.FC<IAllocationsGrid> = (
  props: IAllocationsGrid
) => {
  const columns: GridColDef[] = [
    {
      field: 'assetClass',
      headerName: 'Asset class',
      flex: 1,
      editable: true,
    },
    {
      field: 'currentAmount',
      headerName: 'Amount',
      flex: 0.5,
      editable: true,
      valueFormatter: ({ value }) => `$${value}`,
    },
    {
      field: 'newAmount',
      headerName: '',
      flex: 1,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: ({ value }) => {
        return value > 0 ? (
          <span style={{ color: 'green' }}>+ ${value}</span>
        ) : (
          ''
        );
      },
    },
    {
      field: 'currentAllocation',
      headerName: 'Allocation',
      flex: 0.5,
      valueFormatter: ({ value }) => `${value}%`,
    },
    {
      field: 'newAllocation',
      headerName: '',
      flex: 1,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: ({ value }) => {
        return value[0] > 0 ? (
          <>
            {value[0] > 0 && (
              <span style={{ color: 'orange', paddingRight: '1vw' }}>
                {value[0]}%
              </span>
            )}
            {value[1] != 0 && (
              <span
                style={{
                  color: value[1] > 0 ? 'green' : 'red',
                  fontSize: '12px',
                }}
              >
                {value[1]}%
              </span>
            )}
          </>
        ) : (
          ''
        );
      },
    },
    {
      field: 'targetAllocation',
      headerName: 'Target',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => `${value}%`,
    },
  ];

  type RowsType = {
    id: number;
    assetClass: string;
    currentAmount: number;
    newAmount: number;
    currentAllocation: number;
    newAllocation: [number, number];
    targetAllocation: number;
  };

  const getRows = (): RowsType[] => {
    const getPortfolioValue = (): number => {
      return props.data.reduce(
        (sum, { asset_classes_amount }) => sum + asset_classes_amount,
        0
      );
    };

    const getSimulationData = (
      assetClassId: number,
      assetClassAmoun: number,
      portfolioValue: number
    ): [number, number] => {
      if (!props.simulation) {
        return [0, 0];
      }

      let newInvested = props.simulation.data.find(
        (d) => d.asset_class_id == assetClassId
      )?.allocate;

      if (!newInvested) {
        return [0, 0];
      }

      const totalAmount = assetClassAmoun + newInvested;
      const newPortfolioValue = portfolioValue + props.simulation.newAmount;

      let newCurrentAllocation = totalAmount / newPortfolioValue;

      return [newInvested, newCurrentAllocation];
    };

    let response: RowsType[] = [];

    props.data.forEach((assetClass) => {
      const portfolioValue = getPortfolioValue();

      const [newInvested, newCurrentAllocation] = getSimulationData(
        assetClass.id,
        assetClass.asset_classes_amount,
        portfolioValue
      );

      const currentAllocation = Math.round(
        (assetClass.asset_classes_amount / portfolioValue) * 100
      );
      const newAllocation = Math.round(newCurrentAllocation * 100);
      const allocationChange = newAllocation - currentAllocation;

      response.push({
        id: assetClass.id,
        assetClass: assetClass.asset_classes_name,
        currentAmount: assetClass.asset_classes_amount,
        newAmount: newInvested,
        currentAllocation: currentAllocation,
        newAllocation: [newAllocation, allocationChange],
        targetAllocation: assetClass.asset_classes_target * 100,
      });
    });

    return response;
  };

  return (
    <DataGrid
      autoHeight
      experimentalFeatures={{ newEditingApi: true }}
      columns={columns}
      rows={getRows()}
      editMode="row"
    />
  );
};
