import React, { Component } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/index.js";
import LandingPage from "./components/Landing";
import HomePage from "./components/Home";
import AccountPage from "./components/Account";
import Poll from "./components/Poll";
import Onboarding from "./components/Onboarding/index.js";
import Responses from "./components/Poll/Responses";
import CreatePoll from "./components/CreatePoll";
import Done from "./components/Poll/Done";
import * as routes from "./constants/routes";
import "normalize.css";
import "./style.css";
import "./grid.css";
import { Footer } from "./components/Footer.js";
import { auth, db } from "./constants/firebase";
import PropTypes from "prop-types";

export default class Routes extends Component {
  state = {
    authed: false,
    user: null
  };

  static childContextTypes = {
    user: PropTypes.object
  };

  getChildContext() {
    return { user: this.state.user };
  }

  componentDidMount() {
    // when logged in set auth to true so you can access private routes
    auth.onAuthStateChanged(
      user =>
        user &&
        this.setState({
          authed: true,
          user: user
        })
    );

    // create a user on firebase when you signup and then update it every time
    // you login so that you have a fresh access toke to resync your friends
    // list when you create a private poll.
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
          photo
        });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navigation />
          <Route
            exact
            path={routes.LANDING}
            render={props => <LandingPage {...props} count={5} />}
          />
          <PrivateRoute
            exact
            path={routes.HOME}
            authed={this.state.authed}
            component={() => <HomePage />}
          />
          <PrivateRoute
            exact
            path={`${routes.ACCOUNT}/:userId`}
            authed={this.state.authed}
            component={AccountPage}
          />
          <PrivateRoute
            exact
            path={routes.CREATE}
            authed={this.state.authed}
            component={CreatePoll}
          />
          <Route exact path={`${routes.POLL}/:pollId`} component={Poll} />
          <PrivateRoute
            exact
            path={`${routes.RESPONSES}/:pollId`}
            authed={this.state.authed}
            component={Responses}
          />
          <PrivateRoute
            exact
            path={`${routes.ONBOARDING}/:userId`}
            authed={this.state.authed}
            component={Onboarding}
          />
          <Route exact path={`${routes.DONE}/:pollId`} component={Done} />
          <Footer />
        </main>
      </BrowserRouter>
    );
  }
}

// These hoc components allow you to pass props into a route component
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => renderMergedProps(component, routeProps, rest)}
  />
);

const PrivateRoute = ({ component, authed, ...rest }) => (
  <Route
    {...rest}
    render={routeProps =>
      authed === true ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect
          to={{ pathname: "/", state: { from: routeProps.location } }}
        />
      )
    }
  />
);

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();
