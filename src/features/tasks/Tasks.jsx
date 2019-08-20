import { CheckBox } from 'grommet';
import React from 'react';

const propTypes = {};

const defaultProps = {};

export default function Tasks(props) {
  return (
    <section className="pricing_table_4 pt-105 pb-100 color-white">
      <div className="container px-xl-0">
        <div className="row justify-content-center text-center">
          <div className="col-xl-8 col-lg-10 mb5">
            <h2 className="small light-blue">6 Stale Tasks</h2>
          </div>
          {/* <div class="col-xl-6 col-lg-8 col-md-10">
            <div class="mt-25 mb-55 f-22 text-adaptive">
              Startup Framework is free forever — you only pay for custom domain
              hosting or to export your site.
            </div>
          </div> */}
        </div>
        <div className="row justify-content-center">
          {[1, 2, 3].map(item => (
            <TaskList key={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

Tasks.propTypes = propTypes;
Tasks.defaultProps = defaultProps;

function TaskList() {
  return (
    <div className="mb-70 mb-lg-0 col-lg-4 col-md-7 col-sm-8">
      <div className="mx-auto mw-370 px-50 pt-60 pb-55 radius10 block">
        <div className="f-22 title mb4">Thing List</div>
        {/* <div class="mt-30 mb-40 f-58 d-flex align-items-start price">
       <b>9.99</b>
       <div class="mt-1 ml-5 f-16">$</div>
      </div> */}
        <ul className="px-0">
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked
              label={<span className="strike">thing one</span>}
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label="thing two"
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label="thing three"
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label={<span className=" light-blue">thing four</span>}
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label="thing five"
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              onChange={() => {}}
              label={<span className=" light-blue">thing six</span>}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label="thing seven"
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label="thing eight"
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label={<span className=" light-blue">thing nine</span>}
              onChange={() => {}}
            />
          </li>
          <li className="mv3 disabled">
            <CheckBox
              className="rf-checkmark"
              checked={false}
              label="thing ten"
              onChange={() => {}}
            />
          </li>
        </ul>
        <div>
          <a href="#" className="mt-15 btn lg border-transparent-white">
            Add a to-do
          </a>
        </div>
      </div>
    </div>
  );
}
