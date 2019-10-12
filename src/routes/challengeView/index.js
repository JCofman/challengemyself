import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './challengeView.css';
import fallbackImg from '../../assets/fallback-image.jpeg';

const ChallengeView = () => {
  const [imgUrl, setImgUrl] = useState(fallbackImg);

  const clientId =
    '9c2b0b52027502b5e790640d080938e6efe192ddef317faaec51b8d8bbb15b7e';
  const imagesQuery = window.location.pathname.slice(1) || 'trex'; // because it starts with /
  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${imagesQuery}`;

  useEffect(
    () => {
      // TODO: fetch image from firebase of unsplash
      fetch(unsplashUrl)
        .then(response => response.json())
        .then(json => json.urls.regular)
        .then(picUrl => {
          console.log('url', picUrl);
          setImgUrl(picUrl);
        });
    },
    e => {
      console.error(e);
    },
    [unsplashUrl]
  );

  return (
    <div class={style.root}>
      <div
        class={style.heroImage}
        style={{ 'background-image': `url('${imgUrl}')` }}
      />
      <div
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
        }}
      >
        <div class={style.backToOverview}>Back to Overview</div>
      </div>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div class={style.title}>Work hard</div>
        <div class={style.daysToGo}>78</div>
      </div>
    </div>
  );
};

export default ChallengeView;
