import React, { Component } from 'react';
import PropTypes from 'prop-types';

// this provides the user object as a prop to any wrapped component
export const withUserData = WrappedComponent => {
  return class withUserData extends Component {
    static contextTypes = { user: PropTypes.object };
    render() {
      return <WrappedComponent {...this.props} user={this.context.user} />;
    }
  };
};
