const functions = require("firebase-functions");
const EUROPE_WEST = "europe-west1"
const {createComment, dislikeComment, likeComment, clearCommentReaction} = require('./service/index')

module.exports = {
    create: functions.region(EUROPE_WEST).https.onCall(async (data) => {
        return createComment(data)
    }),
    like: functions.region(EUROPE_WEST).https.onCall(async (data) => {
        return likeComment(data)
    }),
    dislike: functions.region(EUROPE_WEST).https.onCall(async (data) => {
        return dislikeComment(data)
    }),
    clear: functions.region(EUROPE_WEST).https.onCall(async (data) => {
        return clearCommentReaction(data)
    }),
};
