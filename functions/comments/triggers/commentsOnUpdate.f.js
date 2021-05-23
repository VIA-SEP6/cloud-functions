const functions = require("firebase-functions");
const {addNotification} = require("../../notifications/services/notificationsDAService");

module.exports = functions
  .region("europe-west1")
  .firestore.document("comments/{commentId}")
  .onUpdate(async (change, context) => {

        const newLikes = change.after.data().likes;
        const oldLikes = change.before.data().likes;

        const changes = newLikes.filter(like => !oldLikes.includes(like));

        console.log(changes);
        if (changes.length !== 0) {
            await addNotification("comments", change.after.id, changes[0], "like");
        }
  });
