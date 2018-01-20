import { auth, facebookAuthProvider } from '../../constants/firebase';
import React from 'react';
import { compose, branch, renderNothing, setDisplayName, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { withUserData } from '../../hocs/withUserData';

const showIfLoggedIn = branch(({ user }) => !user, renderNothing);

const Notifications = ({ user, pollcount }) => (
  <p className="tr bn underline f4 b pointer seethrough">{pollcount}</p>
);

export default compose(
  setDisplayName('Notifications'),
  setPropTypes({ user: PropTypes.object, pollcount: PropTypes.number }),
  withUserData,
  showIfLoggedIn,
)(Notifications);
