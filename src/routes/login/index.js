import { h } from 'preact';
import style from './style';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const auth = useAuth();
  return (
    <div class={style.home}>
      {auth.user ? (
        <p>Hello, {auth.user.displayName}</p>
      ) : (
        <p>Please sign in.</p>
      )}
      {auth.user ? (
        <button onClick={() => auth.signout()}>Sign out</button>
      ) : (
        <button onClick={() => auth.signin()}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Login;
