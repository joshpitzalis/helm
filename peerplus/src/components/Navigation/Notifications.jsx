import React from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { withUserData } from '../../hocs/withUserData';
import PropTypes from 'prop-types';

const Notifications = ({ pollcount, user }) =>
  user && <p className="tr bn underline f4 b pointer seethrough" data-test='notifications'>{pollcount}</p>;

export default compose(
  setDisplayName('Notifications'),
  setPropTypes({ pollcount: PropTypes.number }),
  withUserData,
)(Notifications);
