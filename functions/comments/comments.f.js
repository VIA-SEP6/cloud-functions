const functions = require("firebase-functions");
const {authenticateAndGetUserIdFromContext} = require("../util/authentication");
const {
	likeTopic,
	dislikeTopic,
	clearReactionFromTopic
} = require("../util/reactions/reactionService");
const {HttpsError} = require("firebase-functions/lib/providers/https");
const {addComment} = require("./services/commentsDAService");

module.exports = {
	add: functions.region("europe-west1").https.onCall(async (data, context) => {
		const userId = authenticateAndGetUserIdFromContext(context)

		const {content, movieId, parent} = data;
		if (!content || !movieId)
			throw new HttpsError("invalid-argument", "Required fields");

		return addComment(content, userId, movieId, parent)
			.then(() => {
				return {status: 200, message: "Commend added"};
			})
			.catch((err) => {
				throw new HttpsError("internal", err);
			});
	}),
	like: functions.region("europe-west1").https.onCall(async (data, context) => {
		const userId = authenticateAndGetUserIdFromContext(context)

		const {commentId} = data;

		if (!commentId)
			throw new HttpsError("invalid-argument", "Missing id");

		return likeTopic("comments", commentId, userId)
			.then(() => {
				return {status: 200, message: "Successfully liked"};
			})
			.catch((err) => {
				throw new HttpsError("internal", err);
			});
	}),
	dislike: functions.region("europe-west1").https.onCall(async (data, context) => {
		const userId = authenticateAndGetUserIdFromContext(context)

		const {commentId} = data;

		if (!commentId)
			throw new HttpsError("invalid-argument", "Missing id");

		return dislikeTopic("comments", commentId, userId)
			.then(() => {
				return {status: 200, message: "Successfully disliked"};
			})
			.catch((err) => {
				throw new HttpsError("internal", err);
			});
	}),
	removeReaction: functions
		.region("europe-west1")
		.https.onCall(async (data, context) => {
			const userId = authenticateAndGetUserIdFromContext(context)

			const {commentId} = data;

			if (!commentId)
				throw new HttpsError("invalid-argument", "Missing required fields");

			return clearReactionFromTopic("comments", commentId, userId)
				.then(() => {
					return {status: 200, message: "Successfully removed reaction"};
				})
				.catch((err) => {
					throw new HttpsError("internal", err);
				});
		})
};
