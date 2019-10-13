import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './createChallenge.css';

const CreateChallenge = () => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState(new Date());
  const [duration, setDuration] = useState(100);

  const submitChallenge = () => {
    console.log('create Challenge');
    if (window) window.location.assign('trex');
  };

  return (
    <div class={style.root}>
      <form onSubmit={submitChallenge}>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
          }}
        >
          <label for="name">Your next challenge</label>
          <input
            id="name"
            type="text"
            value={name}
            required
            aria-label="challenge-name"
            class={style.title}
          />

          <label for="duration">Duration: {duration}</label>
          <input
            id="duration"
            type="number"
            min="5"
            max="365"
            value={duration}
            required
            onchange={e => setDuration(e.target.value)}
            aria-label="challenge-duration"
            class={style.duration}
          />

          <button type="submit" class={style.createButton}>
            Create Challenge
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChallenge;
