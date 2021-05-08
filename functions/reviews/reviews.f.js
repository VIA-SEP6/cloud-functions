const functions = require("firebase-functions");
const { info, error } = require("../util/logger");
const { db } = require("../util/adminDbUtil");
const {
  likeTopic,
  dislikeTopic,
  clearReactionFromTopic,
} = require("../util/reactions/reactionService");

module.exports = {
  add: functions.region("europe-west1").https.onCall(async (data) => {
    const { movieId, description, rating, userId } = data;

    if (!movieId || !userId || !description || !rating)
      return { status: 400, message: "Missing required fields" };

    const userDoc = await db.collection("users").doc(`${userId}`).get();
    const user = userDoc.data();
    if (!user) return { status: 404, message: "User not found" };
    const revObj = {
      movieId,
      description,
      rating,
      userId,
      timestamp: new Date(),
      user,
      likes: [],
      dislikes: [],
    };
    return db
      .collection("reviews")
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
    const { userId, reviewId } = data;
    if (!userId || !reviewId)
      return { status: 400, message: "Missing required fields" };
    return likeTopic("reviews", reviewId, userId)
      .then(() => {
        return { status: 200, message: "Successfully liked" };
      })
      .catch((err) => {
        return { error: err };
      });
  }),
  dislike: functions.region("europe-west1").https.onCall(async (data) => {
    const { userId, reviewId } = data;
    if (!userId || !reviewId)
      return { status: 400, message: "Missing required fields" };
    return dislikeTopic("reviews", reviewId, userId)
      .then(() => {
        return { status: 200, message: "Successfully disliked" };
      })
      .catch((err) => {
        return { error: err };
      });
  }),
  removeReaction: functions
    .region("europe-west1")
    .https.onCall(async (data) => {
      const { userId, reviewId } = data;
      if (!userId || !reviewId)
        return { status: 400, message: "Missing required fields" };
      return clearReactionFromTopic("reviews", reviewId, userId)
        .then(() => {
          return { status: 200, message: "Successfully removed reaction" };
        })
        .catch((err) => {
          return { error: err };
        });
    }),
};
