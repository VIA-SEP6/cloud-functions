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
    add: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)

            const {content, movieId, parent} = data;
            if (!content || !movieId)
                throw new HttpsError("invalid-argument", "Required fields");

            return addComment(content, userId, movieId, parent)
                .catch((err) => {
                    throw new HttpsError("internal", err);
                });
        }),
    like: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)

            const {commentId} = data;

            if (!commentId)
                throw new HttpsError("invalid-argument", "Missing id");

            return likeTopic("comments", commentId, userId)
                .catch((err) => {
                    throw new HttpsError("internal", err);
                });
        }),
    dislike: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)

            const {commentId} = data;

            if (!commentId)
                throw new HttpsError("invalid-argument", "Missing id");

            return dislikeTopic("comments", commentId, userId)
                .catch((err) => {
                    throw new HttpsError("internal", err);
                });
        }),
    removeReaction: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)

            const {commentId} = data;

            if (!commentId)
                throw new HttpsError("invalid-argument", "Missing required fields");

            return clearReactionFromTopic("comments", commentId, userId)
                .catch((err) => {
                    throw new HttpsError("internal", err);
                });
        })
};
