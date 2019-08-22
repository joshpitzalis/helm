/* eslint-disable */
import {  format } from 'date-fns'
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import firebase from '../utils/firebase'
import { toast$ } from '../features/toast/toast.jsx';
import { Timeline, Icon } from 'antd';


const Project = ({ user, project }) => {

  const [projectId, setProjectId] = useState('')




  // if (!user) {
  //   return <Redirect to="/" />;
  // }

  return (
    
< div className='flex'>

  < div className='flex-grow-1'>
<section className="pricing_table_5 bg-light pt-105 pb-100 text-center ma3">
	<div className="container px-xl-0">
		<div className="row justify-content-center">
			<div className="col-xl-6 col-lg-8 col-md-10">
				<h2 className="small" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">Simple &amp; flexible pricing built for everyone</h2>
				<div className="mt-20 mb-65 color-heading text-adaptive" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
					Start with 14-day free trial. No credit card needed. Cancel at anytime.
				</div>
			</div>
		</div>
		<div className="flex wrap">
      < div className='flex flex-column col-lg-4 '>
			<div className=" d-flex align-items-stretch order-0 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="mw-370 w-full mx-auto radius10 pt-35 pb-40 block">
					<div className="mb-35 f-14 semibold text-uppercase sp-20 title">Start</div>
					<div className="d-flex justify-content-center align-items-center">
						<div className="f-58 relative flex-shrink-0 price">
							<span className="absolute f-16">$</span>
							<b>19</b>
						</div>
						<div className="ml-15 text-left">per user<br />per month</div>
					</div>
					<div className="mt-25 mx-auto mw-260 color-heading text-adaptive">
						All the features you need to 
						keep your personal files safe, 
						accessible, and easy to share.
					</div>
				</div>
			</div>
			
      <div className="mt-35 mb-70 mb-lg-0  order-1 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="row justify-content-center">
					<div className="col-auto text-left color-heading">
						<ul className="px-0">
							<li className="mb-10">2 GB of hosting space</li>
							<li className="mb-10">14 days of free backups</li>
							<li className="mb-10 color-gray disabled">Social integrations</li>
							<li className="mb-10 color-gray disabled">Advanced client billing</li>
						</ul>
					</div>
					<div className="col-12">
						<a href="#" className="mt-15 btn border-gray color-main">Start Free Trial</a>
					</div>
				</div>
			</div>
			</div>
    

      < div className='flex flex-column col-lg-4 '>
			<div className=" d-flex align-items-stretch order-0 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="mw-370 w-full mx-auto radius10 pt-35 pb-40 block">
					<div className="mb-35 f-14 semibold text-uppercase sp-20 title">Start</div>
					<div className="d-flex justify-content-center align-items-center">
						<div className="f-58 relative flex-shrink-0 price">
							<span className="absolute f-16">$</span>
							<b>19</b>
						</div>
						<div className="ml-15 text-left">per user<br />per month</div>
					</div>
					<div className="mt-25 mx-auto mw-260 color-heading text-adaptive">
						All the features you need to 
						keep your personal files safe, 
						accessible, and easy to share.
					</div>
				</div>
			</div>
			
      <div className="mt-35 mb-70 mb-lg-0  order-1 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="row justify-content-center">
					<div className="col-auto text-left color-heading">
						<ul className="px-0">
							<li className="mb-10">2 GB of hosting space</li>
							<li className="mb-10">14 days of free backups</li>
							<li className="mb-10 color-gray disabled">Social integrations</li>
							<li className="mb-10 color-gray disabled">Advanced client billing</li>
						</ul>
					</div>
					<div className="col-12">
						<a href="#" className="mt-15 btn border-gray color-main">Start Free Trial</a>
					</div>
				</div>
			</div>
			</div>


      < div className='flex flex-column col-lg-4 '>
			<div className=" d-flex align-items-stretch order-0 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="mw-370 w-full mx-auto radius10 pt-35 pb-40 block">
					<div className="mb-35 f-14 semibold text-uppercase sp-20 title">Start</div>
					<div className="d-flex justify-content-center align-items-center">
						<div className="f-58 relative flex-shrink-0 price">
							<span className="absolute f-16">$</span>
							<b>19</b>
						</div>
						<div className="ml-15 text-left">per user<br />per month</div>
					</div>
					<div className="mt-25 mx-auto mw-260 color-heading text-adaptive">
						All the features you need to 
						keep your personal files safe, 
						accessible, and easy to share.
					</div>
				</div>
			</div>
			
      <div className="mt-35 mb-70 mb-lg-0  order-1 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="row justify-content-center">
					<div className="col-auto text-left color-heading">
						<ul className="px-0">
							<li className="mb-10">2 GB of hosting space</li>
							<li className="mb-10">14 days of free backups</li>
							<li className="mb-10 color-gray disabled">Social integrations</li>
							<li className="mb-10 color-gray disabled">Advanced client billing</li>
						</ul>
					</div>
					<div className="col-12">
						<a href="#" className="mt-15 btn border-gray color-main">Start Free Trial</a>
					</div>
				</div>
			</div>
			</div>
    </div>
	</div>
</section>



<section className="feature_8 bg-light pt-105 pb-30">
	<div className="container px-xl-0">
		<h2 className="mb-50 small text-lg-center" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">A Lot of Features</h2>
		<div className="row">
			<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
				<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
					<i className="fas fa-code color-heading f-18"></i>				</div>
				<div className="inner">
					<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Based on Bootstrap 3</div>
					<div className="color-heading op-7 text-adaptive">
						HTML layout is based on one of the 
						most common and reliable <br />
						framework - Bootstrap.					</div>
				</div>
			</div>
			<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
				<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
					<i className="fab fa-html5 color-heading f-18"></i>				</div>
				<div className="inner">
					<div className="mb-20 f-14 semibold text-uppercase sp-20 title">HTML5, CSS3, LESS</div>
					<div className="color-heading op-7 text-adaptive">
						We used only time-tested <br />
						technologies for the best results.					</div>
				</div>
			</div>
			<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="900">
				<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
					<i className="fas fa-cogs color-heading f-18"></i>				</div>
				<div className="inner">
					<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Many Components</div>
					<div className="color-heading op-7 text-adaptive">
						There are a lot of different <br />
						components that will help you <br />
						create the perfect look and feel for 
						your startup.					</div>
				</div>
			</div>
			<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
				<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
					<i className="fas fa-building color-heading f-18"></i>				</div>
				<div className="inner">
					<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Block Model</div>
					<div className="color-heading op-7 text-adaptive">
						You can easily combine components 
						in a variety ways for different design 
						projects. It's easy!					</div>
				</div>
			</div>
			<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
				<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
					<i className="far fa-calendar-check color-heading f-18"></i>				</div>
				<div className="inner">
					<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Save Time</div>
					<div className="color-heading op-7 text-adaptive">
						Take a break from the routine and 
						spend your time brainstorming <br />
						ideas for your business, not your 
						website.					</div>
				</div>
			</div>
			<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="900">
				<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
					<i className="fas fa-dollar-sign color-heading f-18"></i>				</div>
				<div className="inner">
					<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Save Money</div>
					<div className="color-heading op-7 text-adaptive">
						Startups can save money on design 
						and code and use those savings to 
						develop the business.					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</div>

<div className='w5 ma3 pt-105'>
  <Timeline mode="alternate" >
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.
    </Timeline.Item>
    <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
      Technical testing 2015-09-01
    </Timeline.Item>
  </Timeline>
  </div>
</div>

  )
}

export default Project;