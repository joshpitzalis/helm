import React, { Component, Fragment } from 'react'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import axios from 'axios'
import PropTypes from 'prop-types'

class Questions extends Component {
  state = {
    numberOfOptions: 1
  }

  addOption = e => {
    e.preventDefault()
    this.setState({ numberOfOptions: this.state.numberOfOptions + 1 })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  render() {
    return (
      <Fragment>
        <h1>Questions</h1>
        <form>
          <div className="dib">
            <TextSingle
              addOption={this.addOption}
              numberOfOptions={this.state.numberOfOptions}
            />
            <TextMultiple addOption={this.addOption} />
          </div>
          <div className="dib pl5">
            <ImageSingle addOption={this.addOption} />
            <ImageMultiple addOption={this.addOption} />
          </div>
          <br />
          <br />
          <div>
            <input
              type="submit"
              defaultChecked
              value="Create Questions"
              disabled
            />
          </div>
        </form>
      </Fragment>
    )
  }
}

class TextSingle extends Component {
  static propTypes = { addOption: PropTypes.func.isRequired }
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
          <span>
            <input
              type="text"
              key={index}
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
