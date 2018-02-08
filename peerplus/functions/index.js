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
      .then(coll =>
        coll.forEach(doc =>
          admin
            .firestore()
            .doc(`polls/${doc.data().id}`)
            .update({ ended: true })
        )
      )
  );

// exports.checkForExpiredPolls = functions.https.onRequest(
//   (request, response) => {

//     admin
// .firestore()
// .collection(`polls`)
// .where('privacy', '==', 'private')
// .where('endsAt', '<=', new Date())
// .where('ended', '==', false)
// .get()
// .then(
//   coll =>
//     coll.forEach(doc =>
//       admin
//         .firestore()
//         .doc(`polls/${doc.data().id}`)
//         .update({ ended: true })
//     )
// )

//
//   }
// );
