import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { useAuth } from '../../hooks/useAuth';

import style from './style';


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
      <Link href={userId ? `/${userId}/challenges` : '/'}>
        <h1>Challenge Myself</h1>
      </Link>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link activeClassName={style.active} href="/">
          Create New
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
