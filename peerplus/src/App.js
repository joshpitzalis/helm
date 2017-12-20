import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { auth, facebookAuthProvider } from './firebase'
// import graph from 'fb-react-sdk'
import axios from 'axios'

class App extends Component {
  state = {
    friends: []
  }

  componentDidMount() {
    auth.getRedirectResult().then(result =>
      // this.statusChangeCallback(result)
      // console.log('abc', result)

      {
        if (result.credential) {
          var token = result.credential.accessToken
          // graph.setAccessToken(token)

          axios
            .get(
              `https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`
            )
            .then(result => this.setState({ friends: result.data.data }))
            .catch(error => console.log(error))

          // fetch(
          //   `https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`
          // )
          //   .then(res => res.json())
          //   .then(result => this.setState({ friends: result.data }))
          //   .catch(error => console.log(error))
        }
      }
    )
  }
  // ;(function(d, s, id) {
  //   var js,
  //     fjs = d.getElementsByTagName(s)[0]
  //   if (d.getElementById(id)) return
  //   js = d.createElement(s)
  //   js.id = id
  //   js.src = '//connect.facebook.net/en_US/sdk.js'
  //   fjs.parentNode.insertBefore(js, fjs)
  // })(document, 'script', 'facebook-jssdk')
  //
  // window.fbAsyncInit = function() {
  //   window.FB.init({
  //     appId: '165653757370811',
  //     cookie: true, // enable cookies to allow the server to access the session
  //     xfbml: true, // parse social plugins on this page
  //     version: 'v2.8' // use version 2.1
  //   })
  // }
  // window.fbAsyncInit = function() {
  //   window.FB.init({
  //     appId: '165653757370811',
  //     autoLogAppEvents: true,
  //     xfbml: true,
  //     version: 'v2.11'
  //   })
  //   // window.FB.getLoginStatus(function(response) {
  //   //   statusChangeCallback(response)
  //   // })
  // }
  // ;(function(d, s, id) {
  //   var js,
  //     fjs = d.getElementsByTagName(s)[0]
  //   if (d.getElementById(id)) {
  //     return
  //   }
  //   js = d.createElement(s)
  //   js.id = id
  //   js.src = 'https://connect.facebook.net/en_US/sdk.js'
  //   fjs.parentNode.insertBefore(js, fjs)
  // })(document, 'script', 'facebook-jssdk')

  // facebookLogin = () => {
  //   /*window.FB.login(
  //         this.checkLoginState(),
  //         { scope : 'email, public_profile' } //Add scope whatever you need about the facebook user
  //     ); */
  //
  //   window.FB.login(
  //     function(resp) {
  //       this.statusChangeCallback(resp)
  //     }.bind(this),
  //     { scope: 'user_friends' }
  //   )
  // }

  // checkLoginState() {
  //   console.log('Checking login status...........')
  //
  //   window.FB.getLoginStatus(
  //     function(response) {
  //       console.log('----------->')
  //       console.log(response)
  //       this.statusChangeCallback(response)
  //     }.bind(this)
  //   )
  // }

  // statusChangeCallback(response) {
  //   console.log('statusChangeCallback')
  //   console.log(response)
  //   if (response.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     this.getFriends()
  //   } else if (response.status === 'not_authorized') {
  //     console.log('Import error', 'Authorize app to import data', 'error')
  //   } else {
  //     console.log('Import error', 'Error occured while importing data', 'error')
  //   }
  // }

  // getFriends = () => {
  //   window.FB.api('/me', { fields: 'friends' }, response => {
  //     if (response && !response.error) {
  //       console.log('friends', response)
  //       this.setState({ friends: response.friends.data })
  //     }
  //   })
  // }
  //
  // getFriendsProfilePhotos = id =>
  //   window.FB.api(`/${id}/picture`, response => response.url)

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">v 0.0.22</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <button
          onClick={() => {
            this.facebookLogin()
          }}
          >
          Login with Facebook
        </button> */}
        <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
          Login with Facebook
        </button>

        <ul>
          {this.state.friends &&
            this.state.friends.map(friend => (
              <li className="tc pa3 pa5-ns" key={friend.id}>
                <article className="hide-child relative ba b--black-20 mw5 center">
                  <img
                    src={friend.picture.data.url}
                    className="db"
                    alt={`photo of ${friend.name}`}
                  />
                  <div className="pa2 bt b--black-20">
                    <a className="f6 db link dark-blue hover-blue">
                      {friend.name}
                    </a>
                    {/* <p className="f6 gray mv1">5 mutual friends</p> */}
                    <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1">
                      Add Friend
                    </a>
                  </div>
                  <a className="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b">
                    ×
                  </a>
                </article>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

export default App
