import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../constants/firebase.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.redirect();
  }
  redirect() {
    auth.onAuthStateChanged(() => this.setState({ redirectTo: '/home' }));
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <div>
        <header>
          <h1>Landing</h1>
        </header>
      </div>
    );
  }
}
