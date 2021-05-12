const functions = require("firebase-functions");
const {info, error} = require("../util/logger");
const {db, admin} = require("../util/adminDbUtil");
module.exports = {
	register: functions.region("europe-west1").https.onCall(async (data) => {
		const {user} = data;
		if (!user) return {status: 400, message: "Missing user info"};

		return admin
			.auth()
			.createUser({
				disabled: false,
				emailVerified: false,
				email: user.email,
				password: user.password,
				user
			})
			.then((user) => {
				return db
					.collection("users")
					.doc(`${user.uid}`)
					.set(user, {merge: true})
					.then(() => {
						info(`Register User | Successful | ${user.uid}`);
						return {status: 200, message: {user: user.uid}};
					});
			})
			.catch((err) => {
				error(`Register User | Error | ${err}`);
				return {status: 500, message: "User not registered"};
			});
	}),

	getProfile: functions.region("europe-west1").https.onCall(async (data) => {
		const {userUid} = data;
		const docRef = db.collection("users").doc(`${userUid}`);
		const userDoc = await docRef.get();
		if (!userDoc.exists) {
			return {status: 404, message: "User does not exist"};
		}

		return {status: 200, message: {user: userDoc.data()}};
	}),

	updateProfile: functions.region("europe-west1").https.onCall(async (data) => {
		const {user, userUid} = data;
		const docRef = db.collection("users").doc(`${userUid}`);
		const userDoc = await docRef.get();
		if (!userDoc.exists) return {status: 403, message: "Access forbidden"};
		return db
			.collection("users")
			.doc(`${userUid}`)
			.set(user, {merge: true})
			.then(() => {
				info(`Update User | Successful | ${userUid}`);
				return {status: 200, message: {update_sucessful: userUid}};
			});
	})
};
