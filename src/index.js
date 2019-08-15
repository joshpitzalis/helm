import React from "react";
import ReactDOM from "react-dom";
import Project from "./pages/Project";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import {
  BrowserRouter ,
  Route,
  Link,
} from "react-router-dom";
import Decision from './pages/Decision'
import Auth from './pages/Auth'




const Nav = () => {
	return (
	  <nav className="header_menu_15 pt-35 pb-30">
		<div className="container px-xl-0">
		  <div className="row justify-content-center">
			<div className="col-xl-10">
			  <div className="row justify-content-between align-items-baseline">
				<div className="col-xl-3 logo">Decisionboard</div>
				<div className="col-xl-6 d-flex justify-content-center align-items-baseline medium">
		

          <Link to="/" className="mx-15 link color-heading underline ">	Meetbox</Link>
				
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
				<div className="col-xl-3 d-flex justify-content-end align-items-baseline">
				  <a href="#" className="mx-15 link medium action-1">
					Logout
				  </a>
				  <a href="#" className="ml-15 btn sm action-1">
					Josh
				  </a>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </nav>
	);
  };
  

    const Footer = ({}) => {
      return (<footer class="footer_10 bg-dark pt-95 pb-135 color-white">
	<div class="container px-xl-0">
		<div class="flex justify-center">
			<div class="col-lg-1"></div>
			<div class="mb-50 mb-lg-0 col-lg-3 tc" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<a href="#" class="mb-35 logo link color-white">Decisionboard</a>
				<div class="text-adaptive">
					Helping small teams stay on top of important decisions.
				</div>
				<div class="mt-35 socials">
					<a href="#" class="f-18 link color-white mr-15"><i class="fab fa-twitter"></i></a>

				</div>
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
</footer>);
    }


    const App = () => {
      return (
        <BrowserRouter>
        <div>
        <Nav	/>
          <Route exact path="/" component={Auth} />
          <Route exact path="/dashboard" component={Project} />
          <Route exact path="/decision" component={Decision} />
          <Footer     />
        </div>
      </BrowserRouter>
       
      );
    };
    
    ReactDOM.render(<App />, document.getElementById("root"));
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
  
    
{
  /* 

      <div className="navigation_mobile bg-dark type1 opened">
        <a href="#" className="close_menu color-white">
          <i className="fas fa-times" />
        </a>
        <div className="px-40 pt-60 pb-60 inner">
          <div className="logo color-white mb-30">Startup 3</div>
          <div>
            <a href="#" className="f-heading f-22 link color-white mb-20">
              Home
            </a>
          </div>
          <div>
            <a href="#" className="f-heading f-22 link color-white mb-20">
              Tour
            </a>
          </div>
          <div>
            <a href="#" className="f-heading f-22 link color-white mb-20">
              Mobile Apps
            </a>
          </div>
          <div>
            <a href="#" className="f-heading f-22 link color-white mb-20">
              Pricing
            </a>
          </div>
          <div>
            <a href="#" className="f-heading f-22 link color-white mb-20">
              Development
            </a>
          </div>
          <div>
            <a href="#" className="link color-white op-3 mb-15">
              Help
            </a>
          </div>
          <div>
            <a href="#" className="link color-white op-3 mb-15">
              F.A.Q.
            </a>
          </div>
          <div>
            <a href="#" className="link color-white op-3 mb-15">
              Support
            </a>
          </div>
          <div>
            <a href="#" className="link color-white op-3 mb-15">
              About Us
            </a>
          </div>
          <div>
            <a href="#" className="link color-white op-3 mb-15">
              Blog
            </a>
          </div>
          <div>
            <a href="#" className="link color-white op-3 mb-15">
              Careers
            </a>
          </div>

          <div className="socials mt-40">
            <a href="#" target="_blank" className="link color-white f-18 mr-20">
              <i className="fab fa-twitter" />
            </a>
            <a href="#" target="_blank" className="link color-white f-18 mr-20">
              <i className="fab fa-facebook" />
            </a>
            <a href="#" target="_blank" className="link color-white f-18 mr-20">
              <i className="fab fa-google-plus-g" />
            </a>
          </div>

          <div className="mt-50 f-14 light color-white op-3 copy">
            &copy; 2019 Designmodo. All rights reserved.
          </div>
        </div>
      </div> */
}
