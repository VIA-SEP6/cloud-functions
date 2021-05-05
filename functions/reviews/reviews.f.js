const functions = require("firebase-functions");
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");
module.exports = {
  add: functions.region("europe-west1").https.onCall(async (data) => {
    const { review } = data;
    if (!review) return { status: 400, message: "Missing review" };
    const { movieId, userId, description, rating } = review;
    if (!movieId || !userId || !description || !rating)
      return { status: 400, message: "Missing required fields" };
    const revObj = { ...review, timestamp: new Date(), likes: [] };
    return db
      .collection("reviews")
      .doc(`${movieId}`)
      .collection(`review`)
      .doc()
      .set(revObj, { merge: true })
      .then(() => {
        info(`add-review | Sucessful | ${revObj}`);
        return { status: 201, message: "Review added" };
      })
      .catch((err) => {
        return { status: 400, message: "Review added" };
      });
  }),
  like: functions.region("europe-west1").https.onCall(async (data) => {}),
  dislike: functions.region("europe-west1").https.onCall(async (data) => {}),
  removeReaction: functions
    .region("europe-west1")
    .https.onCall(async (data) => {}),
};
