import React, { Component, Fragment } from "react";
import { withFriendsData } from "../../hocs/withFriendsData";
import { Loading } from "../Loading";
import axios from "axios";
import { auth, db } from "../../constants/firebase";
import PropTypes from "prop-types";

class Friends extends Component {
  render() {
    const {
      sendTo,
      handleAddFriend,
      handleRemoveFriend,
      handleSubmit,
      goToPrev,
      friends
    } = this.props;
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
          <FriendList friends={friends} handleAddFriend={handleAddFriend} />
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

export default withFriendsData(Friends);
