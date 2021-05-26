const functions = require("firebase-functions");
const {HttpsError} = require("firebase-functions/lib/providers/https");
const {markAllAsRead, markAsRead} = require('./services/notificationsDAService');
const {authenticateAndGetUserIdFromContext} = require("../util/authentication");

module.exports = {
    markAsRead: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context);
            const {notificationId} = data;

            if (!notificationId)
                throw new HttpsError("invalid-argument", "Required fields");

            return markAsRead(notificationId, userId)
                .catch((err) => {
                    throw new HttpsError("internal", err);
                });
        }),
    markAllAsRead: functions
        .runWith({timeoutSeconds: 300, memory: '2GB'})
        .region("europe-west1").https.onCall(async (data, context) => {
            const userId = authenticateAndGetUserIdFromContext(context);

            return markAllAsRead(userId)
                .catch((err) => {
                    throw new HttpsError("internal", err);
                });
        })
}