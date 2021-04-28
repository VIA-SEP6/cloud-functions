const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");

module.exports = {
  getUserProfile: functions
    .region("europe-west1")
    .https.onCall(async (data) => {
      const { userUid } = data;
      const docRef = db.collection("users").doc(`${userUid}`);
      const userDoc = await docRef.get();
      if (!userDoc.exists) {
        return { status: 404, message: "User does not exist" };
      }
      return { status: 200, message: { user: userDoc.data() } };
    }),
  updateUserProfile: functions
    .region("europe-west1")
    .https.onCall(async (data) => {
      const { user, userUid } = data;
      const docRef = db.collection("users").doc(`${userUid}`);
      const userDoc = await docRef.get();
      if (!userDoc.exists) return { status: 403, message: "Access forbidden" };
      db.collection("users")
        .doc(`${userUid}`)
        .set(user, { merge: true })
        .then(() => {
          info(`Update User | Successful | ${userUid}`);
        });
    }),
};
