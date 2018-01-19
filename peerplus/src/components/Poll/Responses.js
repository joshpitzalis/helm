import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { db } from '../../constants/firebase';

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
    this.setState({
      redirectTo: `/home`,
    });
  };

  render() {
    const { poll, redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <header>
            <h1>{poll.title}</h1>
            <h2>{poll.context}</h2>
          </header>
          <Participants sentTo={poll.sendTo} />
          <ul className="list pl0 ml0 center mw6 br2 ">
            {poll.responses ? (
              Object.keys(poll.responses).map((response, index) => (
                <li key={index} data-colour="green" className="ph3 pv3 mv3 grow flex row">
                  <Percentage
                    value={poll.responses[response]}
                    index={index}
                    total={Object.keys(poll.responses).length}
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
          <button data-test="delete" onClick={this.handleDelete}>
            Delete This Poll
          </button>
        </section>
      </article>
    );
  }
}

const Percentage = ({ value, index, total }) => (
  <p className="w-25" data-test={`count${index}`}>
    {Math.round(value / total * 100)} %
  </p>
);

const Participants = ({ sentTo }) => (
  <div>
    {sentTo &&
      sentTo.map(participant => (
        <div className="pa4 tc">
          <img src={participant.photo} className="br-100 h3 w3 dib" alt="avatar" />
        </div>
      ))}
  </div>
);

export default Responses;
