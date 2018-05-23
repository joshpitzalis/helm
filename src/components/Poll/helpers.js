import { db } from '../../constants/firebase';

export const getProfilePicture = userId =>
  db
    .doc(`users/${userId}`)
    .get()
    .then(user => user.data().photo)
    .catch(error => error);

export const fetchResponseData = pollId =>
  db
    .doc(`polls/${pollId}`)
    .get()
    .then(poll => poll.exists && poll.data())
    .catch(error => error);

export const updatePoll = (pollId, poll) =>
  db
    .doc(`polls/${pollId}`)
    .update(poll)
    .catch(error => error);
