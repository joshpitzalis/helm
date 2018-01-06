import React, { Component } from 'react'
import { auth, facebookAuthProvider } from '../constants/firebase'
import { Redirect } from 'react-router-dom'

class App extends Component {
  state = {
    friends: [],
    redirectTo: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ redirectTo: '/home' }))
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <div>
        <header>
          <h1>Landing</h1>
        </header>
      </div>
    )
  }
}

export default App
