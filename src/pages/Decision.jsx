import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function Decision() {
  const [option, setOption] = React.useState(false);
  return (
    <>
      <div className="container mt6">
        {/* <div class="mb-3 logo d-block d-xl-none text-center logo_mobile">Name of the Decision</div> */}
        <h1
          className="big text-center"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="0"
        >
          Name of the Decision
        </h1>
        <div
          className="mw-600 mx-auto mt-30 f-22 color-heading text-center text-adaptive"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          Maybe a little explanation to put it into context and explain why we
          are bothering with all this.
        </div>
        <div
          className="mt-80 text-center buttons"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="600"
        >
          <div>
            <a href="#" className="btn lg action-1">
              Set a deadline
            </a>
          </div>
          <div>
            <a href="#" className="mt-15 link action-1 f-18 medium">
              This vote has no deadline yet.
            </a>
          </div>
        </div>
      </div>

      <section className="content_32 bg-light pt-85">
        <div className="container px-xl-0">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h2
                className="mb-10 small text-center text-lg-left"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                Options
              </h2>
              <div className="row justify-content-between no-gutters">
                <div className="col-lg-7 f-16 left">
                  <div className="row justify-content-center no-gutters">
                    {/* <div class="col-sm-2 col-10 column text-center text-sm-right" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
								<div class="cell bordered px-0 f-14 color-heading text-uppercase semibold sp-20">Prepay Amount</div>
																<div class="cell bordered">+1</div>
																<div class="cell bordered">+1</div>
																<div class="cell bordered">+1</div>
																<div class="cell bordered">+1</div>
																<div class="cell">+1</div>
															</div> */}
                    <div
                      className="col-sm-12 col-12 column text-center text-sm-left"
                      data-aos-duration="600"
                      data-aos="fade-down"
                      data-aos-delay="300"
                    >
                      <div className="cell bordered px-0 f-14 color-heading text-uppercase semibold sp-20">
                        Click on an option to reveal it's pros and cons.
                      </div>
                      <div
                        className="cell bordered flex items-center pointer"
                        onClick={() => setOption('Something')}
                        onKeyDown={() => setOption('Something')}
                        role="button"
                        tabIndex={-1}
                      >
                        <a className=" mr3 btn sm action-1">+1</a> Something
                      </div>
                      <div
                        className="cell bordered flex items-center pointer"
                        onClick={() => setOption('Thingsmajig')}
                        onKeyDown={() => setOption('Something')}
                        role="button"
                        tabIndex={-1}
                      >
                        {' '}
                        <a className=" mr3 btn sm action-1">+1</a>Thingsmajig
                      </div>
                      <div
                        className="cell bordered flex items-center pointer"
                        onClick={() => setOption('Another option')}
                        onKeyDown={() => setOption('Something')}
                        role="button"
                        tabIndex={-1}
                      >
                        <a className=" mr3 btn sm action-1">+1</a> Another
                        option
                      </div>
                      <div
                        className="cell bordered flex items-center pointer"
                        onClick={() => setOption('This is silly')}
                        onKeyDown={() => setOption('Something')}
                        role="button"
                        tabIndex={-1}
                      >
                        <a className=" mr3 btn sm action-1">+1</a> This is silly
                      </div>
                      <div
                        className="cell flex items-center pointer"
                        onClick={() => setOption('Last option')}
                        onKeyDown={() => setOption('Something')}
                        role="button"
                        tabIndex={-1}
                      >
                        {' '}
                        <a className=" mr3 btn sm action-1">+1</a> Last option
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 d-flex justify-content-center justify-content-lg-end text-center text-lg-left"
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="900"
                >
                  <div className="mt-65 mw-270 px-35 pt-35 pb-35 radius6 right">
                    <div className="f-22">Have a better idea?</div>
                    <div className="mt-10 f-18 medium color-heading text-adaptive">
                      Click here to make the panel editable and add an option to
                      the list.{' '}
                    </div>
                    <a className="mt-35 btn sm action-1">Add An Option</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {option && (
        <section className="content_19 bg-light pt-105 pb-90">
          <div className="container px-xl-0">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-11">
                <h2
                  className="small text-left text-lg-center"
                  data-aos-duration="600"
                  data-aos="fade-down"
                  data-aos-delay="0"
                >
                  {option}
                </h2>
                <div className="row justify-content-center justify-content-lg-between">
                  <div
                    className="col-lg-6 mt-45 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="f-heading medium f-18 title green">
                      This is a pro
                    </div>
                    <div className="mt-10 color-heading text-adaptive ">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.{' '}
                    </div>
                  </div>
                  <div
                    className="col-lg-6 mt-45 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="f-heading medium f-18 title red">
                      This is a con
                    </div>
                    <div className="mt-10 color-heading text-adaptive">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.{' '}
                    </div>
                  </div>
                  <div
                    className="col-lg-6 mt-45 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="f-heading medium f-18 title green">
                      This is a pro
                    </div>
                    <div className="mt-10 color-heading text-adaptive">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.{' '}
                    </div>
                  </div>
                  <div
                    className="col-lg-6 mt-45 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="f-heading medium f-18 title red">
                      This is a con
                    </div>
                    <div className="mt-10 color-heading text-adaptive">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.{' '}
                    </div>
                  </div>
                  <div
                    className="col-lg-6 mt-45 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="f-heading medium f-18 title green">
                      This is a pro
                    </div>
                    <div className="mt-10 color-heading text-adaptive">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.{' '}
                    </div>
                    <a className="mt-35 btn sm action-1 db">Add A Pro</a>
                  </div>
                  <div
                    className="col-lg-6 mt-45 block"
                    data-aos-duration="600"
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    <div className="f-heading medium f-18 title red">
                      This is a con
                    </div>
                    <div className="mt-10 color-heading text-adaptive">
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.{' '}
                    </div>

                    <a className="mt-35 btn sm action-3 db">Add A Con</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="content_11 bg-light pt-100 pb-100">
        <div className="container px-xl-0">
          <div
            className="row"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <div className="col-lg-1"></div>
            <div className="mb-20 col-lg-9 f-22 text-adaptive">
              This is a editable rich text box for the entire decision.{' '}
            </div>
          </div>
          <div
            className="row"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <div className="col-lg-1"></div>
            <div className="col-lg-8 color-heading op-7 text-adaptive">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Decision.propTypes = propTypes;
Decision.defaultProps = defaultProps;
