import { db } from '../../constants/firebase';

export const markNotificationAsSeen = (pollId, userId) => {
  db.doc(`polls/${pollId}`).set(
    {
      seenBy: { [userId]: true },
    },
    { merge: true },
  );
};

export const markResultsAsSeen = (pollId, userId) => {
  db.doc(`polls/${pollId}`).update({
    seenBy: { [userId]: false },
  });
};
