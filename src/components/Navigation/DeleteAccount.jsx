import React from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from 'recompose';

export const DeleteAccount = ({ handleCloseDeleteModal, user }) => (
  <article className="vh-100 dt w-100 bg-red">
    <div className="dtc v-mid tc white ph3 ph4-l">
      <h1 className="f6 f2-m f-subheadline-l fw6 tc">Delete your account?</h1>

      <DeleteButton user={user} handleCloseDeleteModal={handleCloseDeleteModal} />
      <button className="seethrough white" onClick={() => handleCloseDeleteModal()}>
        Cancel
      </button>
    </div>
  </article>
);

const DeleteButton = withState('message', 'setMessage', '')(
  withState('confirmVisible', 'setConfirmVisible', false)(
    withRouter(
      ({
        text,
        confirmVisible,
        setConfirmVisible,
        user,
        message,
        setMessage,
        history,
        handleCloseDeleteModal,
      }) =>
        confirmVisible ? (
          <div>
            <p className="white">Are you Sure?</p>
            <button
              data-test="delete"
              className="seethrough pointer white"
              onClick={() =>
                user
                  .delete()
                  .then(history.push('/'))
                  .then(() => handleCloseDeleteModal())
                  .catch(error => setMessage(error.message))
              }
            >
              {message ? (
                <p className="white">{message}</p>
              ) : (
                <p className="white">Yes, I'm Sure.</p>
              )}
            </button>
          </div>
        ) : (
          <button
            data-test="delete"
            className="seethrough pointer pt3 dim white"
            onClick={() => setConfirmVisible(true)}
          >
            Yes, Delete My Account
          </button>
        ),
    ),
  ),
);
