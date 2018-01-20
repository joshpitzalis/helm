import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import * as routes from '../../constants/routes';
import Logo from '../../images/peerPlusLogo.png';
import { compose, setDisplayName, setPropTypes, withState } from 'recompose';
import PropTypes from 'prop-types';
import AuthButtons from './AuthButtons';
import Notifications from './Notifications';
import { withPrivatePollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';
import PollBox from './PollBox';

const Navigation = ({ showPolls, setPollsVisible, user, polls }) => (
  <Fragment>
    <nav className="flex justify-between items-center ph5-ns ph3">
      <Link to={routes.HOME}>
        <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
      </Link>
      <div className="flex">
        <button onClick={() => setPollsVisible(x => !x)} className="grow seethrough">
          <Notifications pollcount={polls && polls.length} />
        </button>
        <AuthButtons user={user} />
      </div>
    </nav>
    {showPolls && <PollBox polls={polls} close={() => setPollsVisible(x => !x)} />}
  </Fragment>
);

export default compose(
  setPropTypes({ user: PropTypes.object, polls: PropTypes.array }),
  setDisplayName('Navigation'),
  withState('showPolls', 'setPollsVisible', false),
  withUserData,
  withPrivatePollData,
)(Navigation);
