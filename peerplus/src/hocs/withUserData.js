import { lifecycle } from 'recompose'
import { auth } from '../constants/firebase'

export const withUserData = lifecycle({
  componentDidMount () {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }
})
