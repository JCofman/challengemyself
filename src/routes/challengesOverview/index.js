import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useAuth } from '../../hooks/useAuth';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import { calcDaysToGo, formatDate } from '../../utils';

import style from './challengesOverview.css';

const UnauthenticatedChallengesOverview = () => {
  return (
    <p class={style.root}>
      You have to authenticate before we can load your challenges go to login
      page
      <Link href={`/login`}> here</Link>.
    </p>
  );
};

const AuthenticatedChallengesOverview = () => {
  const challengeIdUrl = window.location.pathname.slice(1); // because it starts with '/'
  const userId = challengeIdUrl.substr(0, challengeIdUrl.indexOf('/'));

  const { isLoading, isError, data } = useDatabaseEntry(userId);
  const allChallenges = data[0];

  if (isLoading) {
    return <p class={style.root}>Loading your challenges...</p>;
  }
  if (isError) {
    return <p class={style.root}> Something went wrong</p>;
  }
  if (data && data.length === 0) {
    return (
      <p class={style.root}>
        You don't have any challenges yet! Go create one! 💪
      </p>
    );
  }

  return (
    <div class={style.root}>
      {/* ACTIVE CHALLENGES */}
      <h1 class={style.headline}>Your active Challenges</h1>
      <section class={style.gridContainer}>
        {allChallenges &&
          Object.keys(allChallenges).length > 0 &&
          Object.entries(allChallenges)
            .filter(
              ([key, challenge]) =>
                calcDaysToGo(challenge.duration, challenge.startDate) > 0
            )
            .sort(([key1, c1], [key2, c2]) => c2.startDate - c1.startDate)
            .map(([key, challenge]) => (
              <Link
                href={`/${userId}/challenges/${key}`}
                class={style.item}
                key={challenge.name + challenge.startDate}
              >
                <div class={style.name}>{challenge.name}</div>
                {calcDaysToGo(challenge.duration, challenge.startDate) ===
                  0 && (
                  <div class={style.trophyLogo}>
                    <svg viewBox="0 0 100 125">
                      <path d="M87.2,87.2c-0.1,0.2-0.1,0.4,0,0.6l4.2,5.1c0.4,0.4,0,1.1-0.5,1.1H75.8V80.8H91c0.6,0,0.9,0.7,0.5,1.1L87.2,87.2z M8.5,81.9  l4.2,5.1c0.1,0.2,0.1,0.4,0,0.6l-4.3,5.3C8.1,93.3,8.5,94,9,94h15.1V80.8H9.1C8.5,80.8,8.2,81.4,8.5,81.9z M76.5,12.4h18.1v13.9  c0,10-8.1,18.1-18.1,18.1h-2.3c-3.4,7.5-10.2,13.2-18.5,15v11.3h6.5c2,0,3.6,1.6,3.6,3.6v4.8h5.5v17H28.8v-17h5.5v-4.8  c0-2,1.6-3.6,3.6-3.6h6.5V59.3c-8.3-1.8-15.1-7.4-18.5-15h-2.3c-10,0-18.1-8.1-18.1-18.1V12.4h18.1V3.9h52.9V12.4z M23.6,35.2  c0-0.6-0.1-1.1-0.1-1.7V21.6h-8.9v4.7C14.6,31.2,18.6,35.2,23.6,35.2L23.6,35.2z M42.7,79.9V89h14.7v-9.1H42.7z M61.2,25.1l-7.1-0.5  L51.4,18c-0.5-1.2-2.3-1.2-2.8,0l-2.7,6.6l-7.1,0.5c-1.3,0.1-1.9,1.8-0.9,2.6l5.4,4.6l-1.7,6.9c-0.3,1.3,1.1,2.3,2.2,1.6l6-3.8  l6,3.8c1.1,0.7,2.6-0.3,2.2-1.6l-1.7-6.9l5.4-4.6C63,26.9,62.5,25.2,61.2,25.1z M76.5,21.6v11.9c0,0.6,0,1.2-0.1,1.7h0.1  c4.9,0,8.9-4,8.9-8.9v-4.7H76.5z" />
                    </svg>
                  </div>
                )}
                <div
                  class={style.time}
                  style={{
                    opacity:
                      calcDaysToGo(challenge.duration, challenge.startDate) ===
                        0 && 0.1,
                  }}
                >
                  <div
                    class={style.daysToGo}
                    style={{
                      visibility:
                        calcDaysToGo(
                          challenge.duration,
                          challenge.startDate
                        ) === 0 && 'hidden',
                    }}
                  >
                    {calcDaysToGo(challenge.duration, challenge.startDate)}
                  </div>
                  /<div class={style.duration}>{challenge.duration}</div>
                </div>
                <div class={style.start}>
                  Started on: {formatDate(new Date(challenge.startDate))}
                </div>
              </Link>
            ))}
      </section>

      {/* DONE CHALLENGES */}
      {allChallenges &&
        Object.keys(allChallenges).length > 0 &&
        Object.entries(allChallenges).filter(
          ([key, challenge]) =>
            calcDaysToGo(challenge.duration, challenge.startDate) === 0
        ).length > 0 && (
          <>
            <h1 class={style.headline}>Your finished Challenges</h1>
            <section class={style.gridContainer}>
              {Object.entries(allChallenges)
                .filter(
                  ([key, challenge]) =>
                    calcDaysToGo(challenge.duration, challenge.startDate) === 0
                )
                .sort(([key1, v1], [key2, v2]) => v2.startDate - v1.startDate)
                .map(([key, challenge]) => (
                  <Link
                    href={`/${userId}/challenges/${key}`}
                    class={style.item}
                    key={challenge.name + challenge.startDate}
                  >
                    <div class={style.name}>{challenge.name}</div>
                    {calcDaysToGo(challenge.duration, challenge.startDate) ===
                      0 && (
                      <div class={style.trophyLogo}>
                        <svg viewBox="0 0 100 125">
                          <path d="M87.2,87.2c-0.1,0.2-0.1,0.4,0,0.6l4.2,5.1c0.4,0.4,0,1.1-0.5,1.1H75.8V80.8H91c0.6,0,0.9,0.7,0.5,1.1L87.2,87.2z M8.5,81.9  l4.2,5.1c0.1,0.2,0.1,0.4,0,0.6l-4.3,5.3C8.1,93.3,8.5,94,9,94h15.1V80.8H9.1C8.5,80.8,8.2,81.4,8.5,81.9z M76.5,12.4h18.1v13.9  c0,10-8.1,18.1-18.1,18.1h-2.3c-3.4,7.5-10.2,13.2-18.5,15v11.3h6.5c2,0,3.6,1.6,3.6,3.6v4.8h5.5v17H28.8v-17h5.5v-4.8  c0-2,1.6-3.6,3.6-3.6h6.5V59.3c-8.3-1.8-15.1-7.4-18.5-15h-2.3c-10,0-18.1-8.1-18.1-18.1V12.4h18.1V3.9h52.9V12.4z M23.6,35.2  c0-0.6-0.1-1.1-0.1-1.7V21.6h-8.9v4.7C14.6,31.2,18.6,35.2,23.6,35.2L23.6,35.2z M42.7,79.9V89h14.7v-9.1H42.7z M61.2,25.1l-7.1-0.5  L51.4,18c-0.5-1.2-2.3-1.2-2.8,0l-2.7,6.6l-7.1,0.5c-1.3,0.1-1.9,1.8-0.9,2.6l5.4,4.6l-1.7,6.9c-0.3,1.3,1.1,2.3,2.2,1.6l6-3.8  l6,3.8c1.1,0.7,2.6-0.3,2.2-1.6l-1.7-6.9l5.4-4.6C63,26.9,62.5,25.2,61.2,25.1z M76.5,21.6v11.9c0,0.6,0,1.2-0.1,1.7h0.1  c4.9,0,8.9-4,8.9-8.9v-4.7H76.5z" />
                        </svg>
                      </div>
                    )}
                    <div
                      class={style.time}
                      style={{
                        opacity:
                          calcDaysToGo(
                            challenge.duration,
                            challenge.startDate
                          ) === 0 && 0.1,
                      }}
                    >
                      <div
                        class={style.daysToGo}
                        style={{
                          visibility:
                            calcDaysToGo(
                              challenge.duration,
                              challenge.startDate
                            ) === 0 && 'hidden',
                        }}
                      >
                        {calcDaysToGo(challenge.duration, challenge.startDate)}
                      </div>
                      /<div class={style.duration}>{challenge.duration}</div>
                    </div>
                    <div class={style.start}>
                      Started on: {formatDate(new Date(challenge.startDate))}
                    </div>
                  </Link>
                ))}
            </section>
          </>
        )}
    </div>
  );
};

const ChallengesOverview = () => {
  const auth = useAuth();
  return (
    <main class={style.background}>
      {auth.user !== false ? (
        <AuthenticatedChallengesOverview />
      ) : (
        <UnauthenticatedChallengesOverview />
      )}
    </main>
  );
};

export default ChallengesOverview;
