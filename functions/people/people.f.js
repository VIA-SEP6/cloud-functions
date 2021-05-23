const functions = require("firebase-functions");
const {HttpsError} = require("firebase-functions/lib/providers/https");
const {getPersonRequest} = require("./services/peopleAPIService");

module.exports = {
	get: functions.region("europe-west1").https.onCall(async (data) => {
		const {id} = data;

		if (!id) throw new HttpsError("invalid-argument", "Missing id");

		const result = await getPersonRequest(id);

		if (!result)
			throw new HttpsError(
				"internal",
				"Getting person from external source failed"
			);

		return result;
	})
};
