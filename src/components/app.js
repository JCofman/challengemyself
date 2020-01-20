import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { ProvideAuth } from '../hooks/useAuth';
import Header from './header';
import Footer from './footer';
import './app.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Login from '../routes/login';
import CreateChallenge from '../routes/createChallenge';
import ChallengeView from '../routes/challengeView';
import ChallengesOverview from '../routes/challengesOverview';
import Imprint from '../routes/Imprint';

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const handleRouteChange = async e => {
    setCurrentPath(e.url);
  };

  /* NOTIFICATIONS for all challenges */
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
  }

  Notification.requestPermission(result => {
    localStorage.setItem('Notifications-Permission', result);
  });

  return (
    <div id="app">
      <ProvideAuth>
        <Header currentPath={currentPath} />
        <Router onChange={handleRouteChange}>
          <Home path="/" />
          <Login path="/login" />
          <CreateChallenge path="/create" />
          <ChallengeView path="/:userId/challenges/:challengeId" />
          <ChallengesOverview path="/:userId/challenges" />
          <Imprint path="/imprint" />
        </Router>
        <Footer />
      </ProvideAuth>
    </div>
  );
};

export default App;
