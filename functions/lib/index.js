'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{followedUid}/{followerUid}`.
 * Users save their device notification tokens to `/users/{followedUid}/notificationTokens/{notificationToken}`.
 */
exports.sendChallengeNotification = functions.https.onRequest(
  async (req, res) => {
    const user = [];
    // get all challenges
    await admin
      .database()
      .ref(`/`)
      .once('value', (snapshot) => {
        // For each data in the entry
        snapshot.forEach((el) => {
          // Push the object to the array
          // If you also need to store the unique key from firebase,
          // You can use array.push({ ...el.val(), key: el.key });
          user.push(
            Object.assign(Object.assign({}, el.val()), { key: el.key })
          );
        });
      });
    // filter only those who have notifcation tokens enabled
    const allUsersWithNotificationTokens = user.filter((user) => {
      if (user.notificationTokens) {
        return true;
      }
      return false;
    });
    const filterActiveAndToBeNotifiedChallenges = (challenge) => {
      const currentHours = new Date().getHours();
      const isStillRunning =
        exports.calcDaysToGo(challenge.duration, challenge.startDate) > 0;
      if (
        challenge.shouldNotify === true &&
        currentHours === parseInt(challenge.notificationTime, 10) &&
        isStillRunning === true
      ) {
        return true;
      }
      return false;
    };
    const userAndChallengesToBeNotified = allUsersWithNotificationTokens.reduce(
      (prev, currUser) => {
        const filtered = Object.values(currUser.challenges).filter(
          filterActiveAndToBeNotifiedChallenges
        );
        if (filtered.length > 0) {
          return prev.concat({
            challenges: filtered,
            notificationTokens: currUser.notificationTokens,
          });
        }
        return prev;
      },
      []
    );
    // Check if there are any device tokens.
    if (userAndChallengesToBeNotified.length === 0) {
      console.log('There are no notification to send.');
      return res.send('There are no notification to send.');
    }
    userAndChallengesToBeNotified.forEach((user) => {
      const tokens = Object.keys(user.notificationTokens);
      console.log(user);
      console.log('USER KEY: ' + user.key);
      const getDeviceTokensPromise = admin
        .database()
        .ref(`${user.key}/notificationTokens`);
      user.challenges.forEach(async (challenge) => {
        const payload = {
          notification: {
            title: `Challenge reminder `,
            body: `Your challenge ${challenge.name} just ${exports.calcDaysToGo(
              challenge.duration,
              challenge.startDate
            )} days left`,
            icon: `/assets/icons/android-chrome-192x192.png`,
          },
        };
        const response = await admin.messaging().sendToDevice(tokens, payload);
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error(
              'Failure sending notification to',
              tokens[index],
              error
            );
            // Cleanup the tokens who are not registered anymore.
            if (
              error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered'
            ) {
              console.log('remove the following token' + tokens[index]);
              tokensToRemove.push(
                getDeviceTokensPromise.ref.child(tokens[index]).remove()
              );
            }
          }
        });
        console.log('tokens: to remove' + tokensToRemove);
        return Promise.all(tokensToRemove);
      });
    });
    return res.send('Send out notifications!\n\n');
  }
);
/**
 * Returns the remaining duration in days from the passed timestamp
 * @param {number} duration
 * @param {Date} createdTimestamp
 */
exports.calcDaysToGo = (duration, createdTimestamp) => {
  const today = new Date().getTime();
  const difInDays = Math.round(
    (today - createdTimestamp) / 1000 / 60 / 60 / 24
  );
  let remainingDays = duration - difInDays;
  if (remainingDays <= 0) {
    remainingDays = 0;
  }
  return remainingDays;
};
//# sourceMappingURL=index.js.map
