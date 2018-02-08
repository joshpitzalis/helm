import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { auth, facebookAuthProvider } from "../../constants/firebase";
import { withUserData } from "../../hocs/withUserData";

class Done extends Component {
  render() {
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <h1>Congratulations!</h1>
          <h2 className="pb4">Thank you for completing the poll.</h2>

          {this.props.user === null ? (
            <div>
              <p>
                If you would like to be sent the results of the poll when it is
                complete please sign up below.
              </p>
              <button
                data-test="login"
                className="tr bn underline f4 b pointer seethrough"
                onClick={() => auth.signInWithRedirect(facebookAuthProvider)}
              >
                Sign Up With Facebook
              </button>
            </div>
          ) : (
            <Link to={routes.HOME}>
              <button>Back To Dashboard</button>
            </Link>
          )}
        </section>
      </article>
    );
  }
}

export default withUserData(Done);
