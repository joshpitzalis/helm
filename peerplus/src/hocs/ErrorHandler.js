import React, { Component } from "react";
import PropTypes from "prop-types";

export const ErrorHandler = WrappedComponent => {
  return class ErrorHandler extends Component {
    state = { hasError: false, error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true, error, errorInfo });
    }

    render() {
      if (this.state.hasError)
        return (
          <p>
            Something went wrong! {this.state.error} {this.state.errorInfo}
          </p>
        );
      return <WrappedComponent {...this.props} />;
    }
  };
};
