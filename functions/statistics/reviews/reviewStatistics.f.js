const functions = require("firebase-functions");
const {HttpsError} = require("firebase-functions/lib/providers/https");
const {getReviewStatistics} = require("./services/reviewStatisticsService");


module.exports = {
    get: functions
        .runWith({timeoutSeconds: 300,memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const {movieId} = data;
            if (!movieId) new HttpsError("invalid-argument", "Missing movieId");
            return getReviewStatistics(movieId)
                .catch((err) => {
                    console.log(err);
                    throw new HttpsError('internal', 'Server error' + err);
                });
        }),
}