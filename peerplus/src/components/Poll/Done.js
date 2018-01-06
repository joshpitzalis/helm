import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'

class Done extends Component {
  render () {
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <h1>{`Done!  Poll  ${this.props.match.params.pollId}`}</h1>
          <Link to={routes.HOME}>
            <button>Back To Dashboard</button>
          </Link>
        </section>
      </article>
    )
  }
}

export default Done
