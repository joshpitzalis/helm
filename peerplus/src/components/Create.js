import React, { Component, Fragment } from 'react'
import { auth, facebookAuthProvider } from '../constants/firebase'
import axios from 'axios'

class Create extends Component {
  state = {
    user: null,
    friends: []
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  render() {
    return (
      <Fragment>
        <h1>Create</h1>
        <form action="">
          <div>
            <input type="text" placeholder="name" />
          </div>
          <div>
            <input type="text" placeholder="context" />
          </div>
          <hr />
          <div>
            <div>
              <input type="radio" name="choice" value="single" />Single Choice
            </div>
            <div>
              <input type="radio" name="choice" value="multiple" />Multiple
              Choice
            </div>
          </div>
          <hr />
          <div>
            <div>
              <input type="radio" name="type" value="text" />Text
            </div>
            <div>
              <input type="radio" name="type" value="image" />Image
            </div>
          </div>
          <hr />
          <div>
            <input type="range" />Duration
          </div>
          <hr />
          <div>
            <input type="checkbox" defaultChecked />Keep Private
          </div>
          <br />
          <input type="submit" defaultChecked value="Create Poll" />
        </form>
      </Fragment>
    )
  }
}

export default Create
