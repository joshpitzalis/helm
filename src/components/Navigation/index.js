import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import * as routes from '../../constants/routes';
import Logo from '../../images/peerPlusLogo.png';
import { compose, setDisplayName, setPropTypes, withState } from 'recompose';
import PropTypes from 'prop-types';
import { auth, facebookAuthProvider } from '../../constants/firebase';
import AuthButtons from './AuthButtons';
import Notifications from './Notifications';
import { withPrivatePollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';
import PollBox from './PollBox';

const navMachine = {
  // loading: {},
  loggedIn: {
    LOGOUT: 'loggedOut',
  },
  loggedOut: {
    LOGIN: 'loggedIn',
  },
};

class Navbar extends Component {
  state = {
    now: 'loggedOut',
  };

  componentDidMount() {
    auth.onAuthStateChanged(
      user => (user ? this.transition({ type: 'LOGIN' }) : this.transition({ type: 'LOGOUT' })),
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user) {
  //     this.transition({ type: 'LOGIN' });
  //   }
  //   if (!nextProps.user) {
  //     this.transition({ type: 'LOGOUT' });
  //   }
  // }

  transition = action => {
    const currentState = this.state.now;
    const nextState = navMachine[currentState][action.type];

    if (nextState) {
      const sideEffects = this.command(nextState, action);

      this.setState({
        now: nextState,
        ...sideEffects,
      });
    }
  };

  command(nextState, action) {
    switch (nextState) {
      // case 'loggedOut':
      //   auth
      //     .signInWithRedirect(facebookAuthProvider)
      //     .then(() => {
      //       console.log('pog');
      //       this.transition({ type: 'LOGIN' });
      //     })
      //     .catch(error => {
      //       // this.transition({ type: 'LOGOUT' });
      //       console.error(error);
      //     });
      //   break;
      // case 'loggedIn':
      // auth
      //   .signInWithRedirect(facebookAuthProvider)
      //   .then(() => this.transition({ type: 'LOGOUT' }))
      //   .catch(error => {
      //     // this.transition({ type: 'LOGOUT' });
      //     console.error(error);
      //   });
      // break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        {
          {
            loggedOut: <LoggedOut {...this.props} transition={this.transition} />,
            loggedIn: <LoggedIn {...this.props} transition={this.transition} />,
          }[this.state.now]
        }
      </div>
    );
  }
}

const LoggedIn = ({ showPolls, setPollsVisible, user, polls, transition }) => {
  const PollsForMe =
    (polls &&
      user &&
      polls.filter(
        poll => !poll.seenBy || !Object.keys(poll.seenBy).includes(user.providerData[0].uid),
      )) ||
    [];

  const ResultsForMe =
    (polls &&
      user &&
      polls.filter(poll => poll.ended && poll.seenBy[user.providerData[0].uid] === true)) ||
    [];

  const pollsAndResults = [...ResultsForMe, ...PollsForMe];

  return (
    <Fragment>
      <nav className="flex justify-between items-center ph5-ns ph3">
        <Link to={routes.HOME}>
          <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
        </Link>
        <div className="flex">
          <button onClick={() => setPollsVisible(x => !x)} className="grow seethrough">
            {pollsAndResults &&
              pollsAndResults.length > 0 && <Notifications pollcount={pollsAndResults.length} />}
          </button>
          {!user && <AuthButtons user={user} />}
          {/* <button onClick={() => transition({ type: 'LOGOUT' })}>Login</button> */}
        </div>
      </nav>
      {showPolls && (
        <PollBox polls={pollsAndResults} close={() => setPollsVisible(x => !x)} user={user} />
      )}
    </Fragment>
  );
};

const LoggedOut = ({ transition }) => {
  return (
    <Fragment>
      <nav className="flex justify-between items-center ph5-ns ph3 bg-brown">
        <Link to={routes.HOME}>
          <img src={Logo} alt="Peer Plus" height="50" width="50" className="grow dib mv2" />
        </Link>
        <div className="flex">
          <AuthButtons />
          {/* <button onClick={() => transition({ type: 'LOGIN' })}>Login</button> */}
        </div>
      </nav>
    </Fragment>
  );
};

LoggedIn.propTypes = {
  user: PropTypes.object,
  polls: PropTypes.array,
  showPolls: PropTypes.bool.isRequired,
  setPollsVisible: PropTypes.func.isRequired,
};

export default compose(
  setDisplayName('Navigation'),
  withState('showPolls', 'setPollsVisible', false),
  withUserData,
  withPrivatePollData,
)(Navbar);
