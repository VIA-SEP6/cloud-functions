const functions = require("firebase-functions");
const {HttpsError} = require("firebase-functions/lib/providers/https");
const {authenticateAndGetUserIdFromContext} = require("../util/authentication");
const {info, error} = require("../util/logger");
const {db} = require("../util/adminDbUtil");
const {
    likeTopic,
    dislikeTopic,
    clearReactionFromTopic
} = require("../util/reactions/reactionService");

module.exports = {
    add: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)
            const {movieId, description, rating} = data;

            if (!movieId || !description || !rating)
                new HttpsError('failed-precondition', 'Missing required data.')

            const userDoc = await db.collection("users").doc(`${userId}`).get();
            const user = userDoc.data();
            if (!user) new HttpsError('not-found', 'User not found')
            const revObj = {
                movieId: `${movieId}`, // To make sure its always a string
                description,
                rating,
                userId,
                timestamp: new Date(),
                user,
                likes: [],
                dislikes: []
            };
            return db
                .collection("reviews")
                .doc()
                .set(revObj, {merge: true})
                .then(() => {
                    info(`add-review | Successful | ${revObj}`);
                    return {successful: true};
                })
        }),
    like: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)
            const {reviewId} = data;
            if (!reviewId)
                new HttpsError('failed-precondition', 'Missing required data')
            return likeTopic("reviews", reviewId, userId)
                .then(() => {
                    return {successful: true};
                })
                .catch((err) => {
                    return {error: err};
                });
        }),
    dislike: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)
            const {reviewId} = data;
            if (!reviewId)
                new HttpsError('failed-precondition', 'Missing required data')
            return dislikeTopic("reviews", reviewId, userId)
                .then(() => {
                    return {successful: true};
                })
        }),
    removeReaction: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context)
            const {reviewId} = data;
            if (!reviewId)
                new HttpsError('failed-precondition', 'Missing required data')
            return clearReactionFromTopic("reviews", reviewId, userId)
                .then(() => {
                    return {successful: true};
                })
        })
};
