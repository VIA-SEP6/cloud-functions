const functions = require("firebase-functions");
const { info, error } = require("../../util/logger");
const { db, admin } = require("../../util/adminDbUtil");

module.exports = functions
  .region("europe-west1")
  .firestore.document("users/{userId}")
  .onUpdate(async (change, context) => {
    const updatedUser = change.after.data();
    const { userId } = context.params;

    await updateReviews(userId, updatedUser);

    await updateComments(userId, updatedUser);
  });

async function updateReviews(userId, user) {
  const reviewsSnapshot = await db
    .collection("reviews")
    .where("userId", "==", userId)
    .get();

  const batch = db.batch()
    reviewsSnapshot.forEach(reviewDoc => {
        if (reviewDoc.exists) {
            batch.update(reviewDoc.ref, { user })
        }
    })
    return batch.commit()
}

async function updateComments(userId, user) {
  const commentsSnapshot = await db
    .collection("comments")
    .where("userId", "==", userId)
    .get();

    const batch = db.batch()
    commentsSnapshot.forEach(commentDoc => {
        if (commentDoc.exists) {
            batch.update(commentDoc.ref, { user })
        }
    })
    return batch.commit()
}
