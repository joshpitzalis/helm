import React, { Component, Fragment } from 'react';
import { withFriendsData } from '../../hocs/withFriendsData';
import { Loading } from '../Loading';
import axios from 'axios';
import { auth, db } from '../../constants/firebase';
import PropTypes from 'prop-types';
import { Trash } from '../Onboarding/Badges';

class Friends extends Component {
  render() {
    const {
      sendTo,
      handleAddFriend,
      handleRemoveFriend,
      handleSubmit,
      goToPrev,
      friends,
    } = this.props;
    return (
      <Fragment>
        <header>
          <h2 className="f1">Send to</h2>
        </header>

        {sendTo.length > 0 && (
          <div className="br3 pa4 bg-white grid col3">
            {sendTo &&
              sendTo.map((friend, index) => (
                <div key={index} className="grid col aic jcc ma0">
                  <div className="w-100 tc">
                    <img
                      src={friend.photo}
                      alt={`${friend.name}`}
                      className="br-100 h3 w3 dib ma0"
                    />
                  </div>
                  {friend.name}
                  <div className="w-100 tc ma0">
                    <Trash
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFriend(friend.id);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="br3 pa4 bg-white grid col3">
          {/* <button onClick={() => auth.signInWithRedirect(facebookAuthProvider)}>
            Sync friends
          </button> */}
          {/* <p>Last synced ...</p> */}

          <FriendList friends={friends} handleAddFriend={handleAddFriend} />
        </div>
        <br />
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
      <div key={friend.id} data-friend className="grid col aic jcc ma0">
        <div className="w-100 tc">
          <img
            src={friend.picture.data.url}
            alt={`${friend.name}`}
            className="br-100 h3 w3 dib ma0"
          />
        </div>
        {friend.name}
        <button
          data-addfriend
          onClick={(e) => {
            e.preventDefault();
            handleAddFriend(friend.id, friend.name, friend.picture.data.url);
          }}
        >
          Add Friend
        </button>
      </div>
    ))}
  </Fragment>
);

export default withFriendsData(Friends);
