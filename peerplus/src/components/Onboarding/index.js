import React, { Component } from 'react';
import Logo from '../../images/peerPlusLogo.png';
import { Link } from 'react-router-dom';
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
  Trash,
} from './Badges';
import { withUserData } from '../../hocs/withUserData';
import { db } from '../../constants/firebase';

class Onboarding extends Component {
  state = {
    onboarding: {},
  };

  componentDidMount() {
    db
      .doc(`users/${this.props.user.providerData[0].uid}`)
      .get()
      .then(user => this.setState({ onboarding: user.data().onboarding }));
  }

  render() {
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc grid col">
          <div className="flex">
            <Thunder color="#f5b152" />
            <p className="w-100 ml5 tl">Create an account.</p>
          </div>
          <div className="flex">
            <Weekly color={this.state.onboarding && this.state.onboarding.weekly && '#f5b152'} />
            <p className="w-100 ml5 tl">Use Palpoll every Week.</p>
          </div>
          <div className="flex">
            <First color={this.state.onboarding && this.state.onboarding.public && '#f5b152'} />
            <p className="w-100 ml5 tl">Send Your First Public Poll</p>
          </div>
          <div className="flex">
            <Picture color={this.state.onboarding && this.state.onboarding.photo && '#f5b152'} />
            <p className="w-100 ml5 tl">Send your first picture Poll.</p>
          </div>
          <div className="flex">
            <Chart color={this.state.onboarding && this.state.onboarding.response && '#f5b152'} />
            <p className="w-100 ml5 tl">Collect your first set of results.</p>
          </div>
          <div className="flex">
            <Recieve color={this.state.onboarding && this.state.onboarding.recieved && '#f5b152'} />
            <p className="w-100 ml5 tl">Recieve your first public Poll.</p>
          </div>
          <div className="flex">
            <Add color={this.state.onboarding && this.state.onboarding.private && '#f5b152'} />
            <p className="w-100 ml5 tl">Send your first private request.</p>
          </div>
          <div className="flex">
            <Person color={this.state.onboarding && this.state.onboarding.friends && '#f5b152'} />
            <p className="w-100 ml5 tl">Import Friends from facebook.</p>
          </div>
          <div className="flex">
            <Invite color={this.state.onboarding && this.state.onboarding.invite && '#f5b152'} />
            <p className="w-100 ml5 tl"> Add someone to a poll after it started.</p>
          </div>
          <div className="flex">
            <Trash color={this.state.onboarding && this.state.onboarding.delete && '#f5b152'} />
            <p className="w-100 ml5 tl">Delete your first Poll.</p>
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

export default withUserData(Onboarding);
