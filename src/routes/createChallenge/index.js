import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import style from './createChallenge.css';

const CreateChallenge = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(100);

  const submitChallenge = () => {
    // TODO: save name and duration in firebase!

    // redirect to created challenge
    route(`/${name}`);
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
            aria-label="challenge-name"
            class={style.input}
          />

          <label for="duration" class={style.label}>
            Duration: {duration}
          </label>
          <input
            id="duration"
            type="number"
            min="5"
            max="365"
            value={duration}
            onchange={e => setDuration(e.target.value)}
            required
            aria-label="challenge-duration"
            class={style.input}
          />

          <button type="submit" class={`${style.input} ${style.createButton}`}>
            Create Challenge
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChallenge;
