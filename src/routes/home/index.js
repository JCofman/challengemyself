import { h } from 'preact';
import style from './style';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useAuth } from '../../hooks/useAuth';
import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';


const Home = () => {
  const auth = useAuth();
  const [userId, setUserId] = useState('');
  let currentChallenges = useDatabaseEntry(userId);

  useEffect(() => {
      if (auth && auth.user) {
        setUserId(auth.user.uid);
      }
      if (currentChallenges && currentChallenges[0] && Object.keys(currentChallenges[0]).length > 0) {
        route(`/${userId}/challenges`)
      }
  }, [ auth, userId, currentChallenges ]);

  return (
    <div class={style.home}>
      <h1>Welcome</h1>
      <p>
        This is Challenge Myself. <br /><br />
        A webpage for creating and keeping motivation. <br />
        For trying out new things, exploring uncharted territories with new challenges.
        Always giving the best you can and reaching out for more experiences.
      </p>
        {auth && auth.user ? (
            <div>
              <Link
                class={style.create}
                activeClassName={style.active}
                href="/create"
              >
                Create a new Challenge
              </Link>
              <button class={style.logout} onClick={() => auth.signout()}>Sign out</button>
            </div>
          ) : auth && (
            <button class={style.login} onClick={() => auth.signInWithGoogle()}>Sign in</button>
          )}
    </div>
  );
};

export default Home;
