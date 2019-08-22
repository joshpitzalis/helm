import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { useAuth } from './features/auth/helpers';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';
import HelmLogo from './styles/svg/helmLogo';
import Auth from './pages/Auth';
import Banner, { toast$ } from './features/toast/toast';
import firebase from './utils/firebase';

const Nav = ({ avatar }) => (
  <nav className="header_menu_15 pt-35 pb-30">
    <div className="container px-xl-0">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="row justify-content-between align-items-baseline">
            <div className="col-xl-3 logo">
              <HelmLogo /> Helm
            </div>
            {/* {avatar && (
              <div className="col-xl-6 d-flex justify-content-center align-items-baseline medium">
                <Link to="/" className="mx-15 link color-heading underline ">
                  {' '}
                  Meetbox
                </Link>

                <Link to="/" className="mx-15 link color-heading o-50 ">
                  Rubbish Project
                </Link>
                <Link to="/" className="mx-15 link color-heading o-50 ">
                  Suzies
                </Link>
                <Link to="/" className="mx-15 link color-heading o-50 ">
                  + New
                </Link>
              </div>
            )} */}
            {avatar && (
              <div className="col-xl-3 d-flex justify-content-end align-items-center">
                <button
                  type="button"
                  className="mx-15 link medium action-1"
                  onClick={() => firebase.auth().signOut()}
                >
                  Logout
                </button>

                <Avatar src={avatar} size="large" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

Nav.propTypes = {
  avatar: PropTypes.string,
};
Nav.defaultProps = {
  avatar: '',
};

const Footer = () => (
  <footer className="footer_10 bg-dark pt-95 pb-135 color-white">
    <div className="container px-xl-0">
      <div className="flex justify-center">
        <div className="col-lg-1"></div>
        <div className="mb-50 mb-lg-0 col-lg-3 tc">
          <a href="#" className="mb-35 logo link color-white">
            <HelmLogo color="white" /> Helm
          </a>
          <div className="text-adaptive">
            Helping small teams understand their objectives.
          </div>
          <small className="o-50">Version 0.0.3</small>
          {/* <div className="mt-35 socials">
            <a href="#" className="f-18 link color-white mr-15">
              <i className="fab fa-twitter"></i>
            </a>
          </div> */}
        </div>
        {/* <div class="mb-50 mb-sm-0 col-lg-2 col-sm-3 col-6" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
				<div class="mb-35 f-18 medium title">Product</div>
				<div class="mb-10"><a href="#" class="link color-white">Features</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Pricing</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Tour</a></div>
			</div>
			<div class="mb-50 mb-sm-0 col-lg-2 col-sm-3 col-6" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
				<div class="mb-35 f-18 medium title">How To</div>
				<div class="mb-10"><a href="#" class="link color-white">Track a Metric</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Call a Meeting</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Make a Decision</a></div>
			</div>

      <div class="mb-50 mb-sm-0 col-lg-2 col-sm-3 col-6" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
				<div class="mb-35 f-18 medium title">Learn</div>
				<div class="mb-10"><a href="#" class="link color-white">Meeting Hygiene</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Productivity Hacks</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Critical Thinking</a></div>
			</div>

			<div class="col-lg-2 col-sm-3 col-6" data-aos-duration="600" data-aos="fade-down" data-aos-delay="900">
				<div class="mb-35 f-18 medium title">Stuff</div>
				<div class="mb-10"><a href="#" class="link color-white">Privacy</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Support</a></div>
				<div class="mb-10"><a href="#" class="link color-white">Help Desk</a></div>
				<div class="mb-10"><a href="#" class="link color-white">FAQ</a></div>
			</div>
			 */}
      </div>
    </div>
  </footer>
);

const NoMatch = () => (
  <section data-testid="noMatchPage">
    <p>Sorry. No Match For this Page</p>
  </section>
);

const App = () => {
  const user = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('projects')
      .where('team', 'array-contains', user && user.email)
      .onSnapshot(
        collection => {
          const _projects = collection.docs.map(doc => doc.data());
          setProjects(_projects);
        },
        error => {
          const message = error.message || error;

          toast$.next({
            type: 'ERROR',
            message,
          });
        }
      );

    return () => unsubscribe();
  }, [user]);

  return (
    <BrowserRouter>
      <div>
        <Nav avatar={user && user.photoURL} />
        <Banner />
        <Switch>
          <Route
            exact
            path="/"
            component={props => <Auth user={user} {...props} />}
          />
          <PrivateRoute
            path="/dashboard/:userId"
            component={props => (
              <Dashboard user={user} {...props} projects={projects} />
            )}
          />
          <PrivateRoute
            path="/project/:projectId"
            component={props => (
              <Project user={user} {...props} projects={projects} />
            )}
          />

          <Route component={NoMatch} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
};
PrivateRoute.defaultProps = {
  user: null,
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// mobile navigation

// <div className="navigation_mobile bg-dark type1 opened">
//   <a href="#" className="close_menu color-white">
//     <i className="fas fa-times" />
//   </a>
//   <div className="px-40 pt-60 pb-60 inner">
//     <div className="logo color-white mb-30">Startup 3</div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Home
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Tour
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Mobile Apps
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Pricing
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Development
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Help
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         F.A.Q.
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Support
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         About Us
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Blog
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Careers
//       </a>
//     </div>

//     <div className="socials mt-40">
//       <a href="#" target="_blank" className="link color-white f-18 mr-20">
//         <i className="fab fa-twitter" />
//       </a>
//       <a href="#" target="_blank" className="link color-white f-18 mr-20">
//         <i className="fab fa-facebook" />
//       </a>
//       <a href="#" target="_blank" className="link color-white f-18 mr-20">
//         <i className="fab fa-google-plus-g" />
//       </a>
//     </div>

//     <div className="mt-50 f-14 light color-white op-3 copy">
//       &copy; 2019 Designmodo. All rights reserved.
//     </div>
//   </div>
// </div>;
