const functions = require("firebase-functions");
const {
  calculateForPlatformCollection,
  recalculateForPlatformCollection
} = require("./services/platformStatsUtil");

module.exports = {
  update: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .pubsub.schedule("50 23 * * *")
    .onRun(async () => {
      await calculateForPlatformCollection("comments");
      await calculateForPlatformCollection("reviews");
    }),

  get: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      const { type, year } = data;
      return (await db.doc(`statistics/platform/${year}/${type}`).get()).data();
    }),

  recalculate: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      await recalculateForPlatformCollection("comments");
      await recalculateForPlatformCollection("reviews");
      return { message: "done" }
    }),
};
