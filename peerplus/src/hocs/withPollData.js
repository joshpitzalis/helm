import { lifecycle, compose } from 'recompose';
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

export const withPrivatePollData = lifecycle({
  componentDidMount() {
    let facebookId;
    auth.onAuthStateChanged(user => {
      if (user) {
        facebookId = auth.currentUser.providerData[0].uid;
        db
          .collection('polls')
          .where(`participants.${facebookId}`, '==', true)
          .get()
          .then(coll =>
            this.setState({
              polls: coll.docs.map(doc => doc.data()),
            }),
          );
      } else {
        console.error('You not be logged in, matey.');
      }
    });
  },
});

export class getPollsToComplete extends Component {
  state = {
    polls: null,
  };
  componentDidMount() {
    if (!this.state.polls) {
      auth.currentUser &&
        db
          .collection('users')
          .where('uid', '==', auth.currentUser.uid)
          .limit(1)
          .get()
          .then(doc => doc.docs.map(doc => doc.data()))
          .then(data =>
            db
              .collection('polls')
              .where(`participants.${data[0].id}`, '==', true)
              .get()
              .then(coll => {
                const polls = coll.docs.map(doc => doc.data());
                this.setState({ polls });
              }),
          )
          .catch(error => console.error(error));
    }
    return this.state.polls;
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
