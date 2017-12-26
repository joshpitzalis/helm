import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import * as routes from '../constants/routes'

class Poll extends Component {
  state = {
    user: null,
    poll: {}
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))

    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(
        poll =>
          poll.exists &&
          this.setState({
            poll: poll.data()
          })
      )
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.state.poll.title}</h1>
          <h2>{this.state.poll.context}</h2>
        </header>
        {this.state.poll.text ? (
          <ul>
            {this.state.poll.questions &&
              this.state.poll.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
          </ul>
        ) : (
          this.state.poll.questions &&
          this.state.poll.questions.map(picture => <img src={picture} />)
        )}
      </div>
    )
  }
}

export default Poll
