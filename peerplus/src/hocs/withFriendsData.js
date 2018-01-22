import { auth, db } from '../constants/firebase';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const withFriendsData = (WrappedComponent) => {
  return  class  extends Component {
    static contextTypes = { user: PropTypes.object };
  
    state = {
      friends: [],
    };
  
    async componentDidMount() {

      const token = await db
      .doc(`users/${this.context.user.providerData[0].uid}`)
      .get()
      .then(result => result.data().token);

      axios
        .get(`https://graph.facebook.com/me/friends?access_token=${token}&fields=name,id,picture`)
        .then(result => {
          console.log('friends', result.data.data);
          this.setState({ friends: result.data.data })})
        .catch(error => console.log(error));
    }
  
    render() {
      return <WrappedComponent friends={this.state.friends} {...this.props}/>
    }
  }
}



export class withMyData extends Component {
  state = {
    friends: [],
  };

  async componentDidMount() {
    const token = await db
      .doc(`users/${auth.currentUser.uid}`)
      .get()
      .then(result => result.data().token);

    axios
      .get(`https://graph.facebook.com/me?access_token=${token}&fields=name,id,picture`)
      .then(result => this.setState({ friends: result.data.data }))
      .catch(error => console.log(error));
  }

  render() {
    return <div>{this.props.children(this.state.friends)}</div>;
  }
}
