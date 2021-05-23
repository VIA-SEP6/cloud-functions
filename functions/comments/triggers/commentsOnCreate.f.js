const functions = require("firebase-functions");
const {updateCommentsCount} = require("../../user/services/userProfileUtils");
const {
	addNotification
} = require("../../notifications/services/notificationsDAService");

module.exports = functions
	.region("europe-west1")
	.firestore.document("comments/{commentId}")
	.onCreate(async (snap, context) => {
		const {userId} = snap.data();
		await updateCommentsCount(userId);

		const {parent} = snap.data();
		if (parent) {
			await addNotification("comments", parent, userId, "reply");
		}
	});
