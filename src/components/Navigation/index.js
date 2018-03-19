import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Logo from '../../images/peerPlusLogo.png';
import { compose, setDisplayName, withState } from 'recompose';
import PropTypes from 'prop-types';
import { auth } from '../../constants/firebase';
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
    deleteAccount: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged(
      user =>
        user
          ? (this.setState({ user }), this.transition({ type: 'LOGIN' }))
          : this.transition({ type: 'LOGOUT' }),
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
      default:
        break;
    }
  }

  handleShowDeleteModal = () => {
    this.setState({ deleteAccount: true });
  };

  handleCloseDeleteModal = () => {
    this.setState({ deleteAccount: false });
  };

  render() {
    if (this.state.deleteAccount) {
      return (
        <DeleteAccount
          handleCloseDeleteModal={this.handleCloseDeleteModal}
          user={this.state.user}
        />
      );
    }
    return (
      <div>
        {
          {
            loggedOut: <LoggedOut {...this.props} transition={this.transition} />,
            loggedIn: (
              <LoggedIn
                {...this.props}
                transition={this.transition}
                handleShowDeleteModal={this.handleShowDeleteModal}
                handleCloseDeleteModal={this.handleCloseDeleteModal}
              />
            ),
          }[this.state.now]
        }
      </div>
    );
  }
}

const DeleteAccount = ({ handleCloseDeleteModal, user }) => {
  return (
    <article className="vh-100 dt w-100 bg-red">
      <div className="dtc v-mid tc white ph3 ph4-l">
        <h1 className="f6 f2-m f-subheadline-l fw6 tc">Delete your account?</h1>

        <DeleteButton user={user} handleCloseDeleteModal={handleCloseDeleteModal} />
        <button className="seethrough white" onClick={() => handleCloseDeleteModal()}>
          Cancel
        </button>
      </div>
    </article>
  );
};

const DeleteButton = withState('message', 'setMessage', '')(
  withState('confirmVisible', 'setConfirmVisible', false)(
    withRouter(
      ({
        text,
        confirmVisible,
        setConfirmVisible,
        user,
        message,
        setMessage,
        history,
        handleCloseDeleteModal,
      }) =>
        confirmVisible ? (
          <div>
            <p className="white">Are you Sure?</p>
            <button
              data-test="delete"
              className="seethrough pointer white"
              onClick={() =>
                user
                  .delete()
                  .then(history.push('/'))
                  .then(() => handleCloseDeleteModal())
                  .catch(error => setMessage(error.message))
              }
            >
              {message ? (
                <p className="white">{message}</p>
              ) : (
                <p className="white">Yes, I'm Sure.</p>
              )}
            </button>
          </div>
        ) : (
          <button
            data-test="delete"
            className="seethrough pointer pt3 dim white"
            onClick={() => setConfirmVisible(true)}
          >
            Yes, Delete My Account
          </button>
        ),
    ),
  ),
);

const LoggedIn = ({
  showPolls,
  setPollsVisible,
  user,
  polls,
  transition,
  handleShowDeleteModal,
}) => {
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
          <button
            onClick={() => setPollsVisible(x => !x)}
            className="grow seethrough no-no-underline mt1"
          >
            {pollsAndResults &&
              pollsAndResults.length > 0 && <Notifications pollcount={pollsAndResults.length} />}
          </button>
          {!user && <AuthButtons user={user} />}
          {user && (
            <div className="flex x">
              <img
                src={user.photoURL}
                className="br-100 dib ma0 pointer grow"
                height="50"
                width="50"
                onClick={() => setPollsVisible(x => !x)}
                alt={user.displayName}
              />
            </div>
          )}
          {/* <button onClick={() => transition({ type: 'LOGOUT' })}>Login</button> */}
        </div>
      </nav>
      {showPolls && (
        <PollBox
          polls={pollsAndResults}
          close={() => setPollsVisible(x => !x)}
          user={user}
          handleShowDeleteModal={handleShowDeleteModal}
        />
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
