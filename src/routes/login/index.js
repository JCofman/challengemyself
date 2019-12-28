import { FaGoogle } from 'react-icons/fa';
import { route } from 'preact-router';
import { useState, useReducer } from 'preact/hooks';
import style from './style';
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Card from '../../components/card';
import Button from '../../components/button';

const signInReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        successMessage: action.successMessage,
      };

    default:
      break;
  }
};
const SignIn = () => {
  const auth = useAuth();
  const [signInState, dispatch] = useReducer(signInReducer, {
    errorMessage: '',
    successMessage: '',
  });
  const { inputs, handleInputChange, handleSubmit } = useForm();

  const handleSignIn = async () => {
    const { data, errorMessage } = await auth.signin(
      inputs.email,
      inputs.password
    );
    if (errorMessage) {
      dispatch({ type: 'SIGNIN_ERROR', errorMessage: `⚠️ ${errorMessage}` });
    }
    if (data) {
      dispatch({
        type: 'SIGNIN_SUCCESS',
        successMessage: `✅ You have successfully signed in.`,
      });
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
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
              required
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
              required
            />
          </label>
          <Button onClick={() => handleSignIn()}>Sign in</Button>
        </fieldset>
      </form>
      {signInState.errorMessage}
      {signInState.successMessage}
      <h3>Or</h3>

      <Button onClick={() => auth.signInWithGoogle()}>
        <FaGoogle /> Sign in with Google
      </Button>
    </Card>
  );
};

const signUpReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        successMessage: action.successMessage,
      };

    default:
      break;
  }
};

const SignUp = () => {
  const auth = useAuth();
  const [signUpState, dispatch] = useReducer(signUpReducer, {
    errorMessage: '',
    successMessage: '',
  });

  const handleSignUp = async () => {
    const { data, errorMessage } = await auth.signup(
      inputs.email,
      inputs.password
    );
    if (errorMessage) {
      dispatch({ type: 'SIGNUP_ERROR', errorMessage: `⚠️ ${errorMessage}` });
    }
    if (data) {
      dispatch({
        type: 'SIGNUP_SUCCESS',
        successMessage: `✅ You have successfully signed up.`,
      });
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useForm();
  return (
    <Card>
      <form method="post" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <fieldset disabled={false}>
          <label>
            Your Email address
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
              value={inputs.email}
              required
            />
          </label>
          <label>
            Your password
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </label>
        </fieldset>
        <Button type="submit" onClick={() => handleSignUp()}>
          Sign up
        </Button>
      </form>
      {signUpState.errorMessage}
      {signUpState.successMessage}
    </Card>
  );
};

const ResetPassword = () => {
  const auth = useAuth();

  const { inputs, handleInputChange, handleSubmit } = useForm();
  const [isSend, setisSend] = useState(false);
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
              required
            />
          </label>
        </fieldset>
        <Button
          type="submit"
          onClick={() => {
            auth.sendPasswordResetEmail(inputs.email);
            setisSend(true);
          }}
        >
          Reset
        </Button>
        {isSend && <p> ✅ We have sent out an email to you. </p>}
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
