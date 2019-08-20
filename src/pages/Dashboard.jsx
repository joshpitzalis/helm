/* eslint-disable */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Icon } from 'antd';

const Dashboard = ({user}) => {

  const [projectId, setProjectId] = useState('')

  if (!user) {
    return <Redirect to="/" />;
  }

  return (

    <section className="ecommerce_16 bg-light mt5 pb-70"
    data-testid='dashboardPage'>
      <Edit projectId={projectId} setProjectId={setProjectId} />
      <div className="container px-xl-0">


        <div className="flex justify-center">
          <div className="mt-20 col-xl-8 col-lg-9 products">
            <div className="row">
              {[1].map(() => (
                <Project />
              ))}



              {/* <p className="color-heading f-14 semibold text-uppercase sp-20 total center w-100 tc measure">
                See Archived Projects 
              </p> */}


            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-center mv6">
        <a className="self-center mt-15 btn action-1 lg border-transparent-white " style={{ color: 'white' }}
          onClick={() => setProjectId('temp')}

        >
          <span className='o-90'> + Create A New Project </span>
        </a>
      </div>
    </section>

  )
}

export default Dashboard;


const Project = ({ }) => {
  return (
    <Link to="/decision" className="dark-blue pb3 mb-30 mx-auto col-md-12 d-flex flex-wrap align-items-stretch justify-content-between product pointer ">

      <PieChart
        // data={[
        //   { title: 'One', value: 10, color: '#E38627' },
        //   { title: 'Two', value: 15, color: '#C13C37' },
        //   { title: 'Three', value: 20, color: '#6A2135' },
        // ]}
        data={[{
          title: 'One',
          value: 100,
          color: '#E38627'
        }]}
        className="dib w4 center" />
      <div className="ml-30 w-470 pt-10 pb-10 d-flex flex-column justify-content-start inner">
        <div className="top">
          <div className="d-flex flex-column-reverse flex-md-row align-items-baseline justify-content-between">
            <h4 className="f-32 bold ml-15">Name of Project</h4>
          </div>
          <div className="col-lg-7">
            <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib ba bw2 b--white" alt="kitty staring at you" />

            <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib ba bw2 b--white relative right-1" alt="kitty staring at you" />

            <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib ba bw2 b--white relative right-2" alt="kitty staring at you" />
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center bottom ">

          <div className="ml-15 flex-shrink-0 f-14 sp-20 semibold action-2 price color-heading o-50">
            Created on 20 August 2019
                      </div>


        </div>
      </div>
    </Link>);
}




const propTypes = {};

const defaultProps = {};

const Edit = ({ projectId, setProjectId }) => {
  return (
    <Modal
      title="Edit Project"
      visible={projectId}
onCancel={() => setProjectId('')}

      footer={[

<span className='flex items-center justify-end h-100 ' >
        <button type="submit" className="link  action-3 mr3"

          onClick={() => setProjectId('')}>

          Cancel
    </button>  


        <button type="submit" className=" btn action-1 " onClick={() => setProjectId('')}>

          Save
</button>
</span> 
      ]}
    >

      <form
        onSubmit={e => e.preventDefault()}
        className="bg-light mx-auto mw-430 radius10 pt-40 px-50 pb-30"
      >
        
        <div
          className="mb-20 input_holder"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="150"
        >
          <input
            type="name"
            name="name"
            placeholder="project name"
            value={''}
            onChange={() => { }}
            className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
          />
        </div>
        

<h2
          className="mt-40 mb-20 small text-center"
         
        >
          Add People
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
            placeholder="add invitee email address"
            value={''}
            onChange={() => { }}
            className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
          />
        </div>

        {/* <div
          className="mt-50 hr bg-gray h-1"
        
        ></div> */}

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
        {/* <div
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="600"
        >
          <button type="submit" className="mt-25 btn action-1 w-full">
            <Icon
              type="google"
              style={{ fontSize: '24px' }}
              className="pt0"
            />{' '}
            <span className="pt2 pl2">Signup or Login</span>
          </button>
        </div> */}
        
        {/* <div
          className="mt-25 f-18 medium color-heading text-center"
         
        >
          Do you have an Account?{' '}
          <a href="#" className="link action-1">
            Sign In
              </a>{' '}
        </div> */}
      </form>
    </Modal>
  );
}

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;