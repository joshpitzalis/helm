import React from 'react';
import { Timeline, Popover } from 'antd';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { objectiveType } from '../../propTypes';

export const propTypes = {
  objectives: objectiveType,
};
export const defaultProps = {};

const TopTimeline = ({ objectives }) => (
  <div className="h5  ">
    <div
      className="pa3 rotate90 relative overflow-scroll"
      style={{
        bottom: '22rem',
        right: '30rem',
        height: '150vh',
      }}
    >
      <Timeline
        mode="alternate"
        style={{
          fontSize: '16px',
        }}
      >
        {objectives &&
          objectives
            .sort((a, b) => {
              const last = b.complete
                ? b.completedOn.seconds
                : b.createdOn.seconds;
              const first = a.complete
                ? a.completedOn.seconds
                : a.createdOn.seconds;
              return last - first;
            })
            .map(item => (
              <Timeline.Item
                key={item.id}
                className="w5"
                color={item.complete ? 'green' : 'gray'}
                position={item.complete ? 'left' : 'right'}
              >
                <Popover
                  title={
                    item.complete
                      ? `Completed on ${format(
                          fromUnixTime(item.completedOn.seconds),
                          'PPP'
                        )}`
                      : `Created on ${format(
                          fromUnixTime(item.createdOn.seconds),
                          'PPP'
                        )}`
                  }
                  content={
                    <div>
                      <p className="b">{item.title}</p>
                      <p>
                        {item.count} {item.description}
                      </p>
                      <img
                        src={item.lead.photo}
                        className="br-100 h3 w3 dib ba bw2 b--white"
                        alt={item.lead.uid}
                      />
                    </div>
                  }
                >
                  <span className="white o-90">{item.title}</span>
                </Popover>
              </Timeline.Item>
            ))}
      </Timeline>
    </div>
  </div>
);

export default TopTimeline;

TopTimeline.propTypes = propTypes;
TopTimeline.defaultProps = defaultProps;
