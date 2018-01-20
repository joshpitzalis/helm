import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import * as routes from '../../constants/routes';
import Logo from '../../images/peerPlusLogo.png';
import { compose, setDisplayName, setPropTypes, withState } from 'recompose';
import PropTypes from 'prop-types';
import AuthButtons from './AuthButtons';
import Notifications from './Notifications';
import { withPrivatePollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';

const Navigation = ({
  showPolls, setPollsVisible, user, polls,
}) => (
  <Fragment>
    <nav className="flex justify-between items-center ph5-ns ph3">
      <Link to={routes.HOME}>
        <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
      </Link>
      <div className="flex">
        <button onClick={() => setPollsVisible(x => !x)} className="grow seethrough">
          <Notifications user={user} pollcount={polls && polls.length} />
        </button>
        <AuthButtons user={user} />
      </div>
    </nav>
    {showPolls && (
      <section className="center w-100 db">
        <div className="pa3 pa5-ns ">
          <p className="f4 bold center mw6">{polls && polls.length} Polls to complete</p>
          <ul className="list pl0 ml0 center mw6 ba b--light-silver br2">
            {polls &&
              polls.map((poll, index) => (
                <li className="ph3 pv3 bb b--light-silver" key={index}>
                  {poll.title}
                </li>
              ))}
          </ul>
        </div>
      </section>
    )}
  </Fragment>
);

export default compose(
  setPropTypes({ user: PropTypes.object, polls: PropTypes.array }),
  setDisplayName('Navigation'),
  withState('showPolls', 'setPollsVisible', false),
  withUserData,
  withPrivatePollData,
)(Navigation);
