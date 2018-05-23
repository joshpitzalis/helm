import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, setDisplayName, setPropTypes } from 'recompose';
import PieChart from 'react-minimal-pie-chart';
import { FormattedMessage } from 'react-intl';
import { addHours, formatDistance, isAfter } from 'date-fns';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import { Chevron } from '../../images/svg';

const NoPollsAvailable = () => (
  <p>
    <FormattedMessage id="home.noPolls" />
  </p>
);

const onlyShowIfPollsAvailable = branch(
  ({ polls }) => polls && polls.length === 0,
  renderComponent(NoPollsAvailable),
);

const showSpinnerWhileLoading = branch(({ polls }) => !polls, renderComponent(Loading));

export const calculatePercentageComplete = (participants, completedBy) => {
  const avg = completedBy / participants;
  return Math.floor(avg * 100);
};

const ListOfPolls = ({ polls, user }) => (
  <ul className="list pl0 ml0 center mw6 br2 tl ">
    {polls.map((poll, index) => (
      <div className="flex jcc" key={poll.id}>
        <PieChart
          data={
            poll.responses
              ? Object.values(poll.responses).map((response, indexx) => ({
                value: response,
                key: index,
                color: {
                  0: '#f7db8c',
                  1: '#adcfe2',
                  2: '#f37966',
                  3: '#dce8bd',
                  4: '#ffaf39',
                }[indexx],
              }))
              : [
                {
                  value: 1,
                  key: 0,
                  color: '#dce8bd',
                },
              ]
          }
          className="h3 w3 dib top-1 relative ml2"
        />
        <Link
          data-colour={
            (!poll.ended || poll.ended === false) &&
            isAfter(addHours(poll.createdAt, poll.duration), new Date())
              ? 'green'
              : 'red'
          }
          to={`/responses/${poll.id}`}
          className="link flex aic jcb w-100 h3 ph3 dim ml3"
          onClick={() => markOnboardingStepComplete(user.providerData[0].uid, 'response')}
        >
          {poll.privacy === 'private' && (
            <span
              className={`f3 mr3 ${
                (!poll.ended || poll.ended === false) &&
                isAfter(addHours(poll.createdAt, poll.duration), new Date())
                  ? 'dark'
                  : 'light'
              }`}
            >
              {Object.keys(poll.participants).length > 0 && poll.completedBy
                ? `${calculatePercentageComplete(
                    Object.keys(poll.participants).length,
                    poll.completedBy.length,
                  )}%`
                : '0%'}
            </span>
          )}
          <span className="pa0 ma0 w-100">
            <p
              className={`pa0 ma0 ttu ${
                (!poll.ended || poll.ended === false) &&
                isAfter(addHours(poll.createdAt, poll.duration), new Date())
                  ? 'dark'
                  : 'light'
              }`}
              data-test={`response${index}`}
            >
              {poll.title}
            </p>
            <p
              className={`pa0 ma0 ${
                (!poll.ended || poll.ended === false) &&
                isAfter(addHours(poll.createdAt, poll.duration), new Date())
                  ? 'dark'
                  : 'light'
              }`}
              data-test="deadline"
            >
              <FormattedMessage id="home.endsAt" />{' '}
              {formatDistance(addHours(poll.createdAt, poll.duration), new Date(), {
                addSuffix: true,
              })}
            </p>
          </span>
          <p
            className={`f3 ${
              (!poll.ended || poll.ended === false) &&
              isAfter(addHours(poll.createdAt, poll.duration), new Date())
                ? 'dark'
                : 'light'
            }`}
          >
            <Chevron size={36} className="pt2" />
          </p>
        </Link>
      </div>
    ))}
  </ul>
);

ListOfPolls.propTypes = {
  user: PropTypes.shape({
    providerData: PropTypes.array.isRequired,
  }).isRequired,
  polls: PropTypes.shape({}).isRequired,
};

export default compose(
  setDisplayName('Polls'),
  setPropTypes({
    polls: PropTypes.array,
  }),
  // onlyShowIfAuthenticated,
  onlyShowIfPollsAvailable,
  showSpinnerWhileLoading,
)(ListOfPolls);
