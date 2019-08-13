import React from "react";
import PieChart from 'react-minimal-pie-chart';

import PropTypes from 'prop-types';
const propTypes = {};

const defaultProps = {};

export default function Decisions(props) {
  return (
    <section className="ecommerce_16 bg-light pt-100 pb-70">
      <div className="container px-xl-0">
        <div className="row">
          <div className="col-lg-3" />
          <div className="col-xl-8 col-lg-9 d-flex flex-wrap justify-content-end align-items-baseline">
            
            <div className="sort_by">
              {/* <span className="color-heading f-14 semibold text-uppercase sp-20">
                Sort by{" "}
              </span> */}
              <div className="d-inline-block dropdown">
                <a
                 
                  className="link color-main f-14 semibold text-uppercase sp-20 dropdown-toggle"
                  id="ecommerce_16_dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Ending Soonest
                </a>
                
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <Meetings/>
          
          <div className="mt-20 col-xl-8 col-lg-9 products">
            <div className="row">
              {[1].map(item => (
                <div className=" pb3 mb-30 mx-auto col-md-12 d-flex flex-wrap align-items-stretch justify-content-between product pointer ">
                  {/* <img
                    srcset="i/ecommerce_16_product_1@2x.jpg 2x"
                    src="i/ecommerce_16_product_1.jpg"
                    alt=""
                  /> */}
                  <PieChart
                  data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                  ]}

                                      className="dib w4 center"
                                      />
                  <div className="ml-30 w-470 pt-10 pb-10 d-flex flex-column justify-content-start inner">
                    <div className="top">
                      <div className="d-flex flex-column-reverse flex-md-row align-items-baseline justify-content-between">
                        <h4 className="f-32 bold">Name of Active Decision</h4>
                        <div className="ml-15 flex-shrink-0 f-14 sp-20 semibold action-2 price">
                         3 Days 2h
                        </div>
                      </div>
                      <div className="col-lg-7">
        <img
          src="http://tachyons.io/img/avatar_1.jpg"
          class="br-100 h3 w3 dib ba bw2 b--white"
          title="Photo of a kitty staring at you"
        />

        <img
          src="http://tachyons.io/img/avatar_1.jpg"
          class="br-100 h3 w3 dib ba bw2 b--white relative right-1"
          title="Photo of a kitty staring at you"
        />

        <img
          src="http://tachyons.io/img/avatar_1.jpg"
          class="br-100 h3 w3 dib ba bw2 b--white relative right-2"
          title="Photo of a kitty staring at you"
        />
      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center bottom mt3">
                      <a href="#" className="mr-20 btn sm action-1 f-16 medium">
                        Vote
                      </a>
                      {/* <a href="#" className="link color-heading f-18 medium">
                        Abstain
                      </a> */}
                    </div>
                  </div>
                </div>
              ))}



{[1, 2, 3].map(item => (
                <div className="mb-30 mx-auto col-md-12 d-flex flex-wrap align-items-stretch justify-content-between product pointer dim mv4">
                  <dl className="db dib-l w-auto-l lh-title  center">
      
                 
      <dd className="f2 f-headline-l fw6 ml0">3</dd>
      <dd className="f6 fw4 ml0">Options</dd>

    </dl>
                  <div className="ml-30 w-470 pt-10 pb-10 d-flex flex-column justify-content-start inner">
                    <div className="top">
                      <div className="d-flex flex-column-reverse flex-md-row align-items-baseline justify-content-between">
                        <h4 className="f-32 bold">Name of Open Decision</h4>
                        
                      </div>
                      <div class="mt-10 color-heading text-adaptive">
                        A little filler to explain what the decision is about or what the problem is, I'm not sure, something more useful could probably go here.
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}

<div className='w-100 center'>
          <a  class="self-center mt-15 btn action-1 lg border-transparent-white">
            + New Decision
          </a>
        </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Decisions.propTypes = propTypes;
Decisions.defaultProps = defaultProps;




const MeetPropTypes = {};

const MeetDefaultProps = {};

const Meetings = (props) => {
  return (
    <div className="mt-15 mb-30 mb-lg-0 col-lg-3 f-18 medium text-center text-lg-left categories">
            
        
        <div className="color-heading f-14 semibold text-uppercase sp-20 total">
              Upcoming Meetings
            </div>
            {[1,2].map(item =>
              <div className="mv4  d-inline-block d-lg-block category">
                <time className='db'>21st Jul</time>    
              <a  className="link color-heading lh-30 db o-50">
                  This is the name of an upcoming meeting
              </a>
            </div>
             )}



             
             
            <div>
          <a href="#" class=" mt-15 btn action-3 lg border-transparent-white">
            Call A Meeting
          </a>
        </div>

        <div className="mv5 color-heading f-14 semibold text-uppercase sp-20 total">
              Seel All Past Meetings
            </div>
            
            
          </div>
          
  );
}

Decisions.propTypes = MeetPropTypes;
Decisions.defaultProps = MeetDefaultProps;