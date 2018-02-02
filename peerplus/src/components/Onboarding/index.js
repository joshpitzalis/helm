import React, { Component } from "react";
import Logo from "../../images/peerPlusLogo.png";
import { Link } from "react-router-dom";
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
} from "./Badges";

export default class Onboarding extends Component {
  render() {
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc grid col">
          <div className="flex">
            <Thunder color="#f5b152" />
            <p className="w-100 ml5 tl">Create an account.</p>
          </div>
          <div className="flex">
            <Invite />
            <p className="w-100 ml5 tl">Collect your first set of results.</p>
          </div>
          <div className="flex">
            <Weekly />
            <p className="w-100 ml5 tl">Recieve your first poll request.</p>
          </div>
          <div className="flex">
            <First />
            <p className="w-100 ml5 tl">Import Friends from facebook.</p>
          </div>
          <div className="flex">
            <Picture />
            <p className="w-100 ml5 tl">Create your first picture Poll.</p>
          </div>
          <div className="flex">
            <Recieve />
            <p className="w-100 ml5 tl">Create your first public Poll.</p>
          </div>
          <div className="flex">
            <Add />
            <p className="w-100 ml5 tl">Use Palpoll every Week.</p>
          </div>
          <div className="flex">
            <Person />
            <p className="w-100 ml5 tl">Invite someone to a poll by email.</p>
          </div>
          <div className="flex">
            <Chart />
            <p className="w-100 ml5 tl">
              {" "}
              Add someone to a poll after it started.
            </p>
          </div>
          <div className="flex">
            <Trash />
            <p className="w-100 ml5 tl">Delet your first Poll.</p>
          </div>
        </section>
        <div className="w-100 tc">
          <Link to={`/`}>
            <button>Back</button>
          </Link>
        </div>
      </article>
    );
  }
}
