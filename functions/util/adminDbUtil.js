const admin = require("firebase-admin");
const rtdb = admin.database();
const db = admin.firestore();

module.exports = {
  admin: admin,
  rtdb: rtdb,
  db: db,
};
