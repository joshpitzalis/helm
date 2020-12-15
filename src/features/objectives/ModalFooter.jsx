/* eslint-disable */
import React from 'react';
import { Icon } from 'antd';

export const ModalFooter = ({
  docId,
  confirm,
  onDelete,
  objective,
  setConfirm,
  closeAndClear,
  e,
  onSubmit,
}) => (
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
  </span>
);
