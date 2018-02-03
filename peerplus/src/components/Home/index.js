import React from "react";
import { WithMyPollData } from "../../hocs/withPollData";
import { withUserData } from "../../hocs/withUserData";
import { compose } from "recompose";
import CreatePollButton from "./CreatePollButton";
import Polls from "./Polls";
import { auth } from "../../constants/firebase";
import {
  Thunder,
  Invite,
  Weekly,
  First,
  Picture,
  Recieve,
  Add,
  Person,
  Chart,
  Trash
} from "../Onboarding/Badges";
import { Link } from "react-router-dom";

const Home = ({ user, polls }) => (
  <article className="pv5">
    <section className="mw6-ns w-100 center tc">
      <CreatePollButton user={user} />
      <Badges user={user} />
      {user && (
        <WithMyPollData uid={user.uid}>
          {polls => <Polls polls={polls} />}
        </WithMyPollData>
      )}
    </section>
  </article>
);

export const Badges = ({ user }) => (
  <div className="grid row gap1">
    <Link to={`/onboarding/${user.uid}`} className="pt3">
      <Thunder color="#f5b152" />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Invite />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Weekly />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <First />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Picture />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Recieve />
    </Link>
    <Link to={`/onboarding/${user.uid}`} className="pt2">
      <Add />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Person />
    </Link>
    <Link to={`/onboarding/${user.uid}`}>
      <Chart />
    </Link>
    <Link to={`/onboarding/${user.uid}`} className="pt1">
      <Trash />
    </Link>
  </div>
);

export default compose(withUserData)(Home);
