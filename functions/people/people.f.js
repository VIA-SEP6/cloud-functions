const functions = require("firebase-functions");
const {getPersonRequest} = require("./services/peopleAPIService");

module.exports = {
    get: functions.region("europe-west1").https.onCall(async (data) => {
        const {id} = data;
        
        if (!id)
        throw new HttpsError("failed - precondition", "missing id");

        const result = await getPersonRequest(id);

        if (!result)
        throw new HttpsError("failed", "server error");

        return { status: 200, message: { person: result } };
    }),
}
