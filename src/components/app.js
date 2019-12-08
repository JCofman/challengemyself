import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { ProvideAuth } from '../hooks/useAuth';
import Header from './header';
import Footer from './footer';
import './app.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import CreateChallenge from '../routes/createChallenge';
import ChallengeView from '../routes/challengeView';
import ChallengesOverview from '../routes/challengesOverview';

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const handleRouteChange = async e => {
    setCurrentPath(e.url);
  };

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
        <Footer />
      </ProvideAuth>
    </div>
  );
};

export default App;
