import { h } from 'preact'
import { useState } from 'preact/hooks'
import style from './createChallenge.css'

const CreateChallenge = () => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState(new Date());
  const [duration, setDuration] = useState(0);

  const submitChallenge = () => {
    console.log('create Challenge');
    if (window) window.location.assign('trex');
  }

  return (
    <div class={style.root}>
     <form onSubmit={submitChallenge}>
       <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
         <label for="name">Your next challenge:</label>
         <input id="name" type="text" value={name} aria-label="challenge-name" />

         <label for="from">Start on:</label>
         <input id="from" type="date" value={from} aria-label="challenge-start-on-value" />

         <label for="duration">Duration: {duration}</label>
         <input id="duration" type="range" min="0" max="100" value={duration} onchange={(e) => setDuration(e.target.value)} aria-label="challenge-duration" />

         <button class="create-button">Create Challenge</button>
       </div>
     </form>
    </div>
  )
}

export default CreateChallenge
