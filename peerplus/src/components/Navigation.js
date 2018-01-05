import { Link } from 'react-router-dom';
import { auth, facebookAuthProvider } from '../constants/firebase';
import React, { Component, Fragment } from 'react';
import * as routes from '../constants/routes';
import Logo from '../images/peerPlusLogo.png';
export default class Navigation extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }));
  }

  render() {
    return (
      <nav className="flex justify-between items-center ph5-ns ph3">
        <Link to={routes.HOME}>
          <img
            src={Logo}
            alt="Peer Plus"
            height="50"
            width="50"
            className="grow dib mv2"
          />
        </Link>

        {this.state.user ? (
          <button
            data-test="logout"
            className="tr bn underline f4 b pointer seethrough"
            onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
            Logout
          </button>
        ) : (
          <button
            data-test="login"
            className="tr bn underline f4 b pointer seethrough"
            onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
            Login
          </button>
        )}
      </nav>
    );
  }
}
