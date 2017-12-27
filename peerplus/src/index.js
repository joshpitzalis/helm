import React, { Fragment, Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import PropTypes from 'prop-types'
import { auth, facebookAuthProvider } from './constants/firebase'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import LandingPage from './components/Landing'
import HomePage from './components/Home'
import AccountPage from './components/Account'
import Create from './components/Create'
import Questions from './components/Questions'
import Send from './components/Send'
import Poll from './components/Poll'
import Congratulations from './components/Congratulations'
import Done from './components/Done'
import * as routes from './constants/routes'
import axios from 'axios'

export default class Routes extends Component {
  static propTypes = {}

  state = { auth: null, friends: null }

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
    auth.onAuthStateChanged(user => this.setState({ auth: user }))
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Navigation />
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route
            exact
            path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
          <Route exact path={routes.CREATE} component={Create} />
          <Route
            exact
            path={`${routes.QUESTIONS}/:pollId`}
            component={Questions}
          />
          <Route exact path={`${routes.SEND}/:pollId`} component={Send} />
          <Route exact path={`${routes.POLL}/:pollId`} component={Poll} />
          <Route
            exact
            path={`${routes.CONTRATULATIONS}/:pollId`}
            component={Congratulations}
          />
          <Route exact path={`${routes.DONE}/:pollId`} component={Done} />
        </Fragment>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Routes />, document.getElementById('root'))
registerServiceWorker()
