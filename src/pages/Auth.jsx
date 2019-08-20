import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../utils/firebase';

const propTypes = {};

const defaultProps = {};

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSignup = _email =>
    firebase
      .auth()
      .sendSignInLinkToEmail(_email, {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
      })
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', _email);
      })
      .catch(error => {
        // Some error occurred, you can inspect the code: error.code
        console.log(error);
      });

  return (
    <React.Fragment>
      <section className=" pt-120 pb-120">
        <div className="container px-xl-0">
          <form
            action="form-handler.php"
            method="post"
            className="bg-light mx-auto mw-430 radius10 pt-40 px-50 pb-30"
          >
            <h2
              className="mb-40 small text-center"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="0"
            >
              Sign Up Now
            </h2>
            <div
              className="mb-20 input_holder"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="150"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
              />
            </div>
            <div
              className="mb-20 input_holder"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
              />
            </div>
            {/* <div
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="450"
            >
              <label
                htmlFor="form_1_checkbox"
                className="mt-25 color-heading w-full"
                id="form_1_checkbox"
              >
                I agree to the Terms of Service{' '}
                <input
                  type="checkbox"
                  name="rules"
                  className="d-none border-gray focus-action-1"
                  id="form_1_checkbox"
                  checked
                />
              </label>
            </div> */}
            <div
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              <input
                type="submit"
                title="Create an Account"
                className="mt-25 btn action-1 w-full"
              />
            </div>
            <div
              className="mt-50 hr bg-gray h-1"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="750"
            ></div>
            <div
              className="mt-25 f-18 medium color-heading text-center"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="900"
            >
              Do you have an Account?{' '}
              <a href="#" className="link action-1">
                Sign In
              </a>{' '}
            </div>
          </form>
        </div>
      </section>
      <div
        className="alert alert-success alert-dismissible alert-form-success"
        role="alert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        Thanks for your message!
      </div>
      <div
        className="alert alert-warning alert-dismissible alert-form-check-fields"
        role="alert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        Please, fill in required fields.
      </div>
      <div
        className="alert alert-danger alert-dismissible alert-form-error"
        role="alert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        An error occurred while sending data :(
      </div>

      <div className="overlay"></div>

      <div className="video_popup">
        <a className="close">
          <img
            srcSet="i/close_white@2x.png 2x"
            src="i/close_white.png"
            alt=""
          />
        </a>
        <div className="d-flex align-items-center justify-content-center w-full h-full iframe_container"></div>
      </div>
    </React.Fragment>
  );
}

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;
