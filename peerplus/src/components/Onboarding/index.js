import React, { Component } from 'react';
import Logo from '../../images/peerPlusLogo.png';
import { Thunder } from './Badges';

export default class Onboarding extends Component {
  render() {
    return (
      <article className="pv5">
        <section className="mw6-ns w-100 center tc">
          <div>Onboarding</div>
          <Thunder />
          <img src={Logo} alt="" height="50" />
          <img src={Logo} alt="" height="50" />
          <img src={Logo} alt="" height="50" />
          <img src={Logo} alt="" height="50" />
        </section>
      </article>
    );
  }
}
