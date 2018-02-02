import { auth, facebookAuthProvider } from "../../constants/firebase";
import React from "react";
import {
  compose,
  branch,
  renderComponent,
  setDisplayName,
  setPropTypes
} from "recompose";
import PropTypes from "prop-types";

const LogoutButton = () => (
  <button
    data-test="logout"
    className="tr bn underline f4 b pointer seethrough"
    onClick={() => auth.signInWithRedirect(facebookAuthProvider)}
  >
    Logout
  </button>
);

const showLogoutIfLoggedIn = branch(
  ({ user }) => user,
  renderComponent(LogoutButton)
);

const LoginButton = showLogoutIfLoggedIn(({ user }) => (
  <button
    data-test="login"
    className="tr bn underline f4 b pointer seethrough"
    onClick={() => auth.signInWithRedirect(facebookAuthProvider)}
  >
    Login
  </button>
));

export default compose(
  setDisplayName("AuthButtons"),
  setPropTypes({ user: PropTypes.object })
)(LoginButton);
