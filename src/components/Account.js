import React from "react";
import { withUserData } from "../hocs/withUserData";
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
} from "./Onboarding/Badges";
import { Link } from "react-router-dom";

const Account = ({ user }) => {
  return (
    <article className="pv5">
      <section className="mw6-ns w-100 center tc grid col">
        <div className="w-100 center">
          <img src={user.photoURL} className="br-100 h3 w3 dib" alt="avatar" />
        </div>
        <p className="bb bt pv4">{user.email}</p>
        <div className="grid row gap1">
          <Thunder color="#f5b152" className="pt3" />
          <Invite />
          <Weekly />
          <First />
          <Picture />
          <Recieve />
          <Add />
          <Person />
          <Chart />
          <Trash />
        </div>

        <div className="db dtc-ns black-70 tc tr-ns v-mid center mb5">
          <a
            href="https://www.facebook.com/"
            className="link dim dib mr3 black-70"
            title="Impossible Labs on Facebook"
          >
            <svg
              className="db w2 h2"
              data-icon="facebook"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <title>facebook icon</title>
              <path d="M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z" />
            </svg>
          </a>
          <a href="https://twitter.com/" className="link dim dib mr3 black-70">
            <svg
              className="db w2 h2"
              data-icon="twitter"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <title>twitter icon</title>
              <path d="M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4" />
            </svg>
          </a>
        </div>

        <div className="w-100 tc">
          <Link to={`/`}>
            <button>Back</button>
          </Link>
          <button className="w-100 tc seethrough">Edit Profile</button>
        </div>
      </section>
    </article>
  );
};

export default withUserData(Account);
