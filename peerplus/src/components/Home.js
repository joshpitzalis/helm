import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import * as routes from '../constants/routes'

class Home extends Component {
  state = {
    user: null,
    polls: []
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
    db
      .collection(`polls`)
      .get()
      .then(coll => {
        const polls = coll.docs.map(doc => doc.data())
        this.setState({ polls })
      })
  }

  render() {
    return (
      <Fragment>
        {this.state.user ? (
          <Link to={routes.CREATE}>
            <button data-test="create" autoFocus tabIndex="0">
              Create a Poll
            </button>
          </Link>
        ) : (
          <p>You are not logged in</p>
        )}

        {this.state.user && (
          <ul>
            {this.state.polls.map((poll, index) => (
              <li key={index}>
                <Link to={`/poll/${poll.id}`} data-test={`poll${index}`}>
                  {poll.title}
                </Link>

                {poll.createdBy === this.state.user.uid && (
                  <Link
                    to={`/responses/${poll.id}`}
                    data-test={`response${index}`}
                  >
                    (Responses)
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </Fragment>
    )
  }
}

export default Home
