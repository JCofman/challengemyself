import { h } from 'preact';
import { Router } from 'preact-router';
import { ProvideAuth } from '../hooks/useAuth';

import Header from './header';
import Footer from './footer';

// Code-splitting is automated for routes
import CreateChallenge from '../routes/createChallenge';
import ChallengeView from '../routes/challengeView';

const App = () => {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  // const handleRoute = e => {
  //   this.currentUrl = e.url;
  // };

  return (
    <div id="app">
      <ProvideAuth>
        <Header />
        <Router>
          <CreateChallenge path="/" />
          <ChallengeView path="/:id" />
        </Router>
        <Footer></Footer>
      </ProvideAuth>
    </div>
  );
};

export default App;
