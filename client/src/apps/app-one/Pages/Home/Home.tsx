import styles from './Home.module.css';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { updateStatus } from 'store/features/sampleSlice';

const Home = () => {

	const status = useAppSelector((state) => state.sample.status);
	const dispatch = useAppDispatch();

	const changeStatus = () => {
		dispatch(updateStatus(!status));
	};

	return (
		<div className={styles.Home}>
			{String(status)}
			<input type='submit' value='Change Status' onClick={changeStatus}></input>
		</div>
	);
};

export default Home;
