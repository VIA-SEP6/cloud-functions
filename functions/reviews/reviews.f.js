const functions = require("firebase-functions");
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");
const {
  likeTopic,
  dislikeTopic,
  clearReactionFromTopic,
} = require("../util/reactions/reactionService");

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
  like: functions.region("europe-west1").https.onCall(async (data) => {
    if (!data.userUid || !data.reviewId)
      return { status: 404, message: "Missing required fields" };
    return likeTopic("reviews", data.reviewId, data.userUid)
      .then(() => {
        return { status: 200, message: "Successfully liked" };
      })
      .catch((err) => {
        return { error: err };
      });
  }),
  dislike: functions.region("europe-west1").https.onCall(async (data) => {
    if (!data.userUid || !data.reviewId)
      return { status: 404, message: "Missing required fields" };
    return dislikeTopic("reviews", data.reviewId, data.userUid)
      .then(() => {
        return { status: 200, message: "Missing required fields" };
      })
      .catch((err) => {
        return { error: err };
      });
  }),
  removeReaction: functions
    .region("europe-west1")
    .https.onCall(async (data) => {
      if (!data.userUid || !data.reviewId)
        return { status: 404, message: "Missing required fields" };
      return clearReactionFromTopic("reviews", data.reviewId, data.userUid)
        .then(() => {
          return { status: 200, message: "Successfully removed reaction" };
        })
        .catch((err) => {
          return { error: err };
        });
    }),
};
