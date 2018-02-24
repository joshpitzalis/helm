import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import { markNotificationAsSeen, markResultsAsSeen } from './helpers';

const PollBox = ({ polls, close, user }) => (
  <section className="center w-100 db" onMouseLeave={close}>
    <div className="pa3 pa5-ns ">
      {/* <p className="f4 bold center mw6 grid row jce">
        <Link className="link no-underline" to={`/account/${user.uid}`} onClick={close}>
          My Account
        </Link>
      </p> */}
      <ul className="list pl0 ml0 center mw6 ba b--light-silver br2">
        {polls &&
          polls.map((poll, index) => (
            <li
              className="ph3 pv3 bb b--light-silver"
              data-test={`poll${index}`}
              key={poll.id}
              onClick={() =>
                (poll.ended
                  ? markResultsAsSeen(poll.id, user.providerData[0].uid)
                  : markNotificationAsSeen(poll.id, user.providerData[0].uid))
              }
            >
              {poll.ended ? (
                <Link to={`/responses/${poll.id}`} onClick={close}>
                  Results for {poll.title}
                </Link>
              ) : (
                <Link to={`/poll/${poll.id}`} onClick={close}>
                  {poll.title}
                </Link>
              )}
            </li>
          ))}
      </ul>
      <div className="f5 center mw6 pt4 tr">
        <AuthButtons user={user} />
      </div>
    </div>
  </section>
);

PollBox.propTypes = {
  polls: PropTypes.array,
  close: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default PollBox;
