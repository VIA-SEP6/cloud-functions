const functions = require("firebase-functions");
const {updateUserInAuth} = require("./services/userProfileUtils");
const {getUpdatedUser} = require("./services/userProfileUtils");
const {authenticateAndGetUserIdFromContext} = require("../util/authentication");
const {HttpsError} = require("firebase-functions/lib/providers/https");
const {getMovieRequest} = require("../movies/services/movieAPIService");
const {info, error} = require("../util/logger");
const {db, admin} = require("../util/adminDbUtil");
const {
	addFavourite,
	removeFavourite
} = require("../util/reactions/reactionService");

module.exports = {
	register: functions.region("europe-west1").https.onCall(async (data) => {
		const {userName, password, email} = data;
		if (!userName || !password || !email) {
			throw new HttpsError('failed-precondition', 'Missing required data.');
		}

		return admin
			.auth()
			.createUser({
				disabled: false,
				emailVerified: false,
				email,
				password,
				displayName: userName
			})
			.then((user) => {
				info(`Register User | Successful | ${user.uid}`);
				return {status: 200, message: {user: user.uid}};
			})
			.catch((err) => {
				error(`Register User | Error | ${err}`);
				throw new HttpsError('aborted', 'User not registered.');
			});
	}),

	getProfile: functions
		.region("europe-west1")
		.https.onCall(async (data, context) => {
			const userId = authenticateAndGetUserIdFromContext(context);
			const docRef = db.collection('users').doc(`${userId}`);
			const userDoc = await docRef.get();
			if (!userDoc.exists) {
				throw new HttpsError("aborted", "User does not exist.");
			}

			const userData = userDoc.data();

			const favouriteMovies = [];
			await Promise.all(
				userData.favouriteMovies.map(async (movieId) => {
					favouriteMovies.push(await getMovieRequest(movieId, null));
				})
			);
			userData.favouriteMovies = favouriteMovies;

			return userData;
		}),

	updateProfile: functions
		.region("europe-west1")
		.https.onCall(async (data, context) => {
			const userId = authenticateAndGetUserIdFromContext(context);
			const {userName, age, country, phone} = data;

			if (userName)
				updateUserInAuth(userId, {displayName: userName})

			const updatedUser = getUpdatedUser({userName, age, country, phone})

			const docRef = db.collection('users').doc(`${userId}`);
			const userDoc = await docRef.get();
			if (!userDoc.exists) {
				throw new HttpsError("aborted", "User does not exist.");
			}

			return docRef
				.set(updatedUser, {merge: true})
				.then(() => {
					info(`Update User | Successful | ${userId}`, {updatedUser});
					return {successful: true};
				});
		}),


	addFavouriteMovie: functions
		.region("europe-west1")
		.https.onCall(async (data, context) => {
			const userId = authenticateAndGetUserIdFromContext(context);
			const {movieId} = data;
			const docRef = db.collection('users').doc(`${userId}`);
			const userDoc = await docRef.get();
			if (!userDoc.exists) {
				throw new HttpsError("aborted", "User does not exist.");
			}

			addFavourite('users', movieId, userId).then(() => {
				info(`addFavouriteMovie | Successful | ${userId} | ${movieId}`);
				return {successful: true};
			});
		}),

	removeFavouriteMovie: functions
		.region("europe-west1")
		.https.onCall(async (data, context) => {
			const userId = authenticateAndGetUserIdFromContext(context);
			const {movieId} = data;
			const docRef = db.collection('users').doc(`${userId}`);
			const userDoc = await docRef.get();
			if (!userDoc.exists) {
				throw new HttpsError("aborted", "User does not exist.");
			}

			removeFavourite('users', movieId, userId).then(() => {
				info(`removeFavouriteMovie | Successful | ${userId} | ${movieId}`);
				return {successful: true};
			});
		})
};
