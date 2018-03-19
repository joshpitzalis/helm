import { database, messaging } from './constants/firebase';

export default function (user) {
  messaging
    .requestPermission()
    .then(() => messaging.getToken())
    .then(token =>
      database
        .ref('users')
        .child(user.providerData[0].uid)
        .update({
          token,
          id: user.providerData[0].uid,
        }),
    )
    .catch(error => console.error(error));
}
