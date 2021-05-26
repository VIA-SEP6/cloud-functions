const functions = require("firebase-functions");
const {
  calculateForPlatformCollection,
} = require("./services/platformStatsUtil");

module.exports = {
  update: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .pubsub.schedule("0 0 * * *")
    .onRun(async () => {
      await calculateForPlatformCollection("comments");
      await calculateForPlatformCollection("reviews");
    }),
};
