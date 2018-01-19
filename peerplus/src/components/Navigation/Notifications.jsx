import { auth, facebookAuthProvider } from '../../constants/firebase';
import React from 'react';
import { compose, branch, renderNothing, setDisplayName, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { WithPrivatePollData } from '../../hocs/withPollData';

const showIfLoggedIn = branch(({ user }) => !user, renderNothing);

const Notifications = showIfLoggedIn(({ user }) => (
  <WithPrivatePollData>
    {polls => <p className="tr bn underline f4 b pointer seethrough"> {polls.length}</p>}
  </WithPrivatePollData>
));

export default compose(setDisplayName('Notifications'), setPropTypes({ user: PropTypes.object }))(Notifications);
