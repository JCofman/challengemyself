// Hook (use-auth.js)

import { createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Add your Firebase credentials

let googleProvider;
let authContext;
if (typeof window !== 'undefined') {
  firebase.initializeApp({
    apiKey: 'AIzaSyBhUdUbAfkxCcNSqP14LE4uwQ2Bo9TNqRk',
    authDomain: 'challengemyself-f65a8.firebaseapp.com',
    databaseURL: 'https://challengemyself-f65a8.firebaseio.com',
    projectId: 'challengemyself-f65a8',
    storageBucket: 'challengemyself-f65a8.appspot.com',
    messagingSenderId: '905777837799',
    appId: '1:905777837799:web:8af8c94b236c7974821442',
    measurementId: 'G-GWQ066XZVK',
  });

  googleProvider = new firebase.auth.GoogleAuthProvider();
  authContext = createContext();
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  if (typeof window !== 'undefined') {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  }
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  /**
   * tries to authenticate with usercredentials.
   * returns success with  {data: user}. On error returns {errorMessage: error}
   * @param {string} email
   * @param {string} password
   */
  const signin = async (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return {
          data: response.user,
          isLoading: false,
          errorMessage: '',
        };
      })
      .catch((error) => {
        const { message: errorMessage } = error;
        return {
          data: null,
          isLoading: false,
          errorMessage,
        };
      });
  };
  /**
   * authenticate with google popup.
   */
  const signInWithGoogle = async () => {
    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((response) => {
        setUser(response.user);
        return {
          data: response.user,
          isLoading: false,
          errorMessage: '',
        };
      })
      .catch((error) => {
        const { message: errorMessage } = error;
        return {
          data: null,
          isLoading: false,
          errorMessage,
        };
      });
  };
  /**
   * calls firebase signup with provided auth credentials
   * @param string email
   * @param string password
   */
  const signup = (email, password) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return {
          data: response.user,
          isLoading: false,
          errorMessage: '',
        };
      })
      .catch((error) => {
        const { message: errorMessage } = error;
        return {
          data: null,
          isLoading: false,
          errorMessage,
        };
      });

  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };
  const sendPasswordResetEmail = (email) =>
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => true);

  const confirmPasswordReset = (code, password) =>
    firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => true);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle,
  };
}

export default firebase;
