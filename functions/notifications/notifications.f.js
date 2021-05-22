const functions = require("firebase-functions");
const { HttpsError } = require("firebase-functions/lib/providers/https");
const {markAllAsRead, markAsRead} = require('./services/notificationsDAService');
const {authenticateAndGetUserIdFromContext} = require("../util/authentication");

module.exports = {
    markAsRead: functions.region("europe-west1").https.onCall(async (data, context) => {
		const userId = authenticateAndGetUserIdFromContext(context);
        const {notificationId} = data; 

        if (!notificationId)
            throw new HttpsError("invalid-argument", "Required fields");

        return markAsRead(notificationId, userId).then(() => {
            return {status: 200, message: "Notification marked as read"};
        })
        .catch((err) => {
            throw new HttpsError("internal", err);
        });
    }),
    markAllAsRead: functions.region("europe-west1").https.onCall(async (data, context) => {
		const userId = authenticateAndGetUserIdFromContext(context);

        return markAllAsRead(userId).then(() => {
            return {status: 200, message: "Notifications marked as read"};
        })
        .catch((err) => {
            throw new HttpsError("internal", err);
        });
    })
}