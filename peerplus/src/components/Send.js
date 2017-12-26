import React, { Component } from 'react'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import * as routes from '../constants/routes'

class Send extends Component {
  state = {
    user: null,
    friends: [],
    sendTo: [],
    redirectTo: null
  }

  componentDidMount() {
    auth.getRedirectResult().then(result => {
      if (result.credential) {
        var token = result.credential.accessToken

        axios
          .get(
            `https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`
          )
          .then(result => this.setState({ friends: result.data.data }))
          .catch(error => console.log(error))
      }
    })
  }

  addFriend = (id, name, photo) => {
    let sendTo = this.state.sendTo.concat([{ name, photo, id }])
    this.setState({ sendTo })
  }

  removeFriend = id => {
    let sendTo = this.state.sendTo.filter(friend => friend.id !== id)
    this.setState({ sendTo })
  }

  handleSubmit = async e => {
    e.preventDefault()
    // create the poll
    const newPoll = await db.collection('polls').doc()

    db.doc(`polls/${this.props.match.params.pollId}`).update({
      sentTo: this.state.sendTo,
      id: this.props.match.params.pollId
    })

    //  get the id from firebase then redirect to it
    this.setState({
      redirectTo: `/congratulations/${this.props.match.params.pollId}`
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <div>
        <header>
          <h1>Send to</h1>
        </header>
        <ul>
          {this.state.sendTo.map(friend => (
            <li key={friend.id}>
              <img src={friend.photo} alt={`photo of ${friend.name}`} />
              {friend.name}
              <button onClick={() => this.removeFriend(friend.id)}>X</button>
            </li>
          ))}
        </ul>
        <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
          Sync friends
        </button>
        <p>Last synced ...</p>

        <button onClick={this.handleSubmit}>Send Poll</button>

        <ul>
          {this.state.friends.map(friend => (
            <li key={friend.id}>
              <img
                src={friend.picture.data.url}
                alt={`photo of ${friend.name}`}
              />

              {friend.name}

              <button
                onClick={() =>
                  this.addFriend(
                    friend.id,
                    friend.name,
                    friend.picture.data.url
                  )
                }
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Send
