import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { db } from '../../constants/firebase';
import { withUserData } from '../../hocs/withUserData';
import { ErrorHandler } from '../../hocs/ErrorHandler';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import { withState, withHandlers } from 'recompose';

class Responses extends Component {
  state = {
    poll: {},
    redirectTo: null,
  };

  componentDidMount() {
    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(
        poll =>
          poll.exists &&
          this.setState({
            poll: poll.data(),
          }),
      );
  }

  handleDelete = () => {
    db.doc(`polls/${this.props.match.params.pollId}`).delete();
    markOnboardingStepComplete(this.props.user.providerData[0].uid, 'delete');
    this.setState({
      redirectTo: `/home`,
    });
  };

  handleEndPollEarly = () => {
    db.doc(`polls/${this.props.match.params.pollId}`).update({
      ended: true,
      endsAt: Date.now(),
    });
    this.setState({
      redirectTo: `/home`,
    });
  };

  render() {
    const { poll, redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    const user = this.props.user.providerData[0].uid || null;
    const creator = poll.createdBy;

    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <header>
            <h2 className="f1 lh-title">{poll.title}</h2>
            <h3>{poll.context}</h3>
          </header>
          {user && user === creator && <Participants sentTo={poll.sendTo} />}
          <ul className="list pl0 ml0 center mw6 br2 ">
            {poll.responses ? (
              Object.keys(poll.responses).map((response, index) => (
                <li key={index} data-colour="green" className="ph3 pv3 mv3 grow flex row">
                  <Percentage
                    value={poll.responses[response]}
                    index={index}
                    total={poll.responses}
                  />
                  {poll.type === 'text' ? (
                    <p>
                      <strong>{response}</strong>
                    </p>
                  ) : (
                    <img src={response} alt="" />
                  )}
                </li>
              ))
            ) : (
              <p>No responses yet</p>
            )}
          </ul>
          {user &&
            user === creator &&
            poll.completedBy &&
            poll.completedBy.length > 2 && (
              <button data-test="delete" onClick={this.handleEndPollEarly} className="seethrough">
                End the poll early
              </button>
            )}
          <button
            onClick={() =>
              this.setState({
                redirectTo: `/home`,
              })
            }
          >
            Back
          </button>
          {user &&
            user === creator && (
              <DeleteButton handleDelete={this.handleDelete} text={'Delete this Poll'} />
            )}
        </section>
      </article>
    );
  }
}

const DeleteButton = withState('confirmVisible', 'setConfirmVisible', false)(
  ({ handleDelete, text, confirmVisible, setConfirmVisible }) => (
    <button
      data-test="delete"
      className="seethrough pointer"
      onClick={confirmVisible ? handleDelete : () => setConfirmVisible(true)}
    >
      {confirmVisible ? 'Are you sure ?' : text}
    </button>
  ),
);

const Percentage = ({ value, index, total }) => (
  <p className="w-25" data-test={`count${index}`}>
    {Math.floor(value / Object.values(total).reduce((a, b) => a + b, 0) * 100)} %
  </p>
);

const Participants = ({ sentTo }) => (
  <div>
    {sentTo &&
      sentTo.map((participant, index) => (
        <div className="pa4 tc" key={index}>
          <img src={participant.photo} className="br-100 h3 w3 dib" alt="avatar" />
        </div>
      ))}
  </div>
);

export default ErrorHandler(withUserData(Responses));
