import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './components/Navigation/index.js';
import LandingPage from './components/Landing';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import Poll from './components/Poll';
import Responses from './components/Poll/Responses';
import CreatePoll from './components/CreatePoll';
import Done from './components/Poll/Done';
import * as routes from './constants/routes';
import 'normalize.css';
import './style.css';
import { auth, db } from './constants/firebase';

export default class Routes extends Component {
  state = {
    authed: false,
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
    auth.getRedirectResult().then(result => {
      if (result.credential) {
        const token = result.credential.accessToken;
        const uid = auth.currentUser.uid;
        const { name, id } = result.additionalUserInfo.profile;
        const photo = result.additionalUserInfo.profile.picture.data.url;
        db.doc(`users/${id}`).set({
          uid,
          token,
          lastUpdate: +new Date(),
          id,
          name,
          photo,
        });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navigation />
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route exact path={routes.CREATE} component={CreatePoll} />
          <Route exact path={`${routes.POLL}/:pollId`} component={Poll} />
          <Route exact path={`${routes.RESPONSES}/:pollId`} component={Responses} />
          <Route exact path={`${routes.DONE}/:pollId`} component={Done} />
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
