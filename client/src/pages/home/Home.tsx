import styles from "./Home.module.css";
import AllocationsChart from "components/AllocationsChart";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { AllocationsGrid } from "components/AllocationsGrid/AllocationsGrid";
import React, { ReactNode } from "react";
import AssetClasses, { AllocationSimulation, AssetClass } from "services/AssetClasses";
import AddIcon from "@mui/icons-material/Add";
import AddAssetClassPopUp from "components/AddAssetClassPopUp";
import { TextField } from "@mui/material";

const Home: React.FC = () => {
  const [assetClassesData, setAssetClassesData] =
    React.useState<AssetClass[]>();
  const [openModal, setOpenModal] = React.useState(false);
  const [amountSimulation, setAmountSimulation] = React.useState<string>('');
	const [simulationData, setSimulationData] = React.useState<{
    newAmount: number;
    data: AllocationSimulation[];
  } | null>(null);

	const fetchAllAssetClassesData = async () => {
		setAssetClassesData(await AssetClasses.getAllAssetClasses());
	};

  React.useEffect(() => {
    fetchAllAssetClassesData();
  }, []);

  if (!assetClassesData) {
    return <div>loading...</div>;
  }

  const closeModal = () => {
    setOpenModal(false);
  };

	const handleSimulation = () => {
		
		if (!amountSimulation) {
			return;
		}

    setSimulationData({
      newAmount: Math.round(parseInt(amountSimulation)),
      data: AssetClasses.calculateAllocation(
        Math.round(parseInt(amountSimulation)),
        assetClassesData
      ),
    });
	};
	
  return (
    <div className={styles.Home}>
      {openModal ? (
        <AddAssetClassPopUp
          open={openModal}
          closeModal={closeModal}
          updateData={fetchAllAssetClassesData}
        />
      ) : null}
      <h2>Allocations</h2>
      <div className={styles.Chart}>
        <AllocationsChart allAssetClasses={assetClassesData} />
      </div>
      <div className={styles.SimulatorInput}>
        <TextField
          required
          autoFocus
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={amountSimulation}
          onChange={(e) => setAmountSimulation(e.target.value)}
          placeholder="Enter new amount to invest..."
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          style={{
            flex: 2,
            margin: '0 1vw 0 0',
          }}
        />
        <Button
          onClick={handleSimulation}
          color="primary"
          variant="outlined"
          disabled={false}
          style={{
            flex: 3,
          }}
          size="small"
        >
          <strong>WHERE SHOULD I ALLOCATE IT TO?</strong>
        </Button>
      </div>
      <div className={styles.Table}>
        <AllocationsGrid data={assetClassesData} simulation={simulationData ?? undefined} />
      </div>
      <div className={styles.Buttons}>
        <div>
          <Button color="primary" onClick={() => setOpenModal(true)}>
            <AddIcon /> <p style={{ margin: 0 }}>ADD NEW ASSET CLASS</p>
          </Button>
        </div>
        <div>
          {!simulationData && (
            <Button
              color="primary"
              variant="outlined"
            >
              SAVE ALL
            </Button>
          )}
          {simulationData && (
            <Button
              color="warning"
              variant="outlined"
							disabled={!simulationData}
							onClick={() => setSimulationData(null)}
            >
              CLEAR
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
