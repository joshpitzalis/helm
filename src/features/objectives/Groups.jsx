import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import fromUnixTime from 'date-fns/fromUnixTime';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { toast$ } from '../toast/toast.jsx';
import firebase from '../../utils/firebase';
import { ObjectiveModal } from './ObjectiveModal';
import { objectiveType } from '../../propTypes';

const propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  objectives: objectiveType,
};

const defaultProps = {};

const Groups = ({ user, id, name, projectId, objectives }) => {
  const deleteGroup = () =>
    firebase
      .firestore()
      .collection(`projects`)
      .doc(projectId)
      .set(
        {
          groups: firebase.firestore.FieldValue.arrayRemove({
            id,
            name,
          }),
        },
        { merge: true }
      )

      .catch(error => {
        const message = error.message || error;
        toast$.next({
          type: 'ERROR',
          message,
        });
      });

  const [visible, setVisibility] = useState(false);
  const [objective, setObjective] = useState({});
  return (
    <section className="feature_8 bg-light pt-105 pb-30">
      <div className="container px-xl-0">
        <h2
          className="mb-50 small text-lg-center"
          data-aos-duration="600"
          data-aos="fade-down"
          data-aos-delay="0"
        >
          <span
            tabIndex={-1}
            onKeyDown={() => deleteGroup()}
            onDoubleClick={() => deleteGroup()}
            role="button"
          >
            {name}
          </span>
        </h2>

        <ObjectiveModal
          projectId={projectId}
          user={user}
          visible={visible}
          setVisibility={setVisibility}
          setObjective={setObjective}
          objective={objective}
          group={id}
        />

        <div className="row flex justify-around">
          {objectives &&
            objectives.map(_objective => (
              <SubObjectives
                objective={_objective}
                setObjective={setObjective}
                setVisibility={setVisibility}
              />
            ))}

          <button
            type="button"
            className="link mb-40 col-md-6 col-lg-4 d-flex align-items-center justify-center pointer"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="300"
            onClick={() => setVisibility(true)}
          >
            <div className="mb-20 f-14 semibold text-uppercase sp-20 title underline">
              + Add an Objective
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Groups;

Groups.propTypes = propTypes;
Groups.defaultProps = defaultProps;

const SubObjectives = ({ objective, setObjective, setVisibility }) => {
  const { type, lead, title, count, description, updates, id } = objective;
  if (type === 'metric') {
    return (
      <div
        data-testid={title}
        key={id}
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
        className="pointer grow mb-40 col-md-6 col-lg-4 d-flex align-items-baseline"
        data-aos-duration="600"
        data-aos="fade-down"
        data-aos-delay="600"
      >
        <div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
          <Avatar src={lead.photo} size="large" />{' '}
        </div>
        <div className="inner">
          <div className="mb-20 f-14 semibold text-uppercase sp-20 title">
            {title}
          </div>

          <div className="  op-7 text-adaptive flex mt4 pt3 ">
            <p className="f2 f-subheadline-l fw6">{count}</p>
            <div className="ml3">
              <Sparklines data={[1, 2, 3]}>
                <SparklinesLine
                  style={{
                    fill: 'none',
                  }}
                />
              </Sparklines>
              <p>{description}</p>
            </div>
          </div>
          <ul className="px-0 color-heading mt4">
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
      </div>
    );
  }

  if (type === 'milestone') {
    return (
      <div
        data-testid={title}
        key={id}
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
        className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline"
        data-aos-duration="600"
        data-aos="fade-down"
        data-aos-delay="300"
      >
        <div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
          <Avatar src={lead.photo} size="large" />{' '}
        </div>
        <div className="inner">
          <div className="mb-20 f-14 semibold text-uppercase sp-20 title">
            {title}
          </div>
          <div className="color-heading op-7 text-adaptive">{description}</div>

          <ul className="px-0 color-heading mt4">
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
      </div>
    );
  }
};
