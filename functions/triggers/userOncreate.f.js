const functions = require("firebase-functions");
const {info, error} = require("../util/logger");
const {db, admin} = require("../util/adminDbUtil");

module.exports = functions
	.region("europe-west1")
	.auth.user()
	.onCreate(async (user) => {
		const docRef = db.collection("users").doc(`${user.uid}`);
		const userDoc = await docRef.get();
		if (!userDoc.exists) {
			db.collection("users")
				.doc(`${user.uid}`)
				.set(
					{
						username: user.displayName,
						email: user.email,
						profilePhotoUrl: user.photoURL,
						phone: user.phoneNumber
					},
					{merge: true}
				)
				.then(() => {
					info(`Register User | Successful | ${user.uid}`);
				});
		}
	});