import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { ProvideAuth } from '../hooks/useAuth';
import style from './app.css';
import Header from './header';
import Footer from './footer';
import Home from '../routes/home';

// Code-splitting is automated for routes
import CreateChallenge from '../routes/createChallenge';
import ChallengeView from '../routes/challengeView';
import ChallengesOverview from '../routes/challengesOverview';

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  // const handleRoute = e => {
  //   this.currentUrl = e.url;
  // };

  const handleRouteChange = async(e) => {
    setCurrentPath(e.url);
  }

  return (
    <div id="app">
      <ProvideAuth>
        <Header currentPath={currentPath} />
        <Router onChange={handleRouteChange}>
          <Home path="/" />
          <CreateChallenge path="/create" />
          <ChallengeView path="/:userId/challenges/:challengeId" />
          <ChallengesOverview path="/:userId/challenges" />
        </Router>
        <Footer></Footer>
      </ProvideAuth>
    </div>
  );
};

export default App;
