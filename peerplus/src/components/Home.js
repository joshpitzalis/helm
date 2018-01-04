import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth, facebookAuthProvider, db } from '../constants/firebase';
import * as routes from '../constants/routes';

class Home extends Component {
  state = {
    user: null,
    polls: []
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }));
    db
      .collection(`polls`)
      .get()
      .then(coll => {
        const polls = coll.docs.map(doc => doc.data());
        this.setState({ polls });
      });
  }

  render() {
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          {this.state.user ? (
            <Link to={routes.CREATE}>
              <button data-test="create" autoFocus tabIndex="0">
                Create a Poll
              </button>
            </Link>
          ) : (
            <p>You are not logged in.</p>
          )}

          {this.state.user && (
            <ul className="list pl0 ml0 center mw6 br2 ">
              {this.state.polls.length !== 0 ? (
                this.state.polls.map((poll, index) => (
                  <li
                    key={index}
                    data-colour="green"
                    className="ph3 pv3 mv3 grow">
                    <Link
                      to={`/poll/${poll.id}`}
                      data-test={`poll${index}`}
                      className="link">
                      {poll.title}
                    </Link>

                    {poll.createdBy === this.state.user.uid && (
                      <Link
                        to={`/responses/${poll.id}`}
                        data-test={`response${index}`}>
                        (Responses)
                      </Link>
                    )}
                  </li>
                ))
              ) : (
                <p>No Polls available.</p>
              )}
            </ul>
          )}
        </section>
      </article>
    );
  }
}

export default Home;
