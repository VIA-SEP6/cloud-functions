const { db } = require("../../util/adminDbUtil");

const updateReviewsCount = async (userId) => {
  const userRef = db.collection("users").doc(`${userId}`);
  await db.runTransaction(async (transaction) => {
    const user = await transaction.get(userRef);
    if (!user.exists) return;
    transaction.update(userRef, { reviews: user.get("reviews") || 0 + 1 });
  });
};

module.exports = {
  updateReviewsCount,
};
