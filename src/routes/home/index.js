import { h } from 'preact';
import style from './style';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
	const auth = useAuth();
	return (
		<div class={style.home}>
			<h1>Home</h1>
			<p>This is the Home component.</p>
			{auth.user ? (
				<div>I AM SIGNED INED</div>
			) : (
				<button onClick={() => auth.signInWithGoogle()}>Sign in</button>
			)}
		</div>
	);
};

export default Home;
