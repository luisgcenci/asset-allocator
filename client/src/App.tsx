import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "pages/home/Home";

const App: React.FC = () => {

	return (
		<Routes>
			<Route path="/" element={<Outlet />}>
				<Route path="/" element={<Home />} />
			</Route>
		</Routes>
	);
};

export default App;
