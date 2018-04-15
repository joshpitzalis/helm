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

// class ExampleBoundary extends Component {
//   constructor(props) {
//       super(props);
//       this.state = { error: null };
//   }

//   componentDidCatch(error, errorInfo) {
//       this.setState({ error });
//       Raven.captureException(error, { extra: errorInfo });
//   }

//   render() {
//       if (this.state.error) {
//           //render fallback UI
//           return (
//               <div
//               className="snap"
//               onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
//                   <img src={oops} />
//                   <p>We're sorry — something's gone wrong.</p>
//                   <p>Our team has been notified, but click here fill out a report.</p>
//               </div>
//           );
//       } else {
//           //when there's not an error, render children untouched
//           return this.props.children;
//       }
//   }
// }
