import { h } from 'preact';
import { Link } from 'preact-router/match';

import { useAuth } from '../../hooks/useAuth';
import style from './style';

const Header = () => {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <header class={style.header}>
      <h1>Preact App</h1>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
        <Link activeClassName={style.active} href="/profile">
          Me
        </Link>
        {auth.user ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
              }}
            >
              {auth.user.displayName}{' '}
            </div>
            <button onClick={() => auth.signout()}>Sign out</button>
          </div>
        ) : (
          <button onClick={() => auth.signInWithGoogle()}>
            Sign in with Google
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
