const functions = require("firebase-functions");
const { db } = require("../../util/adminDbUtil");
const {
  calculateForPlatformCollection,
  recalculateForPlatformCollection,
  getStatisticsForCollection
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

  getYearly: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      const {year} = data
      return {
        comments: (await getStatisticsForCollection("comments", year)).year,
        reviews: (await getStatisticsForCollection("reviews", year)).year
      }
    }),

  getMonthly: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      const {year} = data
      return {
        comments: (await getStatisticsForCollection("comments", year)).month,
        reviews: (await getStatisticsForCollection("reviews", year)).month
      }
    }),

  getWeekly: functions
    .runWith({ timeoutSeconds: 300, memory: "2GB" })
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      const {year} = data
      return {
        comments: (await getStatisticsForCollection("comments", year)).week,
        reviews: (await getStatisticsForCollection("reviews", year)).week
      }
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
