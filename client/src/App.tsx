import Pages from "pages/Pages";
import type React from "react";
import { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Outlet />}>
				<Route path="/" element={<Pages />} />
			</Route>
		</Routes>
	);
};

export default App;
