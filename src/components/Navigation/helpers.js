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

export const clearAllNotifications = (polls, userId) =>
  polls.map(
    poll => (poll.ended ? markResultsAsSeen(poll.id, userId) : markResultsAsSeen(poll.id, userId)),
  );
