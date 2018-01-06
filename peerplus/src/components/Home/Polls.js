import React from 'react'
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes
} from 'recompose'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NoPollsAvailable = () => <p>No Polls available.</p>
const Loading = () => <div className="loader center ma4" />

const onlyShowIfPollsAvailable = branch(
  ({ polls }) => polls && polls.length === 0,
  renderComponent(NoPollsAvailable)
)

const showSpinnerWhileLoading = branch(
  ({ polls }) => !polls,
  renderComponent(Loading)
)

const onlyShowIfAuthenticated = branch(({ user }) => !user, renderNothing)

const ListOfPolls = ({ user, polls }) => (
  <ul className="list pl0 ml0 center mw6 br2 ">
    {polls.map((poll, index) => (
      <li key={index} data-colour="green" className="ph3 pv3 mv3 grow">
        <Link
          to={`/poll/${poll.id}`}
          data-test={`poll${index}`}
          className="link">
          {poll.title}
        </Link>

        {poll.createdBy === user.uid && (
          <Link to={`/responses/${poll.id}`} data-test={`response${index}`}>
            (Responses)
          </Link>
        )}
      </li>
    ))}
  </ul>
)

export default compose(
  setDisplayName('Polls'),
  setPropTypes({
    user: PropTypes.object,
    polls: PropTypes.array
  }),
  onlyShowIfAuthenticated,
  onlyShowIfPollsAvailable,
  showSpinnerWhileLoading
)(ListOfPolls)
