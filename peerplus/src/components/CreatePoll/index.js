import React, { Component } from 'react';
import Create from './Create';
import Questions from './Questions';
import Congratulations from './Congratulations';
import {
  auth,
  facebookAuthProvider,
  db,
  storage
} from '../../constants/firebase';
import { log } from 'core-js/library/web/timers';

export default class Polls extends Component {
  state = {
    step: 1,
    user: null,
    friends: [],
    title: '',
    context: '',
    choice: null,
    type: null,
    duration: null,
    private: null,
    redirectTo: null,
    questions: [''],
    pollId: null,
    disabled: true
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }));
  }

  handleChange = el => e => {
    this.setState({ [el]: e.target.value });
  };

  handleInput = i => e => {
    if (this.state.type === 'text') {
      let questions = [...this.state.questions];
      questions[i] = e.target.value;
      this.setState({
        questions
      });
    } else {
      let questions = [...this.state.questions];
      const file = e[0];
      const uploadTask = storage
        .ref(`polls/${this.state.pollId}`)
        .child(file.name)
        .put(file, { contentType: file.type });

      uploadTask
        .then(res => {
          (questions[i] = res.downloadURL),
            this.setState({
              questions
            });
        })
        .catch(error => console.error(error));
    }
  };

  handleDelete = i => e => {
    e.preventDefault();
    let questions = [
      ...this.state.questions.slice(0, i),
      ...this.state.questions.slice(i + 1)
    ];
    this.setState({
      questions
    });
  };

  addQuestion = e => {
    e.preventDefault();
    let questions = this.state.questions.concat(['']);
    this.setState({
      questions
    });
  };

  goToNext = e => {
    e.preventDefault();
    if (this.state.step !== 3) {
      this.setState({ step: this.state.step + 1 });
    }
  };

  goToPrev = e => {
    e.preventDefault();
    if (this.state.step !== 1) {
      this.setState({ step: this.state.step - 1 });
    }
  };

  handleCreateForm = async e => {
    e.preventDefault();
    const newPoll = await db.collection('polls').doc();
    this.setState({
      pollId: newPoll.id,
      step: this.state.step + 1
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    // await
    db.doc(`polls/${this.state.pollId}`).set({
      id: this.state.pollId,
      title: this.state.title,
      context: this.state.context,
      choice: this.state.choice,
      type: this.state.type,
      // duration: this.duration.value,
      // private: this.private.checked,
      questions: this.state.questions,
      createdBy: this.state.user.uid,
      createdAt: new Date()
    });
    this.setState({ step: this.state.step + 1 });
  };

  handleProceed = x => {
    console.log(x);
    // this.setState({ disabled: true })
  };

  render() {
    return (
      <div>
        <article>
          <form>
            <section className="w-75-ns center">
              {this.state.step === 1 && (
                <Create
                  handleChange={this.handleChange}
                  title={this.state.title}
                  context={this.state.context}
                  choice={this.state.choice}
                  type={this.state.type}
                  handleProceed={this.handleProceed}
                />
              )}
              {this.state.step === 2 && (
                <Questions
                  questions={this.state.questions}
                  type={this.state.type}
                  pollId={this.state.pollId}
                  handleInput={this.handleInput}
                  handleDelete={this.handleDelete}
                  addQuestion={this.addQuestion}
                />
              )}
              {this.state.step === 3 && (
                <Congratulations pollId={this.state.pollId} />
              )}
              <div className="tc tr-ns w-100">
                {this.state.step === 2 && (
                  <button
                    onClick={this.goToPrev}
                    type="submit"
                    data-colour="green">
                    Back
                  </button>
                )}

                {this.state.step === 2 ? (
                  <button
                    onClick={this.handleSubmitForm}
                    type="submit"
                    data-colour="green"
                    data-test="submitPoll">
                    Submit
                  </button>
                ) : this.state.step === 3 ? null : (
                  <button
                    onClick={
                      this.state.pollId ? this.goToNext : this.handleCreateForm
                    }
                    type="submit"
                    data-colour="green"
                    data-test="submit">
                    Next
                  </button>
                )}
              </div>
              <progress
                className="w-100"
                value={
                  this.state.step === 1
                    ? '33'
                    : this.state.step === 2 ? '66' : '100'
                }
                max="100"
              />
            </section>
            {/* <button type="submit">Cancel</button> */}
          </form>
        </article>
      </div>
    );
  }
}
