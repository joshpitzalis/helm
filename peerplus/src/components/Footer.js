import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Footer = () => (
  <Fragment>
    <div className="grid row footerBar">
      <div data-colour="orange" />
      <div data-colour="yellow" />
      <div data-colour="red" />
      <div data-colour="green" />
      <div data-colour="blue" />
    </div>
    <footer className="flex justify-between items-center ph5-ns ph3">
      <p className="white f4">support@peerplus.com</p>
      <p className="white f4">Terms</p>
    </footer>
  </Fragment>
);
