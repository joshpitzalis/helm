import React from 'react';
import { withMyPollData, WithMyPollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';
import { compose } from 'recompose';
import CreatePollButton from './CreatePollButton';
import Polls from './Polls';
import { auth } from '../../constants/firebase';
import { Thunder } from '../Onboarding/Badges';
import { Link } from 'react-router-dom';

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <Badges user={user} />
      {user && <WithMyPollData uid={user.uid}>{polls => <Polls polls={polls} />}</WithMyPollData>}
    </section>
  </article>
);

export const Badges = ({ user }) => (
  <div className="grid row gap1trades">
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Thunder />
    </Link>
  </div>
);

export default compose(withUserData)(Home);
