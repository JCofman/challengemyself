import { h } from 'preact';

import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useTranslation } from 'react-i18next';
import { useServiceWorker } from 'react-hook-use-service-worker';
import firebase, { useAuth } from '../../hooks/useAuth';
import { timeOptions, timeZones } from '../../utils';
import style from './createChallenge.css';
const messaging = firebase.messaging();

const UnauthenticatedCreateChallenge = () => {
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

const initFirebaseMessaging = () => {
  const mySW = useServiceWorker();
  messaging.useServiceWorker(mySW.registration);
};

const AuthenticatedCreateChallenge = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(100);
  const [notificationTime, setNotificationTime] = useState(timeOptions[0]);
  const [timeZone, setTimeZone] = useState(timeZones[0].value);
  const [shouldNotify, setNotify] = useState(false);
  const auth = useAuth();
  const { t } = useTranslation();
  useEffect(() => {
    initFirebaseMessaging();
  }, []);
  const submitChallenge = (e) => {
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
      shouldNotify,
      notificationTime,
      timeZone,
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
            {t('yourNextChallenge')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onchange={(e) => setName(e.target.value)}
            required
            aria-label="challenge-name"
            class={style.input}
          />

          <label for="duration" class={style.label}>
            {t('duration')}
          </label>
          <input
            id="duration"
            type="number"
            min="5"
            max="365"
            step="1"
            value={duration}
            onchange={(e) => setDuration(e.target.value)}
            required
            aria-label="challenge-duration"
            class={style.input}
          />

          <div class={style.timePicker}>
            <span>
              <label for="notify" class={style.label}>
                {t('notify')}
              </label>
              <input
                id="notify"
                type="checkbox"
                value={shouldNotify}
                onchange={() => {
                  // Let's check if the browser supports notifications

                  if (!('Notification' in window)) {
                    // eslint-disable-next-line no-alert
                    alert('This browser does not support desktop notification');
                  } else if (Notification.permission === 'granted') {
                    setNotify(!shouldNotify);
                    messaging.getToken().then((currentToken) => {
                      const userID = auth.user.uid;
                      // add notificationToken
                      firebase
                        .database()
                        .ref(`${userID}/notificationTokens/${currentToken}`)
                        .set(true);
                    });
                  } else {
                    Notification.requestPermission((result) => {
                      if (result === 'granted') {
                        setNotify(!shouldNotify);
                      }
                      localStorage.setItem('Notifications-Permission', result);
                    });
                  }
                }}
                aria-label="challenge-notification"
              />
            </span>
          </div>

          {shouldNotify && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                <label for="hour">{t('time')}</label>
                <select
                  id="hour"
                  name="hour"
                  value={notificationTime}
                  onchange={(e) => {
                    setNotificationTime(e.target.value);
                  }}
                >
                  {timeOptions.map((val) => {
                    return <option value={val}>{val}:00</option>;
                  })}
                </select>
              </div>
              <div>
                <label for="timezone">{t('timeZone')}</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={timeZone}
                  onchange={(e) => {
                    setTimeZone(e.target.value);
                  }}
                >
                  {timeZones.map((val) => {
                    return <option value={val.value}>{val.label}</option>;
                  })}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            onClick={() => {
              submitChallenge();
            }}
            class={`${style.input} ${style.createButton}`}
          >
            {t('startChallengeToday').toUpperCase()}
          </button>
        </div>
      </form>
    </div>
  );
};

const CreateChallenge = () => {
  const auth = useAuth();
  return (
    <main class={style.root}>
      {auth.user ? (
        <AuthenticatedCreateChallenge />
      ) : (
        <UnauthenticatedCreateChallenge />
      )}
    </main>
  );
};

export default CreateChallenge;
