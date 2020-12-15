/* eslint-disable */

import React, { useState, useEffect, useReducer } from 'react';
import produce from 'immer';
import {
  Input,
  Timeline,
  Popover,
  DatePicker,
  Radio,
  Checkbox,
  Modal,
} from 'antd';
import PropTypes from 'prop-types';
import { toast$ } from '../toast/toast.jsx';
import firebase from '../../utils/firebase';
import { ModalFooter } from './ModalFooter';
import { AddUpdates } from './AddUpdates';
var moment = require('moment');

export const propTypes = {};
export const defaultProps = {};


export const ObjectiveModal = ({ projectId, setVisibility, visible, user, objective, setObjective, group }) => {

  const [confirm, setConfirm] = useState(false);

  const closeAndClear = () => {
    setObjective({})
    dispatch({ type: 'CLEARED' })
    setVisibility(false);
    setConfirm(false);
  }

  const onDelete = _docId =>
    firebase
      .firestore()
      .collection(`projects/${projectId}/objectives`)
      .doc(objective.id)
      .delete()
      .then(() => closeAndClear())
      .catch(error => {
        closeAndClear();
        const message = error.message || error;
        toast$.next({
          type: 'ERROR',
          message,
        });
      });

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
    completedOn: new Date(),
    description: '',
    complete: false,
    count: 0,
    countHistory: [{ count: 0, date: new Date() }],
    updates: [{
      uid: user.uid,
      photo: user.photoURL,
      date: new Date(),
      update: 'Objective created.'
    }]
  }

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

          if (payload){
          draft.complete = payload;
          draft.completedOn = new Date();
          draft.updates = [{
            uid: user.uid,
            photo: user.photoURL,
            date: new Date(),
            update: `Objective Achieved.`
          }, ...draft.updates];
        }
        });

      case 'UPDATE_ADDED':
        return produce(_state, draft => {
          draft.count = payload
          draft.countHistory = [{ count: payload, date: new Date() }, ...draft.countHistory],
            draft.updates = [{
              uid: user.uid,
              photo: user.photoURL,
              date: new Date(),
              update: _state.type === 'metric' ? `Value updated to ${payload}` : payload
            }, ...draft.updates];
        });

      case 'CLEARED':
        return _state = initialState;

      case 'HYDRATED':
        return _state = payload
        case 'GROUPED':
          return produce(_state, draft => {
            draft.group = payload
            
          });
      default:
        return 'Error';
    }
  };
  

  useEffect(() => {
    if (Object.keys(objective).length){
    dispatch({ type: 'HYDRATED', payload: objective })
    return
  }
  
  if (group){
    dispatch({ type: 'GROUPED', payload: group })
    return
  }
}, [objective])

  const [state, dispatch] = useReducer(curriedReducer, initialState);

  const newProject = firebase
    .firestore()
    .collection('projects').doc(projectId).collection('objectives')
    .doc();

  const docId = Object.keys(objective).length > 0 ? objective.id : newProject.id;

  const onSubmit = e => {
    e.preventDefault();

    firebase
      .firestore()
      .collection(`projects/${projectId}/objectives`)
      .doc(docId)
      .set({
        id: docId,
        ...state

      })
      .then(() =>

        closeAndClear()
      )
      .catch(error => {
        const message = error.message || error;
        toast$.next({
          type: 'ERROR',
          message,
        });
        closeAndClear()
      });
  };


  return (
    <Modal
      title={state.title || 'Create Objective'}
      visible={visible}
      onCancel={() =>


        closeAndClear()
      }
      footer={[
        <ModalFooter
          docId={docId} confirm={confirm} onDelete={onDelete} objective={objective} setConfirm={setConfirm} closeAndClear={closeAndClear} onSubmit={onSubmit} />,
      ]}
    >
      <form
        data-testid="objectiveModal"
        onSubmit={e => onSubmit(e)}
        className="bg-light mx-auto mw-430 radius10 pt-40 px-50 pb-30 flex flex-column items-center"
      >
        <img
          src={state && state.lead && state.lead.photo || user.photoURL}
          className="br-100 h3 w3 dib ba bw2 b--white"
          alt={state && state.lead && state.lead.uid || user.uid}
        />

        {
          Object.keys(objective).length > 0 && <AddUpdates user={user} updates={state.updates} dispatch={dispatch}
            type={state.type} />}

        <div className="mb-20 input_holder">
          <input
            type="name"
            name="name"
            data-testid="objectiveNameInput"
            placeholder="Name your Metric"
            value={state.title}
            onChange={e => dispatch({ type: 'UPDATED_TITLE', payload: e.target.value })}
            className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
          />
        </div>

       

     
          <Input.TextArea
            rows={2}
            size="large"
            value={state.description}
            data-testid="objectiveDescriptionInput"
            placeholder='Name the things you will be tracking (in plural).'
            onChange={e => dispatch({ type: 'UPDATED_DESCRIPTION', payload: e.target.value })}
          />

        {/* <div className="mt4 mb4 ">
          <DatePicker onChange={e =>
            dispatch({ type: 'UPDATED_DEADLINE', payload: e._d })}
            placeholder="deadline"
            defaultValue={
              state.deadline && moment(state.deadline.milliseconds)}
          />
        </div> */}
        {
          Object.keys(objective).length > 0 &&
          <span className="mt4">
            <Checkbox
              data-testid="objectiveCompleteCheckbox"
              onChange={(e) =>
                dispatch({ type: 'TOGGLED_COMPLETE', payload: e.target.checked })
              }
              checked={state.complete}
            >This objective is now complete</Checkbox>
          </span>}
      </form>
    </Modal>
  );
};

export default ObjectiveModal;

ObjectiveModal.propTypes = propTypes;
ObjectiveModal.defaultProps = defaultProps;


