import React, { Component, Fragment } from 'react';
import { withFriendsData } from '../../hocs/withFriendsData';
import { Loading } from '../Loading';
import axios from 'axios';
import { auth, db } from '../../constants/firebase';
import PropTypes from 'prop-types';
import { WithOnePollData } from '../../hocs/withPollData';
import { Redirect } from 'react-router-dom';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import { withUserData } from '../../hocs/withUserData';

class AddTo extends Component {
  state = {
    sendTo: [],
    participants: {},
    redirectTo: null,
  };

  componentWillReceiveProps(nextProps) {
    const sendTo = nextProps.friends.filter(friend =>
      Object.keys(nextProps.poll.participants).some(x => x === friend.id),
    );

    this.setState({
      sendTo,
      participants: nextProps.poll.participants,
    });
  }

  handleAddFriend = (id, name, photo) => {
    let sendTo = this.state.sendTo.concat([{ name, photo, id }]);
    let newParticipant = { [id]: true };
    let participants = { ...this.state.participants, ...newParticipant };
    this.setState({ sendTo, participants });
  };

  handleRemoveFriend = id => {
    let sendTo = this.state.sendTo.filter(friend => friend.id !== id);
    let participants = { ...this.state.participants };
    delete participants[id];
    this.setState({ sendTo, participants });
  };

  handleSubmit = e => {
    e.preventDefault();

    markOnboardingStepComplete(this.props.user.providerData[0].uid, 'invite');

    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .update({
        sendTo: this.state.sendTo,
        participants: this.state.participants,
      })
      .then(this.setState({ redirectTo: `/responses/${this.props.match.params.pollId}` }))
      .catch(error => console.error(error));
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <article className="pv5">
        <form className="mw6-ns w-100 center tc">
          <header>
            <h2 className="f1">Send to</h2>
          </header>
          <ul>
            {this.state.sendTo &&
              this.state.sendTo.map((friend, index) => (
                <li key={index}>
                  <img src={friend.photo || friend.picture.data.url} alt={`${friend.name}`} />
                  {friend.name}
                  <button
                    onClick={e => {
                      e.preventDefault();
                      this.handleRemoveFriend(friend.id);
                    }}
                  >
                    X
                  </button>
                </li>
              ))}
          </ul>
          <hr />
          <ul>
            <FriendList
              friends={this.props.friends}
              handleAddFriend={this.handleAddFriend}
              sendTo={this.state.sendTo}
            />
          </ul>

          <button
            onClick={this.handleSubmit}
            type="submit"
            data-colour="green"
            data-test="submit"
            className=" grow"
          >
            Submit
          </button>
        </form>
      </article>
    );
  }
}

const FriendList = ({ friends, handleAddFriend, sendTo }) => (
  <Fragment>
    {friends.map(friend => (
      <li key={friend.id} data-friend>
        <img src={friend.picture.data.url} alt={`${friend.name}`} />
        {friend.name}
        <button
          data-addfriend
          onClick={e => {
            e.preventDefault();
            handleAddFriend(friend.id, friend.name, friend.picture.data.url);
          }}
          disabled={sendTo.find(send => send.id === friend.id)}
        >
          Add Friend
        </button>
      </li>
    ))}
  </Fragment>
);

export default withUserData(WithOnePollData(withFriendsData(AddTo)));
