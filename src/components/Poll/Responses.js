import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { db } from '../../constants/firebase';
import { withUserData } from '../../hocs/withUserData';
import { ErrorHandler } from '../../hocs/ErrorHandler';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import { withState } from 'recompose';
import ClickToCopyPublicPoll from '../shared/clickToCopy';
import ProgressiveImage from 'react-progressive-image';
import Logo from '../../images/peerPlusLogo.png';
import { formatDistance, addHours, isAfter } from 'date-fns';
import TimeLeft from '../shared/TimeLeft';

class Responses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      redirectTo: null
    };
  }

  componentDidMount() {
    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(
        poll =>
          poll.exists &&
          this.setState({
            poll: poll.data()
          })
      );
  }

  handleDelete = () => {
    db.doc(`polls/${this.props.match.params.pollId}`).delete();
    markOnboardingStepComplete(this.props.user.providerData[0].uid, 'delete');
    this.setState({
      redirectTo: `/home`
    });
  };

  handleEndPollEarly = () => {
    db.doc(`polls/${this.props.match.params.pollId}`).update({
      ended: true,
      endsAt: Date.now()
    });
    this.setState({
      redirectTo: `/home`
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
          <header className="pb4">
            <h2 className="f1 lh-title">{poll.title}</h2>
            <h3>{poll.context}</h3>
          </header>
          {user && user === creator && poll.privacy === 'private' ? (
            <Participants
              sentTo={poll.sendTo}
              redirect={() =>
                this.setState({
                  redirectTo: `/addTo/${this.props.match.params.pollId}`
                })
              }
            />
          ) : (
            <div style={{ opacity: '.6' }}>
              <ClickToCopyPublicPoll pollId={this.props.match.params.pollId} />
            </div>
          )}
          {isAfter(addHours(poll.createdAt, poll.duration), new Date()) && (
            <TimeLeft
              time={formatDistance(
                addHours(poll.createdAt, poll.duration),
                new Date()
              )}
            />
          )}

          <Results responses={poll && poll.responses} type={poll.type} />
          <button
            onClick={() =>
              this.setState({
                redirectTo: `/home`
              })
            }
          >
            Back
          </button>

          {user &&
            user === creator && (
              <div>
                {/* poll.completedBy && poll.completedBy.length > 2 */}
                {(!poll.ended || poll.ended === false) &&
                isAfter(addHours(poll.createdAt, poll.duration), new Date()) ? (
                  <button
                    data-test="deleteEarly"
                    onClick={this.handleEndPollEarly}
                    className="seethrough"
                  >
                    End the poll early
                  </button>
                ) : (
                  <DeleteButton handleDelete={this.handleDelete} />
                )}
              </div>
            )}
        </section>
      </article>
    );
  }
}

// import React from 'react'
const Results = ({ responses, type }) => {
  return (
    <ul className="list pl0 ml0 center mw6 br2 ">
      {responses ? (
        Object.keys(responses).map((response, index) => {
          let randomColor = {
            0: '#f7db8c',
            1: '#ffaf39',
            2: '#f37966',
            3: '#adcfe2',
            4: '#dce8bd'
          }[index < 5 ? index : Math.floor(Math.random() * 4) + 1];
          let percentage = Math.floor(
            responses[response] /
              Object.values(responses).reduce((a, b) => a + b, 0) *
              100
          );
          return (
            <div
              key={index}
              className="pa2 ma0 roundfirstAndlast"
              style={{
                background: `linear-gradient(to right, ${randomColor} 0% ,${randomColor} ${percentage}% , ${randomColor}8C ${percentage}% ,${randomColor}8C 100%
                      )`
              }}
            >
              <div className={`pa2 ma0 w-100 ${type === 'text' && 'tl h3'}`}>
                <Percentage
                  value={responses[response]}
                  index={index}
                  total={responses}
                />

                {type === 'text' ? (
                  <p className="dib">{response}</p>
                ) : (
                  <ProgressiveImage src={response} placeholder={Logo}>
                    {(src, loading) => (
                      <img
                        className="br3"
                        src={src}
                        style={{ opacity: loading ? 0.5 : 1 }}
                        alt={`option ${index + 1}`}
                      />
                    )}
                  </ProgressiveImage>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No responses yet...</p>
      )}
    </ul>
  );
};

// export default Results

const DeleteButton = withState('confirmVisible', 'setConfirmVisible', false)(
  ({ handleDelete, text, confirmVisible, setConfirmVisible }) =>
    confirmVisible ? (
      <div>
        <p>Are you Sure?</p>
        <button
          data-test="delete"
          className="seethrough pointer red"
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          className="seethrough pointer"
          onClick={() => setConfirmVisible(false)}
        >
          No
        </button>
      </div>
    ) : (
      <div>
        <button
          data-test="delete"
          className="seethrough pointer pt3 dim"
          onClick={() => setConfirmVisible(true)}
          style={{ color: 'red' }}
        >
          Delete this Poll
        </button>
      </div>
    )
);

const Percentage = ({ value, index, total }) => (
  <p className="w-25 dib tc" data-test={`count${index}`}>
    {Math.floor(value / Object.values(total).reduce((a, b) => a + b, 0) * 100)}{' '}
    %
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
