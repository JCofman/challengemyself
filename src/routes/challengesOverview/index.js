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
      <h1 class={style.headline}>Your Challenges</h1>
      <section class={style.gridContainer}>
        {allChallenges &&
          Object.keys(allChallenges).length > 0 &&
          Object.entries(allChallenges)
            .sort(([key1, c1], [key2, c2]) => c2.startDate - c1.startDate)
            .map(([key, challenge]) => (
              <Link
                href={`/${userId}/challenges/${key}`}
                class={style.item}
                key={challenge.name + challenge.startDate}
              >
                <div class={style.name}>{challenge.name}</div>
                <div class={style.time}>
                  <div class={style.daysToGo}>
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
    </div>
  );
};

const ChallengesOverview = () => {
  const auth = useAuth();
  return (
    <div class={style.background}>
      {auth.user !== false ? (
        <AuthenticatedChallengesOverview />
      ) : (
        <UnauthenticatedChallengesOverview />
      )}
    </div>
  );
};

export default ChallengesOverview;
