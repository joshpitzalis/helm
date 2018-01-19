import { lifecycle } from 'recompose';
import { auth, db } from '../constants/firebase';
import React, { Component, Fragment } from 'react';

export const withPollData = lifecycle({
  componentDidMount() {
    db
      .collection('polls')
      .get()
      .then(coll => {
        const polls = coll.docs.map(doc => doc.data());
        this.setState({ polls });
      });
  },
});

export class WithPrivatePollData extends Component {
  state = {
    polls: [],
  };
  async componentDidMount() {
    const myFacebookId =
      auth.currentUser &&
      (await db
        .collection('users')
        .where('uid', '==', auth.currentUser.uid)
        .limit(1)
        .get()
        .then(doc => doc.docs.map(doc => doc.data()))
        .then(data => data[0].id));

    db
      .collection('polls')
      .where(`participants.${myFacebookId}`, '==', true)
      .get()
      .then(coll => {
        const polls = coll.docs.map(doc => doc.data());
        this.setState({ polls });
      });
  }
  render() {
    return <Fragment> {this.props.children(this.state.polls)}</Fragment>;
  }
}

export class WithMyPollData extends Component {
  state = {
    polls: [],
  };
  componentDidMount() {
    db
      .collection('polls')
      .where('createdBy', '==', this.props.uid)
      .get()
      .then(coll => {
        const polls = coll.docs.map(doc => doc.data());
        this.setState({ polls });
      });
  }
  render() {
    return <Fragment> {this.props.children(this.state.polls)}</Fragment>;
  }
}
