import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import PropTypes from 'prop-types';
import { auth, facebookAuthProvider } from './constants/firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import Poll from './components/Poll';
import Responses from './components/Poll/Responses';
import CreatePoll from './components/CreatePoll';
import Done from './components/Poll/Done';
import * as routes from './constants/routes';
import axios from 'axios';
import 'normalize.css';
import './style.css';

export default class Routes extends Component {
  state = { auth: null, friends: null };

  componentDidMount() {
    auth.getRedirectResult().then(result => {
      if (result.credential) {
        var token = result.credential.accessToken;
        axios
          .get(
            `https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`
          )
          .then(result => this.setState({ friends: result.data.data }))
          .catch(error => console.log(error));
      }
    });
    auth.onAuthStateChanged(user => this.setState({ auth: user }));
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navigation />
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route
            exact
            path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
          <Route exact path={routes.CREATE} component={CreatePoll} />
          <Route exact path={`${routes.POLL}/:pollId`} component={Poll} />
          <Route
            exact
            path={`${routes.RESPONSES}/:pollId`}
            component={Responses}
          />
          <Route exact path={`${routes.DONE}/:pollId`} component={Done} />
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
