import React, { Component, Fragment } from 'react'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class Questions extends Component {
  state = {
    redirectTo: null
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ redirectTo: '/send' })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <Fragment>
        <h1>Questions</h1>
        <div className="dib">
          <TextSingle />
          <TextMultiple />
        </div>
        <div className="dib pl5">
          <ImageSingle />
          <ImageMultiple />
        </div>
        <br />
        <br />
        <div>
          <button onClick={this.handleSubmit}>Create Questions</button>
        </div>
      </Fragment>
    )
  }
}

class TextSingle extends Component {
  state = {
    questions: ['hello']
  }

  handleText = i => e => {
    let questions = [...this.state.questions]
    questions[i] = e.target.value
    this.setState({
      questions
    })
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

  render() {
    return (
      <Fragment>
        {this.state.questions.map((question, index) => (
          <span key={index}>
            <input
              type="text"
              placeholder="text single choice"
              onChange={this.handleText(index)}
              value={question}
            />
            <button onClick={this.handleDelete(index)}>X</button>
          </span>
        ))}
        <button onClick={this.addQuestion}>Add New Question</button>
      </Fragment>
    )
  }
}

class TextMultiple extends Component {
  static propTypes = {}

  state = {}

  render() {
    return (
      <Fragment>
        <div>
          <input
            type="text"
            placeholder="name"
            ref={input => {
              this.title = input
            }}
          />
          <button onClick={this.props.addOption}>Add New Question</button>
        </div>
      </Fragment>
    )
  }
}

class ImageSingle extends Component {
  static propTypes = {}

  state = {}

  render() {
    return (
      <Fragment>
        <div>
          <input
            type="file"
            placeholder="name"
            ref={input => {
              this.title = input
            }}
          />
          <button onClick={this.props.addOption}>Add New Question</button>
        </div>
      </Fragment>
    )
  }
}

class ImageMultiple extends Component {
  static propTypes = {}

  state = {}

  render() {
    return (
      <Fragment>
        <div>
          <input
            type="file"
            placeholder="name"
            ref={input => {
              this.title = input
            }}
          />
          <button onClick={this.props.addOption}>Add New Question</button>
        </div>
      </Fragment>
    )
  }
}

export default Questions
