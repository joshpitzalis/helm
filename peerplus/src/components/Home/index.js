import React, { Component } from 'react'
import { withPollData } from '../../hocs/withPollData'
import { withUserData } from '../../hocs/withUserData'
import { compose } from 'recompose'
import CreatePollButton from './CreatePollButton'
import Polls from './Polls'

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <Polls user={user} polls={polls} />
    </section>
  </article>
)

export default compose(withPollData, withUserData)(Home)
