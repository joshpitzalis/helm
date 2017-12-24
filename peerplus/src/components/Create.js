import React, { Component, Fragment } from 'react'
import { auth, facebookAuthProvider, db } from '../constants/firebase'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Create extends Component {
  state = {
    user: null,
    friends: [],
    title: null,
    context: null,
    multipleChoice: null,
    text: null,
    duration: null,
    private: null,
    redirectTo: null
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
    this.setState({ redirectTo: '/questions' })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <Fragment>
        <h1>Create a poll</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <input
              type="text"
              placeholder="name"
              ref={input => {
                this.title = input
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="context"
              ref={input => {
                this.context = input
              }}
            />
          </div>
          <hr />
          <div>
            <div>
              <input
                type="radio"
                name="choice"
                value="single"
                ref={input => {
                  this.multipleChoice = input
                }}
              />Single Choice
            </div>
            <div>
              <input
                type="radio"
                name="choice"
                value="multiple"
                ref={input => {
                  this.multipleChoice = input
                }}
              />Multiple Choice
            </div>
          </div>
          <hr />
          <div>
            <div>
              <input
                type="radio"
                name="type"
                value="text"
                ref={input => {
                  this.text = input
                }}
              />Text
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="image"
                ref={input => {
                  this.text = input
                }}
              />Image
            </div>
          </div>
          <hr />
          <div>
            <input
              type="range"
              min="24"
              max="72"
              ref={input => {
                this.duration = input
              }}
            />Duration
          </div>
          <hr />
          <div>
            <input
              type="checkbox"
              defaultChecked
              ref={input => {
                this.private = input
              }}
            />Keep Private
          </div>
          <br />
          <input type="submit" defaultChecked value="Create Poll" />
        </form>
      </Fragment>
    )
  }
}

export default Create
