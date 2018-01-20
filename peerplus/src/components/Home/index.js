import React from 'react';
import { withMyPollData, WithMyPollData } from '../../hocs/withPollData';
import { withUserData } from '../../hocs/withUserData';
import { compose } from 'recompose';
import CreatePollButton from './CreatePollButton';
import Polls from './Polls';
import { auth } from '../../constants/firebase';

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      {user && <WithMyPollData uid={user.uid}>{polls => <Polls polls={polls} />}</WithMyPollData>}
    </section>
  </article>
);

export default compose(withUserData)(Home);
