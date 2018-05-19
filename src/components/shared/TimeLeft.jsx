import React from 'react';
import PropTypes from 'prop-types';

const TimeLeft = ({ time }) => <p>...{time} till this poll closes.</p>;

export default TimeLeft;

TimeLeft.propTypes = {
  time: PropTypes.string.isRequired,
};
