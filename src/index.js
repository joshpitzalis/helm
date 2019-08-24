import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { useAuth } from './features/auth/helpers';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';
import Auth from './pages/Auth';
import Banner, { toast$ } from './features/toast/toast';
import firebase from './utils/firebase';
import { Nav } from './features/layout/Nav';
import { Footer } from './features/layout/Footer';
import { NoMatch } from './features/layout/NoMatch';

const App = () => {
  const user = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user && user.email) {
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
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div>
        <Nav avatar={user && user.photoURL} uid={user && user.uid} />
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
