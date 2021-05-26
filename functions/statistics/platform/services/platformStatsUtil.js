const { db } = require("../../../util/adminDbUtil");
const { firestore } = require("firebase-admin");

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

  const reduced = topicData.reduce((stats, snap) => {
    const data = snap.data();
    const date = data.timestamp.toDate();
    stats.year[date.getMonth()] = stats.year[date.getMonth()] + 1 || 1;
    stats.month[date.getDate()] = stats.month[date.getDate()] + 1 || 1;
    stats.week[date.getDay()] = stats.week[date.getDay()] + 1 || 1;
    return stats;
  }, lastStats || { year: {}, month: {}, week: {} });

  dbRef.set(reduced);
  return { message: "Done" };
};

const getYesterday = () => {
  let dateCheck = new Date();
  dateCheck.setDate(dateCheck.getDate() - 1);
  return dateCheck;
};

module.exports = {
  calculateForPlatformCollection,
};
