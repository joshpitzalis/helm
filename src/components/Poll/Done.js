import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { auth, facebookAuthProvider } from '../../constants/firebase';
import { withUserData } from '../../hocs/withUserData';
import Confetti from 'react-dom-confetti';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Done extends Component {
  state = {};
  componentDidMount() {
    this.setState({ explosion: true });
  }

  render() {
    const config = {
      angle: 70,
      spread: 87,
      startVelocity: 40,
      elementCount: 250,
      decay: 0.95,
    };
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <h1 className=" f2">Congratulations!</h1>
          <h2 className="pb4">Thank you for completing the poll.</h2>

          {this.props.user === null ? (
            <ReactCSSTransitionGroup
              transitionName="done"
              transitionAppear
              transitionAppearTimeout={4500}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="br3 pa4 bg-white">
                <p>
                  If you would like to be sent the results of the poll when it is complete please
                  sign up below.
                </p>
                <button
                  data-test="login"
                  className="tr bn underline f4 b pointer seethrough"
                  onClick={() => auth.signInWithRedirect(facebookAuthProvider)}
                >
                  Sign Up With Facebook
                </button>
              </div>
            </ReactCSSTransitionGroup>
          ) : (
            <Link to={routes.HOME}>
              <button>Back To Dashboard</button>
            </Link>
          )}
          <Confetti active={this.state.explosion} config={config} />
        </section>
      </article>
    );
  }
}

export default withUserData(Done);
