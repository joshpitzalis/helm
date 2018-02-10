import React, { Component } from 'react';
import { WithMyPollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';
import { compose } from 'recompose';
import CreatePollButton from './CreatePollButton';
import Polls from './Polls';
import { auth, db } from '../../constants/firebase';
import {
  Thunder,
  Invite,
  Weekly,
  First,
  Picture,
  Recieve,
  Add,
  Person,
  Chart,
  Trash,
} from '../Onboarding/Badges';
import { Link } from 'react-router-dom';

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <Badges user={user} />
      {user && (
        <WithMyPollData uid={user.providerData[0].uid}>
          {polls => <Polls polls={polls} user={user} />}
        </WithMyPollData>
      )}
    </section>
  </article>
);

class _Badges extends Component {
  state = {
    onboarding: [],
  };

  componentDidMount() {
    db
      .doc(`users/${this.props.user.providerData[0].uid}`)
      .get()
      .then(user => this.setState({ onboarding: user.data().onboarding }));
  }

  render() {
    return (
      <div className="grid row gap1">
        <Link to={`/onboarding/${this.props.user.uid}`} className="pt3">
          <Thunder color="#f5b152" />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Weekly color={this.state.onboarding.weekly && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <First color={this.state.onboarding.public && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Picture color={this.state.onboarding.photo && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Chart color={this.state.onboarding.response && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Recieve color={this.state.onboarding.recieved && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`} className="pt2">
          <Add color={this.state.onboarding.private && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Person color={this.state.onboarding.friends && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Invite color={this.state.onboarding.invite && '#f5b152'} />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`} className="pt1">
          <Trash color={this.state.onboarding.delete && '#f5b152'} />
        </Link>
      </div>
    );
  }
}

const Badges = compose(withUserData)(_Badges);

export { Badges };

export default compose(withUserData)(Home);
