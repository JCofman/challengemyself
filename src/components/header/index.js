import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useAuth } from '../../hooks/useAuth';

import style from './style';

const signin = (e) => {
  if (auth && auth.signInWithGoogle) {
    auth.signInWithGoogle();
    route('/create');
  }
}

const signout = (e) => {
  if (auth && auth.signout) {
    auth.signout();
    route('/create');
  }
}

const Header = (props) => {
  const auth = useAuth();
  const [userId, setUserId] = useState('');
  const { currentPath } = props;

  useEffect(() => {
    if (auth && auth.user) {
      setUserId(auth.user.uid);
    }
  }, [auth]);

  return (
    <header class={style.header}>
      <Link
        href="/"
        class={style.title}
      >
        <h1>Challenge Myself</h1>
      </Link>
      <nav class={style.nav}>
        {(auth && auth.user) ? (
          <>
            {(currentPath && !currentPath.includes('create') && currentPath !== '/') && (
              <Link
                class={style.createNew}
                activeClassName={style.active}
                href="/create"
              >
                <div class={style.addIcon}>
                  <svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg"><path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/></svg>
                </div>
              </Link>
            )}
            <Link
              class={style.user}
              style={{ backgroundImage: `url('${auth.user.photoURL}')` }}
              href={(auth && auth.user && userId) ? `/${userId}/challenges` : '/'}
            ></Link>
            <Link class={style.login} onClick={signout}>
              Sign out
            </Link>
          </>
        ) : (
          <Link class={style.login} onClick={signin}>
            Sign in with Google
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
