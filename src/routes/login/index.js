import { FaGoogle } from 'react-icons/fa';
import { route } from 'preact-router';

import style from './style';
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Card from '../../components/card';

const SignIn = () => {
  const auth = useAuth();

  const { inputs, handleInputChange, handleSubmit } = useForm();

  return (
    <Card>
      <form handleSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <fieldset disabled={false}>
          <label>
            Your Email address
            <input
              type="email"
              name="email"
              placeholder="email address"
              onChange={handleInputChange}
              value={inputs.email}
            />
          </label>
          <label>
            Your Password
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleInputChange}
              value={inputs.password}
            />
          </label>
          <button onClick={() => auth.signin()}>Sign in</button>
        </fieldset>
      </form>

      <h3>Or</h3>

      <button onClick={() => auth.signInWithGoogle()}>
        <FaGoogle />
        Sign in with Google
      </button>
    </Card>
  );
};

const SignUp = () => {
  const auth = useAuth();

  const { inputs, handleInputChange, handleSubmit } = useForm();

  return (
    <Card>
      <form method="post" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <fieldset disabled={false}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
              value={inputs.email}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleInputChange}
              value={inputs.password}
            />
          </label>
        </fieldset>
        <button onClick={() => auth.signup(inputs.email, inputs.password)}>
          Sign up
        </button>
      </form>
    </Card>
  );
};

const ResetPassword = () => {
  const auth = useAuth();

  const { inputs, handleInputChange, handleSubmit } = useForm();

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Reset password</h2>
        <fieldset disabled={false}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
              value={inputs.email}
            />
          </label>
        </fieldset>
        <button onClick={() => auth.sendPasswordResetEmail()}>Reset</button>
      </form>
    </Card>
  );
};

const UnauthenticatedLogin = () => {
  return (
    <div class={style.login}>
      <SignIn />
      <SignUp />
      <ResetPassword />
    </div>
  );
};

const Login = () => {
  const auth = useAuth();
  if (auth.user !== false) {
    route('/create');
  }
  return (
    <div class={style.home}>
      <UnauthenticatedLogin />
    </div>
  );
};

export default Login;
