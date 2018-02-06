import { db } from "../../constants/firebase";

export const markAsSeen = (pollId, userId) => {
  console.log("begin", pollId);
  db.doc(`polls/${pollId}`).set(
    {
      seenBy: { [userId]: true }
    },
    { merge: true }
  );
  console.log("done");
};
