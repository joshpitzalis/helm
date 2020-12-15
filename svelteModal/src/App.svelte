<script>
	let name = "world";
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
		<form class="space-y-6" action="#" method="POST">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">
					Email address
				</label>
				<div class="mt-1">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">
					Password
				</label>
				<div class="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember_me"
						name="remember_me"
						type="checkbox"
						class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
					<label for="remember_me" class="ml-2 block text-sm text-gray-900">
						Remember
						{name}!
					</label>
				</div>

				<div class="text-sm">
					<a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
						Forgot your password?
					</a>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Sign in
				</button>
			</div>
		</form>

		<div class="mt-6">
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300" />
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="px-2 bg-white text-gray-500"> Or continue with </span>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-3 gap-3">
				<div>
					<a
						href="#"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<span class="sr-only">Sign in with Facebook</span>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
								clip-rule="evenodd" />
						</svg>
					</a>
				</div>

				<div>
					<a
						href="#"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<span class="sr-only">Sign in with Twitter</span>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true">
							<path
								d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
						</svg>
					</a>
				</div>

				<div>
					<a
						href="#"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
						<span class="sr-only">Sign in with GitHub</span>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
								clip-rule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- /* eslint-disable */

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';
import React, { useState, useEffect, useReducer } from 'react';
import produce from 'immer';
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
        <span
          key={docId}
          className={`flex items-center h-100 ${
            Object.keys(objective).length > 0 ? 'justify-between' : 'justify-around'
            }`}
        >
          {confirm ? (
            <div className="flex items-center justify-around">
              <button
                type="submit"
                className=" btn action-3 "
                onClick={() => onDelete(objective && objective.id)}
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
                {Object.keys(objective).length > 0 && (
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
                    onClick={() => closeAndClear()}
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
            placeholder="Name your objective"
            value={state.title}
            onChange={e => dispatch({ type: 'UPDATED_TITLE', payload: e.target.value })}
            className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
          />
        </div>

        {
          Object.keys(objective).length === 0 && <div className="bt b--light-gray mb4">
            <Radio.Group
              value={state.type}
              onChange={(e) => dispatch({ type: 'UPDATED_TYPE', payload: e.target.value })}>
              <Radio.Button value="milestone">Achieve Something</Radio.Button>
              <Radio.Button value="metric">Track An Amount</Radio.Button>
            </Radio.Group>
          </div>
        }

     
          <Input.TextArea
            rows={2}
            size="large"
            value={state.description}
            data-testid="objectiveDescriptionInput"
            placeholder={
              state.type === 'metric' ? 'Name the things you will be tracking (in plural).' : "Describe the final deliverable that you intend to produce."}
            onChange={e => dispatch({ type: 'UPDATED_DESCRIPTION', payload: e.target.value })}
          />

        <div className="mt4 mb4 ">
          <DatePicker onChange={e =>
            dispatch({ type: 'UPDATED_DEADLINE', payload: e._d })}
            placeholder="deadline"
            defaultValue={
              state.deadline && moment(state.deadline.milliseconds)}
          />
        </div>
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

export const AddUpdates = ({ user, updates, dispatch, type }) => {
  const [email, setEmail] = useState('');

  const addUpdate = email => {

    dispatch({
      type: 'UPDATE_ADDED', payload:
        email
    })
    setEmail('');
  };


  // updates: []

  // const removeEmail = _email => {
  //   const fileteredTeam = people.filter(email => email !== _email);
  //   setPeople(fileteredTeam);
  // };

  return (
    <div className='mb4'>
      <h2 className="mt-40 mb-20 small text-center">Add An Update</h2>
      <div className="mb-20 input_holder">
        <input
          type={type === 'metric' ? 'number' : 'text'}
          name="update"
          placeholder="add an update here"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
        />
      </div>
      <button
        type="button"
        className="link action-1 "
        onClick={() =>

          addUpdate(email


          )}
      >
        Add Update
      </button>

      <ul className="col-auto text-left color-heading mt5 w5">
        {updates && updates.map(update =>
          <li className="mb4">
            <div>
              <p className="dib strike mb0"> {update.update} </p>
              <div className="mt0 pt0">
                <Avatar
                  src={update.photo}
                  size="small"
                  className="mr3 dib mb0"
                />{' '}
                <time className="f7 fw4 mb4 o-30">
         

                { update && update.date && update.date.seconds &&
               formatDistanceToNow(  fromUnixTime(update.date.seconds) , {
                  addSuffix: true,
                })}


                </time>
              </div>
            </div>
          </li>)}
      </ul>

      {/* {people.map(person => <div className="mt-25 f-18 medium color-heading text-center" key={person}>
      {person}
      {person !== userEmail &&
      <button type='button' className="link action-3" onClick={() => removeEmail(person)}>
       Remove
      </button>}
      </div>)} */}
    </div>
  );
}; -->
