import { Link } from 'react-router-dom'
import React from 'react'
import * as routes from '../../constants/routes'
import Logo from '../../images/peerPlusLogo.png'
import { withUserData } from '../../hocs/withUserData'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import AuthButtons from './AuthButtons'

const Navigation = ({ user }) => (
  <nav className="flex justify-between items-center ph5-ns ph3">
    <Link to={routes.HOME}>
      <img
        src={Logo}
        alt="Peer Plus"
        height="50"
        width="50"
        className="grow dib mv2"
      />
    </Link>
    <AuthButtons user={user} />
  </nav>
)

export default compose(
  setPropTypes({ user: PropTypes.object }),
  setDisplayName('Navigation'),
  withUserData
)(Navigation)
