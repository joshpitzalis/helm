import React, { Component } from 'react';
// import { auth } from "../constants/firebase.js";

export default class App extends Component {
  render() {
    return (
      <article className="bg-red">
        <section className="vh-100">
          <h1>Sorry</h1>
          <p>You are attempting to complete a poll you have not been invited to</p>
          <button>Create Your Own Poll</button>
        </section>
      </article>
    );
  }
}
