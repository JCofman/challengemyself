import { h } from 'preact';
import style from './style';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'preact-router/match';


const Home = () => {
  const auth = useAuth();

  return (
    <div class={style.home}>
      <h1>Welcome</h1>
      <p>This is Challenge Myself</p>
        {auth && auth.user ? (
            <div>
              <Link
                class={style.create}
                activeClassName={style.active}
                href="/create"
              >
                Create a new Challenge
              </Link>
              <button class={style.login} onClick={() => auth.signout()}>Sign out</button>
            </div>
          ) : auth && (
            <button class={style.login} onClick={() => auth.signInWithGoogle()}>Sign in</button>
          )}
    </div>
  );
};

export default Home;
