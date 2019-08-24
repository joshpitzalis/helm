import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { objectiveType } from '../../propTypes';

const propTypes = {
  setVisibility: PropTypes.func.isRequired,
  objective: objectiveType,
  setObjective: PropTypes.func.isRequired,
};

const defaultProps = {};

const ObjectiveBox = ({ setVisibility, objective, setObjective }) => {
  const {
    lead,
    title,
    count,
    updates,
    id,
    deadline,
    description,
    countHistory,
    type,
  } = objective;

  return (
    <div
      data-testid={title}
      key={id}
      className="flex flex-column col-lg-4"
      onClick={() => {
        setObjective(objective);
        setVisibility(true);
      }}
      onKeyDown={() => {
        setObjective(objective);
        setVisibility(true);
      }}
      tabIndex={-1}
      role="button"
    >
      <div
        className=" d-flex align-items-between order-0 order-lg-0"
        data-aos-duration="600"
        data-aos="fade-down"
        data-aos-delay="0"
      >
        <div className="mw-370 w-full mx-auto radius10 pt-35 pb-40 block">
          <div className=" f-14 semibold text-uppercase sp-20 title">
            <Avatar src={lead.photo} size="large" />
          </div>

          {type === 'milestone' ? (
            <div className="inner mv5">
              <div className="mb-20 f-14 semibold text-uppercase sp-20 title">
                {title}
              </div>
              <div className="color-heading op-7 text-adaptive f6 h3 overflow-hidden">
                {description}
              </div>
            </div>
          ) : (
            <Counter
              countHistory={countHistory}
              count={count}
              description={description}
            />
          )}
          {deadline && deadline.seconds && (
            <>
              <div className=" f-14 semibold text-uppercase sp-20 title">
                {formatDistanceToNow(fromUnixTime(deadline.seconds), {
                  addSuffix: true,
                })}
              </div>
              <time className="f7 fw4 mb4 o-30">
                {`Ends on ${format(fromUnixTime(deadline.seconds), 'PPP')}
                `}
              </time>
            </>
          )}
        </div>
      </div>

      <div
        className="mt-35 mb-70 mb-lg-0  order-1 order-lg-0"
        data-aos-duration="600"
        data-aos="fade-down"
        data-aos-delay="0"
      >
        <div className="row justify-content-center">
          <div className="col-auto text-left color-heading">
            <ul className="px-0">
              <li className="mb4">
                <div>
                  <p className="dib strike mb0">{updates[0].update} </p>
                  <div className="mt0 pt0">
                    <Avatar
                      src={updates[0].photo}
                      size="small"
                      className="mr3 dib mb0"
                    />{' '}
                    <time className="f7 fw4 mb4 o-30">
                      {updates[0].date &&
                        formatDistanceToNow(
                          fromUnixTime(updates[0].date.seconds),
                          {
                            addSuffix: true,
                          }
                        )}
                    </time>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* <div className="col-12">
						<a href="#" className="mt-15 btn border-gray color-main">Add an update</a>
					</div> */}
        </div>
      </div>
    </div>
  );
};

export default ObjectiveBox;

ObjectiveBox.propTypes = propTypes;
ObjectiveBox.defaultProps = defaultProps;

const counterPropTypes = {
  countHistory: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      count: PropTypes.number.isRequired,
    })
  ),
  count: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
function Counter({ countHistory, count, description }) {
  const long = count && count.length > 2;

  if (long) {
    return (
      <div
        className="pb1 tc flex flex-column justify-content-center align-items-center w-100"
        style={{
          all: 'unset',
        }}
      >
        <Sparklines
          data={
            countHistory &&
            countHistory
              .sort((a, b) => a.date.seconds - b.date.seconds)
              .map(item => item.count)
          }
        >
          <SparklinesLine
            style={{
              fill: 'none',
            }}
          />
        </Sparklines>
        <div
          style={{
            all: 'unset',
          }}
        >
          <p className="f2 center f-subheadline-l fw6 w-100">{count}</p>
          <div className="w-100 center relative top--2 bottom-2">
            {description}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="f-58 relative flex-shrink-0 price">
        <section className="w-100 tc center" data-name="slab-stat-small">
          <div className="db dib-l w-auto-l  mt3">
            <Sparklines
              data={
                countHistory &&
                countHistory
                  .sort((a, b) => a.date.seconds - b.date.seconds)
                  .map(item => item.count)
              }
            >
              <SparklinesLine
                style={{
                  fill: 'none',
                }}
              />
            </Sparklines>
            <p className="f2 f-subheadline-l fw6 ml0">{count}</p>
          </div>
        </section>
      </div>

      <div className="ml-15 text-left w4">{description}</div>
    </div>
  );
}

Counter.propTypes = counterPropTypes;
Counter.defaultProps = {};
