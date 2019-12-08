import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import firebase, { useAuth } from '../../hooks/useAuth';
import style from './createChallenge.css';

const CreateChallenge = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(100);
  const auth = useAuth();

  const submitChallenge = e => {
    e.preventDefault();
    // validarte inputs
    if (name.trim() === '') return;
    if (duration > 100 || duration <= 0) return;

    const userID = auth.user.uid;
    const ref = firebase.database().ref(`${userID}/challenges`);
    const newChallenge = ref.push();
    const startDate = new Date().getTime();
    // Pushing an object to firebase with a random number
    newChallenge.set({
      name,
      duration,
      startDate,
    });
    // redirect to created challenge
    route(`/${userID}/challenges/${newChallenge.key}`);
  };

  return (
    <div class={style.root}>
      <form onSubmit={submitChallenge} class={style.form}>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
          }}
        >
          <label for="name" class={style.label}>
            Your next challenge
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onchange={e => setName(e.target.value)}
            required
            pattern="[A-Za-z0-9]{3,20}"
            aria-label="challenge-name"
            class={style.input}
          />

          <label for="duration" class={style.label}>
            Duration
          </label>
          <input
            id="duration"
            type="number"
            min="5"
            max="365"
            step="1"
            value={duration}
            onchange={e => setDuration(e.target.value)}
            required
            aria-label="challenge-duration"
            class={style.input}
          />

          <button
            type="submit"
            onClick={() => {
              submitChallenge();
            }}
            class={`${style.input} ${style.createButton}`}
          >
            {'Start Challenge today'.toUpperCase()}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChallenge;
