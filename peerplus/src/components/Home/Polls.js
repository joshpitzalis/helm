import React from "react";
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes
} from "recompose";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Loading } from "../Loading";

const NoPollsAvailable = () => <p>No Polls available.</p>;

const onlyShowIfPollsAvailable = branch(
  ({ polls }) => polls && polls.length === 0,
  renderComponent(NoPollsAvailable)
);

const showSpinnerWhileLoading = branch(
  ({ polls }) => !polls,
  renderComponent(Loading)
);

// const onlyShowIfAuthenticated = branch(({ user }) => !user, renderNothing);

const ListOfPolls = ({ polls }) => (
  <ul className="list pl0 ml0 center mw6 br2 ">
    {polls.map((poll, index) => (
      <li
        data-colour="green"
        className="ph3 pv3 mv3 grow"
        key={index}
        data-test={`response${index}`}
      >
        <Link to={`/responses/${poll.id}`}>
          {Object.keys(poll.participants).length > 0 &&
            poll.completedBy &&
            calculatePercentageComplete(
              Object.keys(poll.participants).length,
              poll.completedBy.length
            ) + "%"}
          {poll.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default compose(
  setDisplayName("Polls"),
  setPropTypes({
    polls: PropTypes.array
  }),
  // onlyShowIfAuthenticated,
  onlyShowIfPollsAvailable,
  showSpinnerWhileLoading
)(ListOfPolls);

export const calculatePercentageComplete = (participants, completedBy) => {
  return Math.floor(completedBy / participants * 100);
};
