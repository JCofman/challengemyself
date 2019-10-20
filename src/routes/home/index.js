import { h } from 'preact';
import style from './style';
import firebase, { useAuth } from '../../hooks/useAuth';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';

const Home = () => {
  const auth = useAuth();
  let dataFromFirebase = useDatabaseEntry('challenges');
  console.log(dataFromFirebase);
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      {auth.user ? (
        <div>
          <button onClick={() => auth.signout()}>Create new Challenge</button>
          {dataFromFirebase.map(content => {
            console.log(content);
            console.log('ahaaaaa');
            return (
              <tr key={content.number + Math.random() * 100}>
                <td style={{ paddingTop: '10px' }}>{content.name}</td>
                <td style={{ paddingTop: '10px' }}>{content.number}</td>
              </tr>
            );
          })}
          <button
            onClick={() => {
              let ref = firebase.database().ref('/challenges');
              let newPost = ref.push();
              // Pushing an object to firebase with a random number
              newPost.set({
                name: 'Custom hook example',
                number: Math.floor(Math.random() * 1000),
              });
            }}
          >
            Click to push data to firebase!
          </button>
        </div>
      ) : (
        <button onClick={() => auth.signInWithGoogle()}>Sign in</button>
      )}
    </div>
  );
};

export default Home;
