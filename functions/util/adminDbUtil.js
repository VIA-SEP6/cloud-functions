const admin = require("firebase-admin");
const rtdb = admin.database();
const db = admin.firestore();
const storage = admin.storage();

module.exports = {
	admin: admin,
	rtdb: rtdb,
	db: db,
	storage: storage
};
