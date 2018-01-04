import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'
import { withPollData } from '../hocs/withPollData'
import { withUserData } from '../hocs/withUserData'
import { compose, branch, renderComponent } from 'recompose'

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <ListOfPolls user={user} polls={polls} />
    </section>
  </article>
)

const CreatePollButton = ({ user }) => {
  return user ? (
    <Link to={routes.CREATE}>
      <button data-test="create" autoFocus tabIndex="0">
        Create a Poll
      </button>
    </Link>
  ) : (
    <p>You are not logged in.</p>
  )
}

const ListOfPolls = ({ user, polls }) => {
  if (user) {
    return (
      <ul className="list pl0 ml0 center mw6 br2 ">
        {' '}
        {polls ? (
          polls.map((poll, index) => (
            <li key={index} data-colour="green" className="ph3 pv3 mv3 grow">
              <Link
                to={`/poll/${poll.id}`}
                data-test={`poll${index}`}
                className="link">
                {poll.title}
              </Link>

              {poll.createdBy === user.uid && (
                <Link
                  to={`/responses/${poll.id}`}
                  data-test={`response${index}`}>
                  (Responses)
                </Link>
              )}
            </li>
          ))
        ) : (
          <p>No Polls available.</p>
        )}
      </ul>
    )
  }
  return null
}

export default compose(withPollData, withUserData)(Home)
