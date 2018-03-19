import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import { markNotificationAsSeen, markResultsAsSeen } from './helpers';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PollBox = ({ polls, close, user, handleShowDeleteModal }) => (
  <ReactCSSTransitionGroup
    transitionName="navbar"
    transitionAppear
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <section className="w-100 db" onMouseLeave={close}>
      <div>
        <ul className="list pl0 ma0 w-100">
          {polls &&
            polls.map((poll, index) => (
              <li
                data-colour={
                  {
                    0: 'yellow',
                    1: 'orange',
                    2: 'red',
                    3: 'blue',
                    4: 'green',
                  }[index < 5 ? index : Math.floor(Math.random() * 4) + 1]
                }
                className="ph5 pv3"
                data-test={`poll${index}`}
                key={poll.id}
                onClick={() =>
                  poll.ended
                    ? markResultsAsSeen(poll.id, user.providerData[0].uid)
                    : markNotificationAsSeen(poll.id, user.providerData[0].uid)
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
        <div data-colour="green" className="f5 ph5 pv3 ma0 tr">
          <AuthButtons user={user} handleShowDeleteModal={handleShowDeleteModal} />
        </div>
      </div>
    </section>
  </ReactCSSTransitionGroup>
);

PollBox.propTypes = {
  polls: PropTypes.array,
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default PollBox;
