const functions = require("firebase-functions");
const { HttpsError } = require("firebase-functions/lib/providers/https");
const { getTopCommenters } = require("./services/usersStatisticsService");


module.exports = {
    getTopCommenters: functions.region("europe-west1").https.onCall(async (data, context) => {
        return getTopCommenters(5)
        .catch((err) => {
            throw new HttpsError('internal', err);
        });
    }),
}