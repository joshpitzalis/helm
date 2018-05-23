import React, { Component } from 'react';
import Create from './Create';
import Questions from './Questions.jsx';
import Friends from './Friends';
import Congratulations from './Congratulations';
import { db } from '../../constants/firebase';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { withUserData } from '../../hocs/withUserData';
import PropTypes from 'prop-types';
import { uploadImage } from './helpers.js';
import { auth, facebookAuthProvider } from '../../constants/firebase';

class Polls extends Component {
  state = {
    step: 1,
    title: '',
    context: '',
    choice: null,
    type: null,
    private: null,
    redirectTo: null,
    questions: [''],
    pollId: null,
    disabled: true,
    privacy: null,
    sendTo: [],
    participants: {},
    duration: 36,
    uploadInProcess: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match.params.pollId) {
      db
        .doc(`preparedPolls/${this.props.match.params.pollId}`)
        .get()
        .then(
          poll =>
            poll.exists &&
            this.setState({
              title: poll.data().title,
            }),
        );
    }
  }

  handleChange = el => e => {
    this.setState({ [el]: e.target.value });
  };

  handleInput = i => async e => {
    if (this.state.type === 'text') {
      let questions = [...this.state.questions];
      questions[i] = e.target.value;
      this.setState({
        questions,
      });
    } else {
      this.setState({ uploadInProcess: true });
      let questions = [...this.state.questions];
      const file = e[0];
      questions[i] = await uploadImage(file, this.state.pollId, this.handleTransfer);
      this.setState({
        questions,
        uploadInProcess: false,
      });
    }
  };

  handleDelete = i => e => {
    e.preventDefault();
    let questions = [...this.state.questions.slice(0, i), ...this.state.questions.slice(i + 1)];
    this.setState({
      questions,
    });
  };

  addQuestion = e => {
    e.preventDefault();
    let questions = this.state.questions.concat(['']);
    this.setState({
      questions,
    });
  };

  goToNext = () => {
    if (this.state.step !== 4) {
      this.setState({ step: this.state.step + 1 });
    }
  };

  goToPrev = () => {
    if (this.state.step !== 1) {
      this.setState({ step: this.state.step - 1 });
    }
  };

  handleCreateForm = async e => {
    if (!this.props.user) {
      auth.signInWithPopup(facebookAuthProvider);
      return;
    }
    const newPoll = await db.collection('polls').doc();
    this.setState({
      pollId: newPoll.id,
      step: this.state.step + 1,
    });
  };

  handleTransfer = (property, value) => {
    this.setState({
      [property]: value,
    });
  };

  handleSubmitForm = async e => {
    e && e.preventDefault();

    await db.doc(`polls/${this.state.pollId}`).set({
      id: this.state.pollId,
      title: this.state.title,
      context: this.state.context,
      choice: this.state.choice,
      type: this.state.type,
      duration: this.state.duration,
      privacy: this.state.privacy,
      questions: this.state.questions,
      createdBy: this.props.user.providerData[0].uid,
      createdAt: new Date(),
      sendTo: this.state.sendTo,
      participants: this.state.participants,
    });
    this.setState({ step: 4 });
  };

  handleAddFriend = (id, name, photo) => {
    let sendTo = this.state.sendTo.concat([{ name, photo, id }]);
    let newParticipant = { [id]: true };
    let participants = { ...this.state.participants, ...newParticipant };
    this.setState({ sendTo, participants });
  };

  handleRemoveFriend = id => {
    let sendTo = this.state.sendTo.filter(friend => friend.id !== id);
    let participants = { ...this.state.participants };
    delete participants[id];
    this.setState({ sendTo, participants });
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
                  duration={this.state.duration}
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
                  uploadInProcess={this.state.uploadInProcess}
                  transferTotal={this.state.transferTotal}
                  transferCurrent={this.state.transferCurrent}
                />
              ),
              3: (
                <Friends
                  pollId={this.state.pollId}
                  goToPrev={this.goToPrev}
                  handleSubmit={this.handleSubmitForm}
                  sendTo={this.state.sendTo}
                  handleRemoveFriend={this.handleRemoveFriend}
                  handleAddFriend={this.handleAddFriend}
                />
              ),
              4: (
                <Congratulations
                  pollId={this.state.pollId}
                  privacy={this.state.privacy}
                  type={this.state.type}
                  userId={this.props.user ? this.props.user.providerData[0].uid : null}
                  title={this.state.title}
                />
              ),
            }[this.state.step]
          }
          <Progress step={this.state.step} />
        </form>
      </article>
    );
  }
}

const Progress = ({ step }) => (
  <progress className="w-100" value={step === 1 ? '33' : step === 2 ? '66' : '100'} max="100" />
);

export default compose(
  setDisplayName('CreatePollForm'),
  setPropTypes({ user: PropTypes.object }),
  withUserData,
)(Polls);