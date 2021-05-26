const { db } = require("../../../util/adminDbUtil");
const { firestore } = require("firebase-admin");
const initialStatistics = require('./initialStatistics.json')

const calculateForPlatformCollection = async (collection) => {
  const dbRef = db.doc(
    `statistics/platform/${new Date().getFullYear()}/${collection}`
  );
  const lastStats = (await dbRef.get()).data();

  const topicData = (
    await db
      .collection(`${collection}`)
      .where("timestamp", ">=", firestore.Timestamp.fromDate(getYesterday()))
      .get()
  ).docs;

  const reduced = calculateStatistics(topicData.map(snap => snap.data()), lastStats);

  await dbRef.set(reduced);
  return { message: "Done" };
};

const recalculateForPlatformCollection = async (collection) => {
  const topicData = (
    await db
      .collection(`${collection}`)
      .get()
  ).docs;

  const byYear = topicData.reduce((byYear, snap) => {
    const data = snap.data();
    const date = data.timestamp.toDate();
    byYear[date.getFullYear()] = byYear[date.getFullYear()] || []
    byYear[date.getFullYear()].push(data)
    return byYear
  }, {})

  await Promise.all(Object.entries(byYear).map(([key, value]) => {
    return db.doc(
      `statistics/platform/${key}/${collection}`
    ).set(calculateStatistics(value))
  }))
}

const getYesterday = () => {
  let dateCheck = new Date();
  dateCheck.setDate(dateCheck.getDate() - 1);
  return dateCheck;
};

const calculateStatistics = (arrayOfValues, initialValue) => {
  return arrayOfValues.reduce((stats, data) => {
    const date = data.timestamp.toDate();
    stats.year[date.getMonth()] = stats.year[date.getMonth()] + 1 || 1;
    stats.month[date.getDate()] = stats.month[date.getDate()] + 1 || 1;
    stats.week[date.getDay()] = stats.week[date.getDay()] + 1 || 1;
    return stats;
  }, initialValue || initialStatistics)

}

module.exports = {
  calculateForPlatformCollection,
  recalculateForPlatformCollection
};
