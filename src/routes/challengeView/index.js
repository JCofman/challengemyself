import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import tilt from 'vanilla-tilt';
import { Link } from 'preact-router/match';

import { useAuth } from '../../hooks/useAuth';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import fallbackImgUrl from '../../assets/fallback-image.jpeg';
import { calcDaysToGo } from '../../utils';

import style from './challengeView.css';

const UnauthenticatedChallengeView = () => {
  return (
    <p class={style.root}>
      You have to authenticate before we can load your challenges. Please visit
      the <Link href="/">login</Link> page.
    </p>
  );
};

const AuthenticatedChallengeView = () => {
  const auth = useAuth();
  const [imgUrl, setImgUrl] = useState('');

  const clientId =
    '9c2b0b52027502b5e790640d080938e6efe192ddef317faaec51b8d8bbb15b7e';
  const challengeIdUrl = window.location.pathname.slice(1); // because it starts with '/'
  const { isLoading, isError, data } = useDatabaseEntry(challengeIdUrl);
  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${name}`;

  useEffect(() => {
    const tiltElem = document.querySelector('[data-tilt]');
    tilt.init(tiltElem, {
      max: 45,
    });
    // fetch bg image
    fetch(unsplashUrl)
      .then(response => response.json())
      .then(json => json.urls.regular)
      .then(picUrl => {
        setImgUrl(picUrl);
      });
    // remove event listeners when component is removed
    return () => tiltElem.vanillaTilt.destroy();
  }, [unsplashUrl, data]);

  if (isLoading) {
    return <p>Loading your challenge...</p>;
  }
  if (isError) {
    return <p> Something went wrong</p>;
  }

  const [duration, name, createdDate] = data;

  return (
    <div class={style.root}>
      <div
        class={style.heroImage}
        style={{ 'background-image': `url('${imgUrl || fallbackImgUrl}')` }}
      />
      <div class={style.challenge}>
        <div
          data-tilt
          data-tilt-full-page-listening
          data-tilt-speed="200"
          class={style.challenge__titleAndDays}
        >
          <div class={style.challenge__title}>
            {name ? name.toUpperCase() : '…'}
          </div>
          <div class={style.challenge__daysToGo}>
            {duration && createdDate
              ? calcDaysToGo(duration, createdDate)
              : 'XX'}
          </div>
          <div class={style.challenge__daysToGoDesc}>DAYS TO GO</div>
        </div>
        <Link
          href={
            auth.user && auth.user.uid ? `/${auth.user.uid}/challenges` : '/'
          }
          class={style.challenge__backToOverview}
        >
          Back to Overview
        </Link>
      </div>
    </div>
  );
};
const ChallengeView = () => {
  const auth = useAuth();

  return (
    <div class={style.root}>
      {auth.user !== false ? (
        <AuthenticatedChallengeView />
      ) : (
        <UnauthenticatedChallengeView />
      )}
    </div>
  );
};

export default ChallengeView;
