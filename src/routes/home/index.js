import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';

import { useDatabaseEntry } from '../../hooks/useDatabaseEntry';
import { useAuth } from '../../hooks/useAuth';
import Heading from '../../components/heading';
import style from './style';

const Home = () => {
  const auth = useAuth();
  const [userId, setUserId] = useState('');
  let currentChallenges = useDatabaseEntry(userId);

  useEffect(() => {
    if (auth && auth.user) {
      setUserId(auth.user.uid);
    }
    if (
      currentChallenges &&
      currentChallenges[0] &&
      Object.keys(currentChallenges[0]).length > 0
    ) {
      route(`/${userId}/challenges`);
    }
  }, [auth, userId, currentChallenges]);

  return (
    <main class={style.home_wrapper}>
      <div class={style.hero_title}>
        <svg
          class={style.home_brush}
          height="463"
          viewBox="0 0 433 463"
          width="433"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            fill="#fff"
            fill-rule="evenodd"
            font-family="Fusterd Bonus"
            font-size="500"
            letter-spacing="9.61538462"
            transform="translate(-502 -4)"
          >
            <tspan x="502" y="358">
              T
            </tspan>
          </text>
        </svg>
        <a href="/" className={style.home_hero_title}>
          <Heading appearance={`H1`}>Challengemyself</Heading>
        </a>
      </div>

      <section class={style.home_section}>
        <p class={style.home_section_highlight}>Challenge your everyday life</p>
        <p class={style.home_section_test}>
          <br />A webpage for creating and keeping motivation. For trying out
          new things, exploring uncharted territories with new challenges.
          Always giving the best you can and reaching out for more experiences.
        </p>
      </section>

      {auth && auth.user ? (
        <div>
          <Link
            class={style.home_create}
            activeClassName={style.active}
            href="/create"
          >
            Create a new Challenge
          </Link>
          <button class={style.home_logout} onClick={() => auth.signout()}>
            Sign out
            <div class={style.button_horizontal} />
            <div class={style.button_vertial} />
          </button>
        </div>
      ) : (
        auth && (
          <button
            class={style.home_login}
            onClick={() => auth.signInWithGoogle()}
          >
            Sign in
            <div class={style.button_horizontal} />
            <div class={style.button_vertial} />
          </button>
        )
      )}
    </main>
  );
};

export default Home;
