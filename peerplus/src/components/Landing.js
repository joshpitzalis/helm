import React, { Component } from 'react'
import { auth, facebookAuthProvider } from '../constants/firebase'

class App extends Component {
  state = {
    friends: []
  }

  render() {
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
