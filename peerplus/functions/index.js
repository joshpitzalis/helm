'use strict';

const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.checkPolls = functions.firestore
  .document('test/trigger')
  .onUpdate(event =>
    admin
      .firestore()
      .collection(`polls`)
      .where('privacy', '==', 'private')
      .where('endsAt', '<=', new Date())
      .where('ended', '==', false)
      .get()
      .then(
        coll =>
          coll.forEach(doc =>
            // console.log(doc.data());
            admin
              .firestore()
              .doc(`polls/${doc.data().id}`)
              .update({ ended: true })
          )

        // mark each poll ended
        // send result to each 'seenBy' in the poll
        // the mark notified then switched seen by to false to not show the results again
      )
  );

// exports.checkForExpiredPolls = functions.https.onRequest(
//   (request, response) => {
//     const pollsToShareResultsFor = admin
//       .firestore()
//       .collection(`polls`)
//       .where('privacy', '==', 'private')
//       .where('endsAt', '<=', Date.now())
//       .where('ended', '==', false)
//       .get()
//       .then(coll => coll.docs.map(doc => doc.data())
//       //   {
//       //   const polls = coll.docs.map(doc => doc.data());
//       //   console.log(polls);
//       //   return polls;
//       // }
//     ).then(res => console.log(res);
//       )

//
//   }
// );
