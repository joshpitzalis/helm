import React from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { withUserData } from '../../hocs/withUserData';
import PropTypes from 'prop-types';

export const Notifications = ({ pollcount, user }) =>
  user && (
    <p
      data-colour="orange"
      className="tc bn w2 h2 b pointer br-100 brown flex x relative left-1"
      data-test="notifications"
    >
      {pollcount}
    </p>
  );

export default compose(
  setDisplayName('Notifications'),
  setPropTypes({ pollcount: PropTypes.number }),
  withUserData,
)(Notifications);
