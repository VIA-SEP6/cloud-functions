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
    const { content, userId, movieId, parent } = data;
    if (!userId || !content || !movieId)
      return { status: 400, message: "Missing required fields" };

    const userDoc = await db.collection("users").doc(`${userId}`).get();
    const user = userDoc.data();
    if (!user) return { status: 404, message: "User not found" };
    const commentObj = {
      movieId,
      content,
      userId,
      timestamp: new Date(),
      user,
      likes: [],
      dislikes: [],
    };
    return db
      .collection("comments")
      .doc()
      .set(commentObj, { merge: true })
      .then(() => {
        info(`add-comment | Sucessful | ${commentObj}`);
        return { status: 201, message: "Comment added" };
      })
      .catch((err) => {
        err(`add-comment | Error | ${err}`);
        return { status: 400, message: "Comment added" };
      });
  }),
  like: functions.region("europe-west1").https.onCall(async (data) => {
    const { userId, commentId } = data;
    if (!userId || !commentId)
      return { status: 400, message: "Missing required fields" };
    return likeTopic("comments", commentId, userId)
      .then(() => {
        return { status: 200, message: "Successfully liked" };
      })
      .catch((err) => {
        return { error: err };
      });
  }),
  dislike: functions.region("europe-west1").https.onCall(async (data) => {
    const { userId, commentId } = data;
    if (!userId || !commentId)
      return { status: 400, message: "Missing required fields" };
    return dislikeTopic("comments", commentId, userId)
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
      const { userId, commentId } = data;
      if (!userId || !commentId)
        return { status: 400, message: "Missing required fields" };
      return clearReactionFromTopic("comments", commentId, userId)
        .then(() => {
          return { status: 200, message: "Successfully removed reaction" };
        })
        .catch((err) => {
          return { error: err };
        });
    }),
};
