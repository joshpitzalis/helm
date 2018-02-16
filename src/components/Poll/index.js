import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { db } from '../../constants/firebase';
import { withUserData } from '../../hocs/withUserData';
import { ErrorHandler } from '../../hocs/ErrorHandler';
import ProgressiveImage from 'react-progressive-image';
import Logo from '../../images/peerPlusLogo.png';
import { Loading } from '../Loading';
import { markOnboardingStepComplete } from '../Onboarding/helpers';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: null,
      responses: {},
      redirectTo: null,
      submitting: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    db
      .doc(`polls/${this.props.match.params.pollId}`)
      .get()
      .then(poll =>
        poll.exists &&
          this.setState({
            poll: poll.data(),
          }));

    this.props.user && markOnboardingStepComplete(this.props.user.providerData[0].uid, 'recieved');
  }

  handleChange(e, question) {
    const count = e.target.checked ? 1 : 0;
    const responses = this.state.responses;
    responses[question] = count;
    console.log('question', question);

    this.setState({
      responses,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const existing = this.state.poll.responses || {};
    const responses = this.state.responses;

    for (const response in responses) {
      if (existing.hasOwnProperty(response)) {
        existing[response] = existing[response] + responses[response];
      } else {
        existing[response] = responses[response];
      }
    }
    const completedBy = this.state.poll.completedBy || [];
    const me = this.props.user ? this.props.user.providerData[0].uid : '';
    const newCompletedBy = [...completedBy, me];
    this.setState({ submitting: true });
    await db
      .doc(`polls/${this.props.match.params.pollId}`)
      .update({ responses: existing, completedBy: newCompletedBy });

    this.setState({
      redirectTo: `/done/${this.props.match.params.pollId}`,
    });
  }

  render() {
    const { poll, redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    if (
      (poll && poll.privacy == 'public') ||
      (poll &&
        poll.participants &&
        this.props.user &&
        Object.keys(poll.participants).includes(this.props.user.providerData[0].uid))
    ) {
      console.log("We've been expecting you.");
    } else if (poll && this.props.user && poll.privacy == 'private') {
      this.setState({
        redirectTo: '/error',
      });
    } else {
      return (
        <article className="pv5">
          <section className="mw6-ns w-100 center tc">
            <Loading />
          </section>
        </article>
      );
    }

    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <header>
            <h2 className="f1 lh-title">{poll && poll.title}</h2>
            <h3>{poll && poll.context}</h3>
          </header>
          <form>
            {poll &&
              poll.questions &&
              poll.questions.map((question, index) => (
                <label key={index} className="container tl">
                  <input
                    data-test={`response${index}`}
                    type={poll.choice === 'multi' ? 'checkbox' : 'radio'}
                    name="responses"
                    value={question}
                    onChange={e => this.handleChange(e, question)}
                  />
                  {poll.type === 'text' ? (
                    question
                  ) : (
                    <ProgressiveImage src={question} placeholder={Logo}>
                      {(src, loading) => (
                        <img
                          src={src}
                          style={{ opacity: loading ? 0.5 : 1 }}
                          alt={`option ${index + 1}`}
                        />
                      )}
                    </ProgressiveImage>
                  )}
                  <span className={poll.choice === 'multi' ? 'checkmark' : 'radiomark'} />
                </label>
              ))}
            <p data-error>{this.state.errors}</p>
            <input
              data-test="submit"
              type="submit"
              value={this.state.submitting ? 'Submitting...' : 'Submit'}
              onClick={
                Object.keys(this.state.responses).length === 0
                  ? (e) => {
                      e.preventDefault();
                      this.setState({ errors: 'You must select atleast one option to proceed.' });
                    }
                  : this.handleSubmit
              }
            />
          </form>
        </section>
      </article>
    );
  }
}

export default ErrorHandler(withUserData(Poll));
