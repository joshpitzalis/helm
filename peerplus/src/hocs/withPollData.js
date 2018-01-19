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

export const withMyPollData = lifecycle({
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

export class WithMyPollData extends Component {
  state = {
    polls: [],
  };
  componentDidMount() {
    console.log('this.props.uid', this.props.uid);

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
