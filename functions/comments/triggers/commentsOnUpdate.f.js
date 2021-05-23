const functions = require("firebase-functions");
const {addNotification} = require("../../notifications/services/notificationsDAService");

module.exports = functions
    .region("europe-west1")
    .firestore.document("comments/{commentId}")
    .onUpdate(async (change, context) => {

        const {likes: newLikes, dislikes: newDislikes} = change.after.data()
        const {likes: oldLikes, dislikes: oldDislikes} = change.before.data()

        await handleNotification(change.after.id, "like", newLikes, oldLikes)
        await handleNotification(change.after.id, "dislike", newDislikes, oldDislikes)
    });

const handleNotification = async (commentId, action, after = [], before = []) => {
    const changes = after.filter(like => !before.includes(like));

    if (changes.length !== 0) {
        await addNotification("comments", commentId, changes[0], action);
    }
}
