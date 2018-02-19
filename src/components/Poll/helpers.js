import { db } from '../../constants/firebase';

export const getProfilePicture = userId =>
  db
    .doc(`users/${userId}`)
    .get()
    .then(user => user.data().photo)
    .catch(error => console.error(error));
