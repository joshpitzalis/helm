import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose, setDisplayName, setPropTypes } from "recompose";
import AuthButtons from "./AuthButtons";

const PollBox = ({ polls, close, user }) => (
  <section className="center w-100 db">
    <div className="pa3 pa5-ns ">
      <p className="f4 bold center mw6 grid row jcb">
        {polls && polls.length} Polls to complete
        <Link className=" " to={`/account/${user.uid}`} onClick={close}>
          My Account
        </Link>
      </p>
      <ul className="list pl0 ml0 center mw6 ba b--light-silver br2">
        {polls &&
          polls.map((poll, index) => (
            <li
              className="ph3 pv3 bb b--light-silver"
              data-test={`poll${index}`}
              key={index}
            >
              <Link to={`/poll/${poll.id}`} onClick={close}>
                {poll.title}
              </Link>
            </li>
          ))}
      </ul>
      <div className="f4 center mw6">
        <AuthButtons user={user} />
      </div>
    </div>
  </section>
);

export default compose(
  setPropTypes({ polls: PropTypes.array }),
  setDisplayName("PollBox")
)(PollBox);
