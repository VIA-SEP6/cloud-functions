const functions = require("firebase-functions");
const {
  calculateForPlatformCollection,
  recalculateForPlatformCollection
} = require("./services/platformStatsUtil");

module.exports = {
  update: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      await calculateForPlatformCollection("comments");
      await calculateForPlatformCollection("reviews");
    }),
  recalculate: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      await recalculateForPlatformCollection("comments");
      await recalculateForPlatformCollection("reviews");
      return {message: "done"}
    }),
};
