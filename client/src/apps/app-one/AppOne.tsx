import Home from 'apps/app-one/Pages/Home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';


const AppOne = () => {
	return (
		<Routes>
			<Route path='*' element={<Navigate replace to='/home'/>}/>
			<Route path='/home' element={<Home/>}/>
		</Routes>
	);
};

export default AppOne;