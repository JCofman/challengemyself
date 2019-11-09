import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import style from './challengeView.css';
import fallbackImgUrl from '../../assets/fallback-image.jpeg';
import { calcDaysToGo } from '../../utils';

const ChallengeView = (prop) => {
  const [imgUrl, setImgUrl] = useState('');
  const clientId = '9c2b0b52027502b5e790640d080938e6efe192ddef317faaec51b8d8bbb15b7e';
  const challengeIdUrl = window.location.pathname.slice(1); // because it starts with '/'
  const [duration, name, createdDate] = useDatabaseEntry(challengeIdUrl);
  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${name}`;

  useEffect(() => {
    // fetch bg image
    fetch(unsplashUrl)
      .then(response => response.json())
      .then(json => json.urls.regular)
      .then(picUrl => {
        setImgUrl(picUrl);
      });
  }, [unsplashUrl]);

  return (
    <div class={style.root}>
      <div
        class={style.heroImage}
        style={{ 'background-image': `url('${imgUrl || fallbackImgUrl}')` }}
      />
      <div class={style.challenge}>
        <div class={style.challenge__titleAndDays}>
          <div class={style.challenge__title}>{name ? name.toUpperCase() : '...'}</div>
          <div class={style.challenge__daysToGo}>{duration && createdDate ? calcDaysToGo(duration, createdDate) : 'XX'}</div>
        </div>
        <div class={style.challenge__backToOverview}>Back to Overview</div>
      </div>
    </div>
  );
};

export default ChallengeView;
