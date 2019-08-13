import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
const propTypes = {};
const defaultProps = {};
const Stats = () => {
  return (
    <header className="bg-light pt-165 pb-95 header_15">
      <Nav />

      <div className="container px-xl-0 text-center">
        <Title />
        <div className="row justify-content-between mt-80 blocks">
          <div className="col-md-4 mt-30">
            <TeamStats
              data={[
                3,
                12,
                13,
                8,
                9,
                10,
                12,
                21,
                19,
                22,
                32,
                46,
                55,
                51,
                71,
                73
              ]}
              title="Github Issues"
              updated="24 March"
              count="73"
            />
          </div>
          <div className="col-md-4 mt-30 relative">
            <div className="d-none d-md-block bg-gray h-110 separate" />
            <div className="d-none d-md-block bg-gray h-110 separate" />

            <TeamStats
              data={[0, 2]}
              title="Email Subscribers"
              updated="24 March"
              count="2"
            />
          </div>
          <div className="col-md-4 mt-30">
            <TeamStats
              data={[0, 2, 15, 67]}
              title="Active Users"
              updated="24 March"
              count="67"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
Stats.propTypes = propTypes;
Stats.defaultProps = defaultProps;

export default Stats;

export const TeamStats = ({ data, title, updated, count }) => (
  <section className="w-100 tc center" data-name="slab-stat-small">
    <dl className="db dib-l w-auto-l lh-title mr6-l">
      <Sparklines data={data}>
        <SparklinesLine style={{ fill: "none" }} />
      </Sparklines>
      <dd className="f6 fw4 ml0">{title}</dd>
      <dd className="f7 fw4 ml0 o-30">Last updated {updated}</dd>
      <dd className="f2 f-subheadline-l fw6 ml0">{count}</dd>
    </dl>
  </section>
);

const Nav = ({}) => {
  return (
    <nav className="header_menu_15 pt-35 pb-30">
      <div className="container px-xl-0">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="row justify-content-between align-items-baseline">
              <div className="col-xl-3 logo">Decisionboard</div>
              <div className="col-xl-6 d-flex justify-content-center align-items-baseline medium">
                <a href="#" className="mx-15 link color-heading  ">
                  Our Project
                </a>
                <a href="#" className="mx-15 link color-heading o-50">
                  Rubbish Project
                </a>
                <a href="#" className="mx-15 link color-heading o-50">
                  Suzies
                </a>
                <a href="#" className="mx-15 link color-heading o-50">
                  + New
                </a>
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

function Title({}) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="mb-3 logo d-block d-xl-none logo_mobile">Startup 3</div>
        <h1 className="mb-25">Our Project</h1>
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
  );
}
