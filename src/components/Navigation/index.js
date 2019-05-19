import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { compose, setDisplayName, withState } from "recompose";
import { auth } from "../../constants/firebase";
import * as routes from "../../constants/routes";
import { withPrivatePollData } from "../../hocs/withPollData";
import { withUserData } from "../../hocs/withUserData";
import AuthButtons from "./AuthButtons";
import { DeleteAccount } from "./DeleteAccount.jsx";
import { LoggedIn } from "./LoggedIn.jsx";

const navMachine = {
  // loading: {},
  loggedIn: {
    LOGOUT: "loggedOut"
  },
  loggedOut: {
    LOGIN: "loggedIn"
  }
};

export class Navbar extends Component {
  state = {
    now: "loggedOut",
    deleteAccount: false
  };

  componentDidMount() {
    auth.onAuthStateChanged(user =>
      user
        ? (this.setState({ user }), this.transition({ type: "LOGIN" }))
        : this.transition({ type: "LOGOUT" })
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
        ...sideEffects
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
            loggedOut: (
              <LoggedOut {...this.props} transition={this.transition} />
            ),
            loggedIn: (
              <LoggedIn
                {...this.props}
                transition={this.transition}
                handleShowDeleteModal={this.handleShowDeleteModal}
                handleCloseDeleteModal={this.handleCloseDeleteModal}
              />
            )
          }[this.state.now]
        }
      </div>
    );
  }
}

export default compose(
  setDisplayName("Navigation"),
  withState("showPolls", "setPollsVisible", false),
  withUserData,
  withPrivatePollData
)(Navbar);

const LoggedOut = ({ transition }) => {
  return (
    <Fragment>
      <nav className="flex justify-between items-center ph5-ns ph3 bg-brown">
        <Link to={routes.HOME}>
          {/* <img
            src={Logo}
            alt="Peer Plus"
            height="50"
            width="50"
            className="grow dib mv2"
          /> */}
          <p className="f2 small-caps b">db</p>
        </Link>
        <div className="flex">
          <AuthButtons />
        </div>
      </nav>
    </Fragment>
  );
};
