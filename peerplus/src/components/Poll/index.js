import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { auth, facebookAuthProvider, db } from '../../constants/firebase'
import * as routes from '../../constants/routes'

class Poll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {},
      responses: {},
      redirectTo: null
    }
  }

  componentDidMount() {
    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(
        poll =>
          poll.exists &&
          this.setState({
            poll: poll.data()
          })
      )
  }

  handleChange = (e, question) => {
    const count = e.target.checked ? 1 : 0
    const responses = this.state.responses
    responses[question] = count
    this.setState({
      responses
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const existing = this.state.poll.responses || {}
    const responses = this.state.responses

    for (const response in responses) {
      if (existing.hasOwnProperty(response)) {
        existing[response] = existing[response] + responses[response]
      } else {
        existing[response] = responses[response]
      }
    }

    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .update({ responses: existing })

    this.setState({
      redirectTo: `/done/${this.props.match.params.pollId}`
    })
  }

  render() {
    const { poll, redirectTo } = this.state
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <header>
          <h1>{poll.title}</h1>
          <h2>{poll.context}</h2>
        </header>
        <form>
          {poll.questions &&
            poll.questions.map((question, index) => (
              <label key={index}>
                <input
                  data-test={`response${index}`}
                  type={poll.choice === 'multi' ? 'checkbox' : 'radio'}
                  name="responses"
                  value={question}
                  onChange={e => this.handleChange(e, question)}
                />
                {poll.type === 'text' ? question : <img src={question} />}
              </label>
            ))}
          <input
            data-test="submit"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

export default Poll
