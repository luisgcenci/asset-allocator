import { FC } from "react";
import AppOne from "apps/app-one/AppOne";
import styles from "./css/App.module.css";

const App: FC = () => {
  return (
    <div className={styles.App}>
      <AppOne />
    </div>
  );
};

export default App;
