import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './challengeView.css';
import fallbackImgUrl from '../../assets/fallback-image.jpeg';

const ChallengeView = () => {
  const [imgUrl, setImgUrl] = useState('');

  const clientId =
    '9c2b0b52027502b5e790640d080938e6efe192ddef317faaec51b8d8bbb15b7e';
  const imagesQuery = window.location.pathname.slice(1); // because it starts with /
  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${imagesQuery}`;

  useEffect(() => {
    // TODO: fetch name and days remaining

    // fetch bg image
    fetch(unsplashUrl)
      .then(response => response.json())
      .then(json => json.urls.regular)
      .then(picUrl => {
        console.log('your pic url!', imagesQuery, picUrl);
        setImgUrl(picUrl);
      });
  }, [unsplashUrl]);

  return (
    <div class={style.root}>
      <div
        class={style.heroImage}
        style={{ 'background-image': `url('${imgUrl || fallbackImgUrl}')` }}
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
        <div class={style.title}>{imagesQuery.toUpperCase()}</div>
        <div class={style.daysToGo}>78</div>
      </div>
    </div>
  );
};

export default ChallengeView;
