import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'
import { withPollData } from '../hocs/withPollData'
import { withUserData } from '../hocs/withUserData'
import { compose, branch, renderComponent, renderNothing } from 'recompose'

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <Polls user={user} polls={polls} />
    </section>
  </article>
)

const NotLoggedIn = () => <p>You are not logged in.</p>

const hideIfNotLoggedIn = branch(
  ({ user }) => !user,
  renderComponent(NotLoggedIn)
)

const CreatePollButton = hideIfNotLoggedIn(({ user }) => (
  <Link to={routes.CREATE}>
    <button data-test="create" className="grow" tabIndex="0">
      Create a Poll
    </button>
  </Link>
))

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

const Polls = compose(
  onlyShowIfAuthenticated,
  onlyShowIfPollsAvailable,
  showSpinnerWhileLoading
)(ListOfPolls)

export default compose(withPollData, withUserData)(Home)
