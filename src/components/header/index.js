import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useAuth } from '../../hooks/useAuth';

import style from './style';

const signout = (e) => {
  if (auth) {
    auth.signout();
  }
  route('/create');
}

const Header = () => {
  const auth = useAuth();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (auth && auth.user) {
      setUserId(auth.user.uid);
    }
  }, [auth]);

  return (
    <header class={style.header}>
      <Link
        href={(auth && auth.user && userId) ? `/${userId}/challenges` : '/'}
        class={style.title}
      >
        <h1>Challenge Myself</h1>
      </Link>
      <nav class={style.nav}>
        {(auth && auth.user && !(location.pathname.includes('create') || location.pathname === '/' )) ? (
          <>
            <Link
              class={style.createNew}
              activeClassName={style.active}
              href="/create"
            >
              +
            </Link>
            <div
              class={style.user}
              style={{ backgroundImage: `url('${auth.user.photoURL}')` }}
            ></div>
            <Link class={style.login} onClick={signout}>
              Sign out
            </Link>
          </>
        ) : (
          <Link class={style.login} onClick={() => auth && auth.signInWithGoogle()}>
            Sign in with Google
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
