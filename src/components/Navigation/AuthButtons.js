import { auth, facebookAuthProvider } from '../../constants/firebase';
import React from 'react';
import { compose, branch, renderComponent, setDisplayName, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

export const LogoutButton = ({ color }) => (
  <button
    data-test="logout"
    className={`tr bn underline f4 b pointer seethrough ${color} small-caps`}
    onClick={() =>
      auth
        .signOut()
        .then(() => {
          console.log('Sign-out successful.');
        })
        .catch((error) => {
          console.error(error);
        })
    }
  >
    Logout
  </button>
);

const showLogoutIfLoggedIn = branch(({ user }) => user, renderComponent(LogoutButton));

export const LoginButton = showLogoutIfLoggedIn(({ user }) => (
  <button
    data-test="login"
    className="tr bn underline f4 b pointer seethrough ttc small-caps"
    style={{ textDecorationSkip: 'ink' }}
    onClick={() => auth.signInWithRedirect(facebookAuthProvider)}
  >
    Login
  </button>
));

export default compose(setDisplayName('AuthButtons'), setPropTypes({ user: PropTypes.object }))(LoginButton);
