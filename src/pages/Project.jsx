import React from "react";
import Stats from "../features/stats/Stats";
import Tasks from "../features/tasks/Tasks";
import Decisions from "../features/decisions/Decisions";

const Project = () => {
  return (
    <>
      <Stats />
      <Tasks />
      <Decisions />

  <Footer     />
    </>
  );
};

export default Project;

    const Footer = ({}) => {
      return (<footer class="footer_10 bg-dark pt-95 pb-135 color-white">
	<div class="container px-xl-0">
		<div class="row">
			<div class="col-lg-1"></div>
			<div class="mb-50 mb-lg-0 col-lg-3" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<a href="#" class="mb-35 logo link color-white">Decisionboard</a>
				<div class="text-adaptive">
					Helping small teams stay on top of important decisions.
				</div>
				<div class="mt-35 socials">
					<a href="#" class="f-18 link color-white mr-15"><i class="fab fa-twitter"></i></a>
					<a href="#" class="f-18 link color-white mx-15"><i class="fab fa-facebook-square"></i></a>
					<a href="#" class="f-18 link color-white ml-15"><i class="fab fa-google-plus-g"></i></a>
				</div>
			</div>
			<div class="mb-50 mb-sm-0 col-lg-2 col-sm-3 col-6" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
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
			
		</div>
	</div>
</footer>);
    }
  