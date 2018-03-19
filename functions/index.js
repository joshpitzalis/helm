'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.newMessageAlert = functions.firestore
  .document('polls/{newPoll}')
  .onCreate(event => {
    const message = event.data.data();
    const recipients = message.sendTo.map(recipient => recipient.id);
    console.log('recipients', recipients);
    console.log('message', message);

    const getTokens = admin
      .database()
      .ref('users')
      .once('value')
      .then(snap => {
        const tokens = [];
        snap.forEach(user => {
          const peeps = user.val();
          console.log('peeps', peeps);
          if (recipients.includes(peeps.id)) tokens.push(peeps.token);
        });
        console.log('tokens', tokens);
        return tokens;
      });

    const getAuthor = admin
      .firestore()
      .doc(`users/${message.createdBy}`)
      .get()
      .then(doc => doc.data().uid)
      .then(uid => admin.auth().getUser(uid));

    Promise.all([getTokens, getAuthor])
      .then(([tokens, author]) => {
        console.log('tokens', tokens);
        console.log('author', author);

        const payload = {
          notification: {
            title: 'New Poll Request',
            content: message.title,
            icon: author.photoURL,
            id: message.id
          }
        };
        admin
          .messaging()
          .sendToDevice(tokens, payload)
          .catch(console.error);

        return;
      })
      .catch(error => console.error(error));
  });

// exports.checkPolls = functions.firestore
//   .document('test/trigger')
//   .onUpdate(event =>
//     admin
//       .firestore()
//       .collection(`polls`)
//       .where('privacy', '==', 'private')
//       .where('endsAt', '<=', new Date())
//       .where('ended', '==', false)
//       .get()
//       .then(coll =>
//         coll.forEach(doc =>
//           admin
//             .firestore()
//             .doc(`polls/${doc.data().id}`)
//             .update({ ended: true })
//         )
//       )
//   );

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
