/* eslint-disable */
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';
import React, { useState } from 'react';
import { Avatar } from 'antd';

export const AddUpdates = ({ user, updates, dispatch, type }) => {
  const [email, setEmail] = useState('');

  const addUpdate = email => {
    dispatch({
      type: 'UPDATE_ADDED',
      payload: email,
    });
    setEmail('');
  };

  // updates: []
  // const removeEmail = _email => {
  //   const fileteredTeam = people.filter(email => email !== _email);
  //   setPeople(fileteredTeam);
  // };
  return (
    <div className="mb4">
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
        onClick={() => addUpdate(email)}
      >
        Add Update
      </button>

      <ul className="col-auto text-left color-heading mt5 w5">
        {updates &&
          updates.map(update => (
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
                    {update &&
                      update.date &&
                      update.date.seconds &&
                      formatDistanceToNow(fromUnixTime(update.date.seconds), {
                        addSuffix: true,
                      })}
                  </time>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
