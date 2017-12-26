import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { auth, facebookAuthProvider } from '../constants/firebase'
import * as routes from '../constants/routes'

class Congratulations extends Component {
  state = {
    user: null
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  render() {
    return (
      <div>
        <Link to={`/poll/${this.props.match.params.pollId}`}>
          <h1>{`Poll is available at ${this.props.match.params.pollId}`}</h1>
        </Link>
      </div>
    )
  }
}

export default Congratulations
