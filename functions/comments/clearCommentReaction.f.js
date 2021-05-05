const functions = require("firebase-functions");
const {db} = require("../util/adminDbUtil");
const {clearReactionFromTopic} = require("../util/reactions/reactionService");

module.exports = functions.region("europe-west1").https.onCall(async (data) => {
	if (!data.userUid || !data.commentId)
		return {status: 404, message: "Missing relevant data!"};
	return clearReactionFromTopic("comments", data.commentId, data.userUid)
		.then(() => {
			return {status: 200, message: "Successfully cleared"};
		})
		.catch((err) => {
			return {error: err};
		});
});
