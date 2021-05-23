const {HttpsError} = require("firebase-functions/lib/providers/https");

function authenticateAndGetUserIdFromContext(context) {
	const {uid} = context.auth;
	if (!uid)
		throw new HttpsError("permission-denied", "Authentication required");
	return uid;
}

module.exports = {
	authenticateAndGetUserIdFromContext
};
