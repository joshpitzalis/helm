import { db } from '../../constants/firebase';

export const markOnboardingStepComplete = (userId, response) => {
  const step = {};
  step[`onboarding.${response}`] = true;
  db.doc(`users/${userId}`).update(step);
};

export const updateLastLogin = (uid) => {
  const lastLogin = { [new Date()]: true };
  db.doc(`users/${uid}`).set({ lastLogin }, { merge: true });
};

export const checkThatUserLoggedInLessThanAWeek = (userId) => {
  const oneWeek = 604800000;
  const now = new Date();
  const lastWeek = now - oneWeek;

  return db
    .doc(`users/${userId}`)
    .get()
    .then(user => user.data().lastLogin)
    .then(logins => Object.keys(logins).sort((a, b) => a - b))
    .then(sortedtimes => sortedtimes[sortedtimes.length - 2])
    .then(lastLogin => Date.parse(lastLogin) > lastWeek && markOnboardingStepComplete(userId, 'weekly'));
};
