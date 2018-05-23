import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { WithMyPollData } from '../../hocs/withPollData';
import CreatePollButton from './CreatePollButton';
import Polls from './Polls';
import { Loading } from '../Loading';
import { db } from '../../constants/firebase';
import { withUserData } from '../../hocs/withUserData';

const Home = ({ user }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <Badges user={user} />
      {user && (
        <WithMyPollData uid={user.providerData[0].uid}>
          {polls => (polls.length > 0 ? <Polls polls={polls} user={user} /> : <Loading />)}
        </WithMyPollData>
      )}
    </section>
  </article>
);

Home.propTypes = {
  user: PropTypes.shape({
    providerData: PropTypes.array.isRequired,
  }).isRequired,
};

class _Badges extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      onboarding: [],
    };
  }

  componentDidMount() {
    db
      .doc(`users/${this.props.user.providerData[0].uid}`)
      .get()
      .then(user => this.setState({ onboarding: user.data().onboarding }));

    // window.addEventListener('beforeinstallprompt', (e) => {
    //   e.userChoice.then((choiceResult) => {
    //     if (choiceResult.outcome === 'dismissed') {
    //       console.log('User cancelled home screen install');
    //     } else {
    //       console.log('User added to home screen');
    //     }
    //   });
    // });
  }

  render() {
    return (
      <div className="grid row5 row-ns rowGap1">
        <Link to={`/onboarding/${this.props.user.uid}`} className="pt3">
          <Thunder
            color={
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Weekly
            color={
              this.state.onboarding &&
              this.state.onboarding.weekly &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <First
            color={
              this.state.onboarding &&
              this.state.onboarding.public &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Picture
            color={
              this.state.onboarding &&
              this.state.onboarding.photo &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Chart
            color={
              this.state.onboarding &&
              this.state.onboarding.response &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Recieve
            color={
              this.state.onboarding &&
              this.state.onboarding.recieved &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`} className="pt2">
          <Add
            color={
              this.state.onboarding &&
              this.state.onboarding.private &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Person
            color={
              this.state.onboarding &&
              this.state.onboarding.friends &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`}>
          <Invite
            color={
              this.state.onboarding &&
              this.state.onboarding.invite &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
        <Link to={`/onboarding/${this.props.user.uid}`} className="pt1">
          <Trash
            color={
              this.state.onboarding &&
              this.state.onboarding.delete &&
              {
                0: '#f7db8c',
                1: '#ffaf39',
                2: '#f37966',
                3: '#adcfe2',
                4: '#dce8bd',
              }[Math.floor(Math.random() * 4) + 1]
            }
          />
        </Link>
      </div>
    );
  }
}

_Badges.propTypes = {
  user: PropTypes.shape({
    providerData: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

const Badges = compose(withUserData)(_Badges);

export { Badges };

export default compose(
  withUserData,
  // lifecycle({
  //   componentDidMount() {
  //     this.notifications = new NotificationResource(messaging);
  //   },
  // }),
)(Home);
