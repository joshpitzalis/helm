import React, { Component } from 'react';
import Create from './Create';
import Questions from './Questions';
import Friends from './Friends';
import Congratulations from './Congratulations';
import {
  auth,
  facebookAuthProvider,
  db,
  storage
} from '../../constants/firebase';
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes
} from 'recompose';
import { withUserData } from '../../hocs/withUserData';
import PropTypes from 'prop-types';

class Polls extends Component {
  state = {
    step: 1,
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
    disabled: true,
    privacy: null
  };

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
        .child('file.name')
        .put(file);

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
    if (this.state.step !== 4) {
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
      privacy: this.state.privacy,
      questions: this.state.questions,
      createdBy: this.props.user.uid,
      createdAt: new Date()
    });
    this.setState({ step: 4 });
  };

  render() {
    return (
      <article className="pv5">
        <form className="mw6-ns w-100 center tc">
          {
            {
              1: (
                <Create
                  handleChange={this.handleChange}
                  title={this.state.title}
                  context={this.state.context}
                  choice={this.state.choice}
                  type={this.state.type}
                  privacy={this.state.privacy}
                  goToNext={this.handleCreateForm}
                />
              ),
              2: (
                <Questions
                  questions={this.state.questions}
                  type={this.state.type}
                  pollId={this.state.pollId}
                  handleInput={this.handleInput}
                  handleDelete={this.handleDelete}
                  addQuestion={this.addQuestion}
                  goToPrev={this.goToPrev}
                  goToNext={this.goToNext}
                  handleSubmit={this.handleSubmitForm}
                  privacy={this.state.privacy}
                />
              ),
              3: (
                <Friends
                  pollId={this.state.pollId}
                  goToPrev={this.goToPrev}
                  goToNext={this.handleSubmitForm}
                />
              ),
              4: <Congratulations pollId={this.state.pollId} />
            }[this.state.step]
          }
          <Progress step={this.state.step} />
        </form>
      </article>
    );
  }
}

const Progress = ({ step }) => (
  <progress
    className="w-100"
    value={step === 1 ? '33' : step === 2 ? '66' : '100'}
    max="100"
  />
);

export default compose(
  setDisplayName('CreatePollForm'),
  setPropTypes({ user: PropTypes.object }),
  withUserData
)(Polls);
