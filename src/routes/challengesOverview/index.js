import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import style from './challengesOverview.css';
import { calcDaysToGo } from '../../utils';

const ChallengesOverview = () => {
  const challengeIdUrl = window.location.pathname.slice(1); // because it starts with '/'
  const userId = challengeIdUrl.substr(0, challengeIdUrl.indexOf('/'));

  const allChallenges = useDatabaseEntry(`${userId}`)[0];

  return (
    <div class={style.background}>
      <div class={style.root}>
        <h1 class={style.headline}>Your Challenges</h1>
        {allChallenges &&
          Object.keys(allChallenges).length > 0 &&
          Object.entries(allChallenges)
            .sort(([key1, c1], [key2, c2]) => c2.startDate - c1.startDate)
            .map(([key, challenge]) => (
              <div
                key={challenge.name + challenge.startDate}
                class={style.item}
              >
                <Link href={`/${userId}/challenges/${key}`} class={style.link}>
                  <div class={style.flex}>
                    <div class={style.name}>{challenge.name}</div>
                    <div class={style.duration}>{challenge.duration}</div>
                    <div class={style.start}>
                      {new Date(challenge.startDate).toDateString()}
                    </div>
                    <div class={style.togo}>
                      {calcDaysToGo(challenge.duration, challenge.startDate)}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        {allChallenges && Object.keys(allChallenges).length === 0 && (
          <div>You don't have any challenges yet! Go create one! 💪</div>
        )}
        {!allChallenges && <div>Loading your challenges...</div>}
      </div>
    </div>
  );
};

export default ChallengesOverview;