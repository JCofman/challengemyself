import { useState, useEffect } from 'preact/hooks';
import { h } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useAuth } from '../../hooks/useAuth';
import Heading from '../../components/heading';
import style from './style.css';

const signin = auth => async e => {
  if (auth && auth.signInWithGoogle) {
    await auth.signInWithGoogle();
    route('/create');
  }
};

const signout = auth => async e => {
  if (auth && auth.signout) {
    await auth.signout();
    route('/');
  }
};

const Header = props => {
  const auth = useAuth();
  const [userId, setUserId] = useState('');

  const { currentPath } = props;

  useEffect(() => {
    if (auth && auth.user) {
      const userId = auth.user.uid;
      setUserId(userId);
    }
  }, [auth]);

  return (
    <header class={style.header}>
      {currentPath !== '/' ? (
        <Link href="/" class={style.title}>
          <Heading appearance={'H3'}>Challengemyself</Heading>
        </Link>
      ) : (
        <div />
      )}

      <nav class={style.nav}>
        {auth && auth.user ? (
          <>
            {currentPath &&
              !currentPath.includes('create') &&
              currentPath !== '/' && (
                <Link
                  class={style.createNew}
                  activeClassName={style.active}
                  href="/create"
                >
                  <div class={style.addIcon}>
                    <svg
                      viewBox="0 0 448 448"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
                    </svg>
                  </div>
                </Link>
              )}
            <Link
              class={style.user}
              style={{ backgroundImage: `url('${auth.user.photoURL}')` }}
              href={auth && auth.user && userId ? `/${userId}/challenges` : '/'}
            />
            <Link class={style.login} onClick={signout(auth)}>
              Sign out
            </Link>
          </>
        ) : (
          auth && (
            <Link class={style.login} onClick={signin(auth)}>
              Sign in with Google
            </Link>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;
