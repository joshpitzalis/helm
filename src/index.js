import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import * as routes from './constants/routes';
import { auth, db, messaging } from './constants/firebase';
import PropTypes from 'prop-types';
import {
  updateLastLogin,
  checkThatUserLoggedInLessThanAWeek,
} from './components/Onboarding/helpers';
import ReactGA from 'react-ga';

import messages from './messages';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import 'tachyons';
import 'normalize.css';
import './style.css';
import './grid.css';
import Navigation from './components/Navigation/index.js';
import Footer from './components/Footer.js';
import { Loading } from './components/Loading';
// import NotificationResource from './resources/NotificationResource.js';
import registerMessaging from './request-messaging-Permission.js';

// translations...
addLocaleData([...en, ...es, ...fr]);

let locale =
  (navigator.language && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US';
// ...translations

// analytics...

ReactGA.initialize('UA-000000-01');
ReactGA.pageview(window.location.pathname + window.location.search);

// ...analytics

// Dynamic Routes...

class DynamicImport extends Component {
  state = {
    component: null,
  };
  componentWillMount() {
    this.props.load().then(component => {
      this.setState(() => ({
        component: component.default ? component.default : component,
      }));
    });
  }
  render() {
    return this.props.children(this.state.component);
  }
}

const HomePage = props => (
  <DynamicImport load={() => import('./components/Home')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const LandingPage = props => (
  <DynamicImport load={() => import('./components/Landing')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Poll = props => (
  <DynamicImport load={() => import('./components/Poll')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Onboarding = props => (
  <DynamicImport load={() => import('./components/Onboarding/index.js')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Responses = props => (
  <DynamicImport load={() => import('./components/Poll/Responses')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const CreatePoll = props => (
  <DynamicImport load={() => import('./components/CreatePoll')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Done = props => (
  <DynamicImport load={() => import('./components/Poll/Done')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Error = props => (
  <DynamicImport load={() => import('./components/Error')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const AddTo = props => (
  <DynamicImport load={() => import('./components/Poll/AddSomeoneNew')}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

// ...Dynamic Routes

export default class Routes extends Component {
  state = {
    authed: false,
    user: null,
  };

  static childContextTypes = {
    user: PropTypes.object,
  };

  getChildContext() {
    return { user: this.state.user };
  }

  componentDidMount() {
    // this.notifications = new NotificationResource(messaging, database);

    // when logged in set auth to true so you can access private routes
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          user: user,
        });
        // this.notifications.changeUser(user);
        registerMessaging(user);
      } else {
        this.setState({
          authed: false,
          user: null,
        });
      }
      user && updateLastLogin(user.providerData[0].uid);
      user && checkThatUserLoggedInLessThanAWeek(user.providerData[0].uid);
    });
    // create a user on firebase when you signup and then update it every time
    // you login so that you have a fresh access token to resync your friends
    // list when you create a private poll.
    auth.getRedirectResult().then(result => {
      if (result.credential) {
        const token = result.credential.accessToken;
        const uid = auth.currentUser.uid;
        const { name, id } = result.additionalUserInfo.profile;
        const photo = result.additionalUserInfo.profile.picture.data.url;

        db.doc(`users/${id}`).set(
          {
            uid,
            token,
            id,

            name,
            photo,
          },
          { merge: true },
        );
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <main>
            <Switch>
              <Route exact path={routes.LANDING} render={props => <LandingPage {...props} />} />
              <PrivateRoute
                exact
                path={routes.HOME}
                authed={this.state.authed}
                component={HomePage}
              />
              {/* <PrivateRoute
              exact
              path={`${routes.ACCOUNT}/:userId`}
              authed={this.state.authed}
              component={AccountPage}
            /> */}
              <PrivateRoute
                exact
                path={routes.CREATE}
                authed={this.state.authed}
                component={CreatePoll}
              />

              <Route exact path={`${routes.CREATE}/:pollId`} component={CreatePoll} />
              <Route exact path={`${routes.POLL}/:pollId`} component={Poll} />
              <PrivateRoute
                exact
                path={`${routes.RESPONSES}/:pollId`}
                authed={this.state.authed}
                component={Responses}
              />
              <PrivateRoute
                exact
                path={`/addTo/:pollId`}
                authed={this.state.authed}
                component={AddTo}
              />
              <PrivateRoute
                exact
                path={`${routes.ONBOARDING}/:userId`}
                authed={this.state.authed}
                component={Onboarding}
              />
              <Route exact path={`${routes.DONE}/:pollId`} component={Done} />
              <Route exact path={routes.ERROR} component={Error} />
              {/* <Redirect exact from="/fun" to="/" /> */}
              <Route component={LandingPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

// These hoc components allow you to pass props into a route component
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

// const PropsRoute = ({ component, ...rest }) => (
//   <Route {...rest} render={routeProps => renderMergedProps(component, routeProps, rest)} />
// );

const PrivateRoute = ({ component, authed, ...rest }) => (
  <Route
    {...rest}
    render={routeProps =>
      authed === true ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />
      )
    }
  />
);

ReactDOM.render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <Routes />
  </IntlProvider>,
  document.getElementById('root'),
);
registerServiceWorker();

messaging.onMessage(payload => {
  console.log('payload', payload);
});
