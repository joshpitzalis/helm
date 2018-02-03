import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { db } from "../../constants/firebase";
import { withUserData } from "../../hocs/withUserData";
import { ErrorHandler } from "../../hocs/ErrorHandler";
import ProgressiveImage from "react-progressive-image";
import Logo from "../../images/peerPlusLogo.png";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      responses: {},
      redirectTo: null,
      submitting: false
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

  handleChange = (e, question) => {
    const count = e.target.checked ? 1 : 0;
    const responses = this.state.responses;
    responses[question] = count;
    console.log("question", question);

    this.setState({
      responses
    });
  };

  handleSubmit = async e => {
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
    const newCompletedBy = [
      ...completedBy,
      this.props.user.providerData[0].uid
    ];
    this.setState({ submitting: true });
    await db
      .doc(`polls/${this.props.match.params.pollId}`)
      .update({ responses: existing, completedBy: newCompletedBy });

    this.setState({
      redirectTo: `/done/${this.props.match.params.pollId}`
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
          <form>
            {poll.questions &&
              poll.questions.map((question, index) => (
                <label key={index} className="container">
                  <input
                    data-test={`response${index}`}
                    type={poll.choice === "multi" ? "checkbox" : "radio"}
                    name="responses"
                    value={question}
                    onChange={e => this.handleChange(e, question)}
                  />
                  {poll.type === "text" ? (
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
                  <span
                    className={
                      poll.choice === "multi" ? "checkmark" : "radiomark"
                    }
                  />
                </label>
              ))}
            <input
              data-test="submit"
              type="submit"
              value={this.state.submitting ? "Submitting..." : "Submit"}
              onClick={this.handleSubmit}
            />
          </form>
        </section>
      </article>
    );
  }
}

export default ErrorHandler(withUserData(Poll));
