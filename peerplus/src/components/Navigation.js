import { Link } from 'react-router-dom'
import { auth, facebookAuthProvider } from '../constants/firebase'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as routes from '../constants/routes'

export default class Navigation extends Component {
  static propTypes = {}

  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  render() {
    return (
      <Fragment>
        <ul>
          <li>
            <Link to={routes.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={routes.HOME}>Dashboard</Link>
          </li>
          {/* <li>
            <Link to={routes.ACCOUNT}>Account</Link>
          </li> */}
        </ul>
        {this.state.user ? (
          <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
            Logout
          </button>
        ) : (
          <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
            Login with Facebook
          </button>
        )}
      </Fragment>
    )
  }
}
