import React, { Component, Fragment } from 'react'
import { auth, facebookAuthProvider, db, storage } from '../constants/firebase'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class Questions extends Component {
  state = {
    user: null,
    redirectTo: null,

    multipleChoice: null,
    text: null,
    questions: []
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))

    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(
        poll =>
          poll.exists &&
          this.setState({
            text: poll.data().text
          })
      )
  }

  handleInput = i => e => {
    if (this.state.text) {
      let questions = [...this.state.questions]
      questions[i] = e.target.value
      this.setState({
        questions
      })
    } else {
      let questions = [...this.state.questions]
      storage
        .ref(`polls/${this.props.match.params.pollId}`)
        .put(e.target.files[0])
        .then(res => {
          ;(questions[i] = res.downloadURL),
            this.setState({
              questions
            })
        })
    }
  }

  handleDelete = i => e => {
    e.preventDefault()
    let questions = [
      ...this.state.questions.slice(0, i),
      ...this.state.questions.slice(i + 1)
    ]
    this.setState({
      questions
    })
  }

  addQuestion = e => {
    e.preventDefault()
    let questions = this.state.questions.concat([''])
    this.setState({
      questions
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .update({ questions: this.state.questions })
    this.setState({ redirectTo: `/send/${this.props.match.params.pollId}` })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }

    return (
      <Fragment>
        <h1>Questions</h1>
        {this.state.questions.map((question, index) => (
          <span key={index}>
            <input
              type={this.state.text ? 'text' : 'file'}
              placeholder="text single choice"
              onChange={this.handleInput(index)}
              value={this.state.text ? question : undefined}
            />
            <button onClick={this.handleDelete(index)}>X</button>
          </span>
        ))}
        <button onClick={this.addQuestion}>Add New Question</button>
        <div className="pt3">
          <button onClick={this.handleSubmit}>Create Questions</button>
        </div>
      </Fragment>
    )
  }
}

export default Questions
