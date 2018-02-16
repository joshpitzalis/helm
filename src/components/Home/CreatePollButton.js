import React from 'react'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'
import {
  compose,
  setDisplayName,
  setPropTypes,
  branch,
  renderComponent
} from 'recompose'
import PropTypes from 'prop-types'

const NotLoggedIn = () => <p>You are not logged in.</p>

const hideIfNotLoggedIn = branch(
  ({ user }) => !user,
  renderComponent(NotLoggedIn)
)

const Button = hideIfNotLoggedIn(({ user }) => (
  <Link to={routes.CREATE}>
    <button data-test="create" className="grow" tabIndex="0">
      Create a Poll
    </button>
  </Link>
))

export default compose(
  setDisplayName('CreatePollButton'),
  setPropTypes({ user: PropTypes.object })
)(Button)
