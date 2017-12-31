import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { auth, facebookAuthProvider, db } from '../../constants/firebase';
import * as routes from '../../constants/routes';

class Responses extends Component {
  state = {
    poll: {},
    redirectTo: null
  };

  componentDidMount() {
    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(
        poll =>
          poll.exists &&
          this.setState({
            poll: poll.data()
          })
      );
  }

  render() {
    const { poll, redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <div>
        <header>
          <h1>{poll.title}</h1>
          <h2>{poll.context}</h2>
        </header>
        <ul>
          {poll.responses ? (
            Object.keys(poll.responses).map((response, index) => (
              <li key={index}>
                <strong>{response}</strong>
                <p data-test={`count${index}`}>{poll.responses[response]}</p>
              </li>
            ))
          ) : (
            <p>No responses yet</p>
          )}
        </ul>
      </div>
    );
  }
}

export default Responses;
