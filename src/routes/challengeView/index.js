import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import tilt from 'vanilla-tilt';
import { Link } from 'preact-router/match';
import 'lottie-web';

import { useAuth } from '../../hooks/useAuth';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import fallbackImgUrl from '../../assets/fallback-image.jpeg';
import { calcDaysToGo } from '../../utils';

import style from './challengeView.css';

const UnauthenticatedChallengeView = () => {
  return (
    <p class={style.root}>
      You have to authenticate before we can load this page. Please visit the
      <Link href={`/login`} style="margin: 0 4px">
        login
      </Link>{' '}
      page.
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
  const [duration, name, createdDate] = data;

  useEffect(() => {
    const tiltElem = document.querySelector('[data-tilt]');
    tilt.init(tiltElem, {
      max: 45,
    });
    // fetch bg image
    if (name) {
      const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${name}`;
      fetch(unsplashUrl)
        .then((response) => response.json())
        .then((json) => json.urls.regular)
        .then((picUrl) => {
          setImgUrl(picUrl);
        });
    }
    // remove event listeners when component is removed
    return () => tiltElem.vanillaTilt.destroy();
  }, [data]);

  if (isLoading) {
    return <p>Loading your challenge...</p>;
  }
  if (isError) {
    return <p> Something went wrong</p>;
  }

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
          {calcDaysToGo(duration, createdDate) === 0 &&
          typeof window !== 'undefined' ? (
            <lottie-player
              class={style.challenge__trophyAnimation}
              src="https://assets4.lottiefiles.com/datafiles/VtCIGqDsiVwFPNM/data.json"
              background="transparent"
              speed="1"
              style="width: 300px; height: 300px;"
              autoplay
            />
          ) : (
            <>
              <div class={style.challenge__daysToGo}>
                {duration && createdDate
                  ? calcDaysToGo(duration, createdDate)
                  : 'XX'}
              </div>
              <div class={style.challenge__daysToGoDesc}>DAYS TO GO</div>
            </>
          )}
        </div>
        {calcDaysToGo(duration, createdDate) === 0 && (
          <div class={style.challenge__done}>
            Nice! You finished your {duration} days challenge!
          </div>
        )}
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
    <main class={style.root}>
      {auth.user !== false ? (
        <AuthenticatedChallengeView />
      ) : (
        <UnauthenticatedChallengeView />
      )}
    </main>
  );
};

export default ChallengeView;
