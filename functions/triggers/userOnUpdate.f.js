const functions = require("firebase-functions");
const { info, error } = require("../util/logger");
const { db, admin } = require("../util/adminDbUtil");

module.exports = functions
  .region("europe-west1")
  .firestore.document("users/{userId}")
  .onUpdate(async (change, context) => {
    const updatedUser = change.after.data();
    const { userId } = context.params;

    await updateReview(userId, updatedUser);

    await updateComment(userId, updatedUser);
  });
async function updateReview(userId, user) {
  const review = await db
    .collection("reviews")
    .where("userId", "==", userId)
    .get();
  if (!review.exists) return;

  return db
    .collection("reviews")
    .doc(`${review.id}`)
    .update({ user })
    .catch((err) => {
      error(`updateReviews | Error | ${err}`);
      return {
        status: 500,
        message: "Reviews not updated with latest user updates",
      };
    });
}

async function updateComment(userId, user) {
  const comment = await db
    .collection("comments")
    .where("userId", "==", userId)
    .get();
  if (!comment.exists) return;
  return db
    .collection("comments")
    .doc(`${comment.id}`)
    .update({ user })
    .catch((err) => {
      error(`updateComments | Error | ${err}`);
      return {
        status: 500,
        message: "Comments not updated with latest user updates",
      };
    });
}
