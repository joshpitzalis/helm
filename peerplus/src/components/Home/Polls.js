import React, { Fragment } from 'react';
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes,
} from 'recompose';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from '../Loading';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
// import PieChart from 'react-minimal-pie-chart';

const NoPollsAvailable = () => <p>No Polls available.</p>;

const onlyShowIfPollsAvailable = branch(
  ({ polls }) => polls && polls.length === 0,
  renderComponent(NoPollsAvailable),
);

const showSpinnerWhileLoading = branch(({ polls }) => !polls, renderComponent(Loading));

// const onlyShowIfAuthenticated = branch(({ user }) => !user, renderNothing);

const ListOfPolls = ({ polls, user }) => (
  <ul className="list pl0 ml0 center mw6 br2 ">
    {polls.map((poll, index) => (
      <Fragment>
        {/* <PieChart
          data={[
            { value: 10, key: 1, color: '#E38627' },
            { value: 15, key: 2, color: '#C13C37' },
            { value: 20, key: 3, color: '#6A2135' },
          ]}
        /> */}
        <li
          data-colour="green"
          className="ph3 pv3 mv3 grow"
          key={index}
          data-test={`response${index}`}
        >
          <Link
            to={`/responses/${poll.id}`}
            onClick={() => markOnboardingStepComplete(user.providerData[0].uid, 'response')}
          >
            {Object.keys(poll.participants).length > 0 &&
              poll.completedBy &&
              `${calculatePercentageComplete(
                Object.keys(poll.participants).length,
                poll.completedBy.length,
              )}%`}
            {poll.title}
          </Link>
        </li>
      </Fragment>
    ))}
  </ul>
);

export default compose(
  setDisplayName('Polls'),
  setPropTypes({
    polls: PropTypes.array,
  }),
  // onlyShowIfAuthenticated,
  onlyShowIfPollsAvailable,
  showSpinnerWhileLoading,
)(ListOfPolls);

export const calculatePercentageComplete = (participants, completedBy) =>
  Math.floor(completedBy / participants * 100);
