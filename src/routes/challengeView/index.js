import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import tilt from 'vanilla-tilt';
import { Link } from 'preact-router/match';
import 'lottie-web';
import { useTranslation, Trans } from 'react-i18next';

import { useAuth } from '../../hooks/useAuth';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import fallbackImgUrl from '../../assets/fallback-image.jpeg';
import { calcDaysToGo } from '../../utils';

import style from './challengeView.css';

const UnauthenticatedChallengeView = () => {
  return (
    <p class={style.root}>
      <Trans>
        You have to authenticate before we can load this page. Please visit the
        <Link href={`/login`} style="margin: 0 4px">
          login
        </Link>
        page.
      </Trans>
    </p>
  );
};

const AuthenticatedChallengeView = () => {
  const auth = useAuth();
  const [imgUrl, setImgUrl] = useState('');
  const { t } = useTranslation();

  const clientId =
    '9c2b0b52027502b5e790640d080938e6efe192ddef317faaec51b8d8bbb15b7e';
  const challengeIdUrl = window.location.pathname.slice(1); // because it starts with '/'
  const { isLoading, isError, data } = useDatabaseEntry(challengeIdUrl);

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

    return () => tiltElem && tiltElem.vanillaTilt.destroy();
  }, [data]);

  if (isLoading || data.length === 0) {
    return <p>{t('loadingYourChallenge')}</p>;
  }
  if (isError) {
    return <p>{t('error')}</p>;
  }

  const challenge = data.reduce((prev, currentChallengeValue) => {
    return { ...prev, ...currentChallengeValue };
  }, {});
  const { duration, name, startDate } = challenge;

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
          {calcDaysToGo(duration, startDate) === 0 &&
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
                {duration && startDate
                  ? calcDaysToGo(duration, startDate)
                  : 'XX'}
              </div>
              <div class={style.challenge__daysToGoDesc}>DAYS TO GO</div>
            </>
          )}
        </div>
        {calcDaysToGo(duration, startDate) === 0 && (
          <div class={style.challenge__done}>
            <Trans i18nKey="challengeFinished" duration={duration}>
              Nice! You finished your {{ duration }} days challenge!
            </Trans>
          </div>
        )}
        <Link
          href={
            auth.user && auth.user.uid ? `/${auth.user.uid}/challenges` : '/'
          }
          class={style.challenge__backToOverview}
        >
          {t('backToOverview')}
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
