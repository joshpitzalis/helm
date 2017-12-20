import React, { Component, Fragment } from 'react'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import axios from 'axios'
import PropTypes from 'prop-types'

class Questions extends Component {
  state = {
    user: null,
    friends: [],
    title: null,
    context: null,
    multipleChoice: null,
    text: null,
    duration: null,
    private: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  handleSubmit = e => {
    e.preventDefault()
    db.collection('polls').add({
      title: this.title.value,
      context: this.context.value,
      multipleChoice: this.multipleChoice.checked,
      text: this.text.checked,
      duration: this.duration.value,
      private: this.private.checked,
      createdBy: this.state.user.uid,
      createdAt: new Date()
    })
  }

  render() {
    return (
      <Fragment>
        <h1>Questions</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <TextSingle />
          <TextMultiple />
          <ImageSingle />
          <ImageMultiple />
          <div>
            <input type="submit" defaultChecked value="Create Questions" />
          </div>
        </form>
      </Fragment>
    )
  }
}

class TextSingle extends Component {
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
          <button>Add New Question</button>
        </div>
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
          <button>Add New Question</button>
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
            type="text"
            placeholder="name"
            ref={input => {
              this.title = input
            }}
          />
          <button>Add New Question</button>
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
            type="text"
            placeholder="name"
            ref={input => {
              this.title = input
            }}
          />
          <button>Add New Question</button>
        </div>
      </Fragment>
    )
  }
}

export default Questions
