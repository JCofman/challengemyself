import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router } from 'preact-router';
import { ProvideAuth } from '../hooks/useAuth';
import { I18nextProvider } from 'react-i18next';
import { ProvideServiceWorker } from 'react-hook-use-service-worker';
import i18n from '../i18n';

import Header from './header';
import Footer from './footer';
import './app.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Login from '../routes/login';
import CreateChallenge from 'async!../routes/createChallenge';
import ChallengeView from 'async!../routes/challengeView';
import ChallengesOverview from 'async!../routes/challengesOverview';
import Imprint from 'async!../routes/Imprint';

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const handleRouteChange = async (e) => {
    setCurrentPath(e.url);
  };

  return (
    <div id="app">
      <ProvideServiceWorker fileName={'/sw.js'}>
        <I18nextProvider i18n={i18n}>
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
        </I18nextProvider>
      </ProvideServiceWorker>
    </div>
  );
};

export default App;
