import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
  branch,
  compose,
  renderComponent,
  setDisplayName,
  setPropTypes
} from "recompose";
import * as routes from "../../constants/routes";

const NotLoggedIn = () => <p>You are not logged in.</p>;

const hideIfNotLoggedIn = branch(
  ({ user }) => !user,
  renderComponent(NotLoggedIn)
);

const Button = hideIfNotLoggedIn(() => (
  <Link to={routes.CREATE}>
    <button data-test="create" className="grow" tabIndex="0">
      + New Decision
    </button>
  </Link>
));

export default compose(
  setDisplayName("CreatePollButton"),
  setPropTypes({ user: PropTypes.object })
)(Button);
