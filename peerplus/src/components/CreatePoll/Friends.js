import React, { Component, Fragment } from 'react';
// import WithFriends from '../../hocs/withFriendsData';
import { Loading } from '../Loading';
import axios from 'axios';
import { auth, db } from '../../constants/firebase';

export default class Friends extends Component {
  state = {
    currentState: 'loading',
    friends: [],
  };

  async componentDidMount() {
    const token = await db
      .doc(`users/${auth.currentUser.uid}`)
      .get()
      .then(result => result.data().token);

    axios
      .get(`https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`)
      .then(result => {
        this.setState({ friends: result.data.data });
        this.transition('ideal');
      })
      .catch(error => console.log(error));
  }

  transition(to) {
    this.setState({ currentState: to });
  }

  render() {
    const { sendTo, handleAddFriend, handleRemoveFriend, handleSubmit, goToPrev } = this.props;
    return (
      <Fragment>
        <header>
          <h1>Send to</h1>
        </header>
        <ul>
          {sendTo &&
            sendTo.map((friend, index) => (
              <li key={index}>
                <img src={friend.photo} alt={`${friend.name}`} />
                {friend.name}
                <button
                  onClick={e => {
                    e.preventDefault();
                    handleRemoveFriend(friend.id);
                  }}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        {/* <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
            Sync friends
          </button> */}
        {/* <p>Last synced ...</p> */}
        <ul>
          {
            {
              ideal: <FriendList friends={this.state.friends} handleAddFriend={handleAddFriend} />,
              loading: <Loading />,
            }[this.state.currentState]
          }
        </ul>
        <button onClick={goToPrev} type="submit" className="seethrough ">
          Back
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          data-colour="green"
          data-test="submit"
          className=" grow"
        >
          Submit
        </button>
      </Fragment>
    );
  }
}

const FriendList = ({ friends, handleAddFriend }) => (
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
        >
          Add Friend
        </button>
      </li>
    ))}
  </Fragment>
);
