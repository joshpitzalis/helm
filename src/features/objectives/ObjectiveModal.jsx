/* eslint-disable */
import { format } from 'date-fns';
import React, { useState, useEffect, useReducer } from 'react';
import { Redirect, Link } from 'react-router-dom';
import produce from 'immer';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {
  Input,
  Timeline,
  Icon,
  Popover,
  DatePicker,
  Radio,
  Checkbox,
  Modal,
  Avatar,
} from 'antd';
import PropTypes from 'prop-types';
import { toast$ } from '../toast/toast.jsx';
import firebase from '../../utils/firebase';

export const propTypes = {};
export const defaultProps = {};

export const ObjectiveModal = ({ projectId, setVisibility, visible, user, projects }) => {

  const project = projects && projects.find(item => item.id === projectId);


  const [name, setName] = useState('');
  const [people, setPeople] = useState([user.email]);

  useEffect(
    () =>
      project &&
      project.team &&
      setPeople(Array.from(new Set([user.email, ...project.team]))),
    [project, user.email]
  );

  const [confirm, setConfirm] = useState(false);



  const onDelete = _docId =>
    firebase
      .firestore()
      .collection('projects')
      .doc(_docId)
      .delete()
      .then(() => setVisibility(false))
      .catch(error => {
        setVisibility(false);
        const message = error.message || error;
        toast$.next({
          type: 'ERROR',
          message,
        });
      });

  const curriedReducer = (_state, action) => {
    const { type, payload } = action;

    // refactor to remove produce from every case https://www.youtube.com/watch?v=PjsGz6sNG3g&t=461s
    switch (type) {
      case 'UPDATED_TITLE':
        return produce(_state, draft => {
          draft.title = payload;
        });

      case 'UPDATED_TYPE':
        return produce(_state, draft => {
          draft.type = payload;
        });


      case 'UPDATED_DEADLINE':
        return produce(_state, draft => {
          draft.deadline = payload;
        });



      case 'UPDATED_DESCRIPTION':
        return produce(_state, draft => {
          draft.description = payload;
        });

      case 'TOGGLED_COMPLETE':
        return produce(_state, draft => {
          draft.complete = payload;
        });
      default:
        return 'Error';
    }


  };

  const initialState = {
    group: 'primary',
    title: '',
    lead: {
      uid: user.uid,
      photo: user.photoURL,
    },
    type: 'metric',
    deadline: new Date(),
    createdOn: new Date(),
    description: '',
    complete: false,
    count: 0,
    countHistory: [{count: 0, date: new Date()}],
    updates:  [{
      uid: user.uid,
      photo: user.photoURL,
      date: new Date(),
      update: 'Objective created.'
    }]
  };
  const [state, dispatch] = useReducer(curriedReducer, initialState);


  const onSubmit = e => {
    e.preventDefault();
    const newProject = firebase
      .firestore()
      .collection('projects').doc(projectId).collection('objectives')
      .doc();
    // const docId = project ? project.id : newProject.id;
    const docId = newProject.id;

    firebase
      .firestore()
      // .collection('projects').doc(projectId).collection('objectives')
      .collection(`projects/${projectId}/objectives`)
      .doc(docId)
      .set({
        id: docId,
        ...state
      })
      .then(() =>
        setVisibility(false)
      )
      .catch(error => {

        const message = error.message || error;

        console.log({ message });

        toast$.next({
          type: 'ERROR',
          message,
        });
        setVisibility(false)
      });
  };
  return (
    <Modal
      title={state.title || 'Create Objective'}
      visible={visible}
      onCancel={() => {
        setVisibility(false);
        setConfirm(false);
      }}
      footer={[
        <span
          className={`flex items-center  h-100 ${
            project ? 'justify-between' : 'justify-around'
            }`}
        >
          {confirm ? (
            <div className="flex items-center justify-around">
              <button
                type="submit"
                className=" btn action-3 "
                onClick={() => onDelete(project.id)}
              >
                Confirm Delete
              </button>
              <button
                type="submit"
                className="link action-2 mr3"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
              <>
                {project && (
                  <Icon
                    type="delete"
                    data-testid="deleteProject"
                    style={{
                      color: 'red',
                    }}
                    onClick={() => setConfirm(true)}
                  />
                )}
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="link  action-3 mr3"
                    onClick={() => {
                      setVisibility(false);
                      setConfirm(false);
                    }}
                  >
                    Cancel
                </button>
                  <button
                    type="submit"
                    className=" btn action-1 "
                    onClick={e => onSubmit(e)}
                  >
                    Save
                </button>
                </div>
              </>
            )}
        </span>,
      ]}
    >
      <form
        data-testid="objectiveModal"
        onSubmit={e => onSubmit(e)}
        className="bg-light mx-auto mw-430 radius10 pt-40 px-50 pb-30 flex flex-column items-center"
      >
        <img
          src={state.lead.photo}
          className="br-100 h3 w3 dib ba bw2 b--white"
          alt={state.lead.uid}
        />

        <div className="mb-20 input_holder">
          <input
            type="name"
            name="name"
            data-testid="projectNameInput"
            placeholder="Name your objective"
            value={state.title}
            onChange={e => dispatch({ type: 'UPDATED_TITLE', payload: e.target.value })}
            className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
          />
        </div>

        <div className="bt b--light-gray mb4">
          <Radio.Group
            value={state.type}
            onChange={(e) => dispatch({ type: 'UPDATED_TYPE', payload: e.target.value })}>
            <Radio.Button value="milestone">Achieve Something</Radio.Button>
            <Radio.Button value="metric">Track An Amount</Radio.Button>
          </Radio.Group>
        </div>

        <Input.TextArea
          rows={2}
          size="large"
          placeholder={
            state.type === 'metric' ? 'Name the thing you will be tracking.' : "Describe the final deliverable that you intend to produce."}
          onChange={e => dispatch({ type: 'UPDATED_DESCRIPTION', payload: e.target.value })}
        />

        <div className="mt4 mb4 ">
          <DatePicker onChange={e =>
            dispatch({ type: 'UPDATED_DEADLINE', payload: e._d })}

            placeholder="deadline" size="large" />
        </div>

        {/* <span className="mt4">
          <Checkbox onChange={(e) => 
          dispatch({type: 'TOGGLED_COMPLETE', payload: e.target.checked})
          
      }
          >The objective is now complete</Checkbox>
        </span> */}

        {/* <AddUpdates user={user} people={people} setPeople={setPeople} /> */}
      </form>
    </Modal>
  );
};

export default ObjectiveModal;

ObjectiveModal.propTypes = propTypes;
ObjectiveModal.defaultProps = defaultProps;

export const AddUpdates = ({ user, people, setPeople }) => {
  const [email, setEmail] = useState('');

  const addEmail = _email => {
    setPeople([_email, ...people]);
    setEmail('');
  };

  const removeEmail = _email => {
    const fileteredTeam = people.filter(email => email !== _email);
    setPeople(fileteredTeam);
  };

  return (
    <>
      <h2 className="mt-40 mb-20 small text-center">Add An Update</h2>
      <div className="mb-20 input_holder">
        <input
          type="email"
          name="email"
          placeholder="add email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
        />
      </div>
      <button
        type="button"
        className="link action-1 "
        onClick={() => addEmail(email)}
      >
        Add Update
      </button>

      <ul className="col-auto text-left color-heading mt5 w5">
        <li className="mb4">
          <div>
            <p className="dib strike mb0">mini achievmnet </p>
            <div className="mt0 pt0">
              <Avatar
                src={user.photoURL}
                size="small"
                className="mr3 dib mb0"
              />{' '}
              <time className="f7 fw4 mb4 o-30">2 days ago</time>
            </div>
          </div>
        </li>
      </ul>

      {/* {people.map(person => <div className="mt-25 f-18 medium color-heading text-center" key={person}>
      {person}
      {person !== userEmail &&
      <button type='button' className="link action-3" onClick={() => removeEmail(person)}>
       Remove
      </button>}
      </div>)} */}
    </>
  );
};

