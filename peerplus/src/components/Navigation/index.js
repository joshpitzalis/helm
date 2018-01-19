import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import * as routes from '../../constants/routes';
import Logo from '../../images/peerPlusLogo.png';
import { withUserData } from '../../hocs/withUserData';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import AuthButtons from './AuthButtons';
import Notifications from './Notifications';
import { WithPrivatePollData } from '../../hocs/withPollData';

const Navigation = ({ user }) => (
  <Fragment>
    <nav className="flex justify-between items-center ph5-ns ph3">
      <Link to={routes.HOME}>
        <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
      </Link>
      <div className="flex">
        <Notifications user={user} />
        <AuthButtons user={user} />
      </div>
    </nav>
    <section className="db center w-100">
      <div className="pa3 pa5-ns ">
        <p className="f4 bold center mw6">Polls to complete</p>
        <ul className="list pl0 ml0 center mw6 ba b--light-silver br2">
          <WithPrivatePollData>
            {polls =>
              polls.map(poll => <li className="ph3 pv3 bb b--light-silver">{poll.title}</li>)
            }
          </WithPrivatePollData>
        </ul>
      </div>
    </section>
  </Fragment>
);

export default compose(
  setPropTypes({ user: PropTypes.object }),
  setDisplayName('Navigation'),
  withUserData,
)(Navigation);
