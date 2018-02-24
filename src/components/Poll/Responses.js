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
          {user &&
            user === creator && (
              <Participants
                sentTo={poll.sendTo}
                redirect={() =>
                  this.setState({ redirectTo: `/addTo/${this.props.match.params.pollId}` })
                }
              />
            )}
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
              <button
                data-test="deleteEarly"
                onClick={this.handleEndPollEarly}
                className="seethrough"
              >
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
          {user && user === creator && <DeleteButton handleDelete={this.handleDelete} />}
        </section>
      </article>
    );
  }
}

const DeleteButton = withState('confirmVisible', 'setConfirmVisible', false)(
  ({ handleDelete, text, confirmVisible, setConfirmVisible }) =>
    confirmVisible ? (
      <div>
        <p>Are you Sure?</p>
        <button data-test="delete" className="seethrough pointer" onClick={handleDelete}>
          Yes
        </button>
        <button className="seethrough pointer" onClick={() => setConfirmVisible(false)}>
          No
        </button>
      </div>
    ) : (
      <div>
        <button
          data-test="delete"
          className="seethrough pointer"
          onClick={() => setConfirmVisible(true)}
        >
          Delete this Poll
        </button>
      </div>
    ),
);

const Percentage = ({ value, index, total }) => (
  <p className="w-25" data-test={`count${index}`}>
    {Math.floor(value / Object.values(total).reduce((a, b) => a + b, 0) * 100)} %
  </p>
);

const Participants = ({ sentTo, redirect }) => (
  <div className="pa4 tc grid row aic jcc gap1">
    <button className="h3 grow dib ma0" onClick={redirect}>
      +
    </button>
    {sentTo &&
      sentTo.map((participant, index) => (
        <img
          key={index}
          src={participant.photo || participant.picture.data.url}
          className="br-100 h3 w3 dib ma0"
          alt="avatar"
        />
      ))}
  </div>
);

export default ErrorHandler(withUserData(Responses));
