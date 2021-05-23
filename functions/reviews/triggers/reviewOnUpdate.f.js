const functions = require("firebase-functions");
const {addNotification} = require("../../notifications/services/notificationsDAService");

module.exports = functions
  .region("europe-west1")
  .firestore.document("reviews/{reviewId}")
  .onUpdate(async (change, context) => {

        const newLikes = change.after.data().likes;
        const oldLikes = change.before.data().likes;

        const likeChanges = newLikes.filter(like => !oldLikes.includes(like));

        if (likeChanges.length !== 0) {
            console.info("New Like detected")
            await addNotification("reviews", change.after.id, likeChanges[0], "like");
        }

      const newDislikes = change.after.data().dislikes || [];
      const oldDislikes = change.before.data().dislikes || [];

      const dislikeChanges = newDislikes.filter(like => !oldDislikes.includes(like));

      if (dislikeChanges.length !== 0) {
          console.info("New Dislike detected")
          await addNotification("reviews", change.after.id, dislikeChanges[0], "dislike");
      }
  });
