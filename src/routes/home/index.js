import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style';
import { useAuth } from '../../hooks/useAuth';
import Heading from '../../components/heading';

const Home = () => {
  const auth = useAuth();

  return (
    <div class={style.home}>
      <Heading appearance={`H1`}>Challengemyself</Heading>
      <p>
        <br />
        <br />
        A webpage for creating and keeping motivation. <br />
        For trying out new things, exploring uncharted territories with new
        challenges. Always giving the best you can and reaching out for more
        experiences.
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
          <button class={style.login} onClick={() => auth.signout()}>
            Sign out
          </button>
        </div>
      ) : (
        auth && (
          <button class={style.login} onClick={() => auth.signInWithGoogle()}>
            Sign in
          </button>
        )
      )}
    </div>
  );
};

export default Home;
