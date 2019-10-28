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
      <Link href={userId ? `/${userId}/challenges` : '/'} class={style.title}>
        <h1>Challenge Myself</h1>
      </Link>
      <nav class={style.nav}>
        {auth.user ? (
          <>
            <Link class={style.createNew} activeClassName={style.active} href="/">
              +
            </Link>
            <div class={style.user} style={{ backgroundImage: `url('${auth.user.photoURL}')`}}></div>
            <Link class={style.login} onClick={() => auth.signout()}>Sign out</Link>
          </>
        ) : (
          <Link class={style.login} onClick={() => auth.signInWithGoogle()}>
            Sign in with Google
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
