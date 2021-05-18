const functions = require("firebase-functions");
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
        const {userName, password, email, userInfo} = data;
        if (!userName || !password || !email)
            throw new HttpsError("failed-precondition", "Missing required data.");

        return admin
            .auth()
            .createUser({
                disabled: false,
                emailVerified: false,
                email: email,
                password: password,
                displayName: userName
            })
            .then((user) => {
                return db
                    .collection("users")
                    .doc(`${user.uid}`)
                    .set({...userInfo, email, userName}, {merge: true})
                    .then(() => {

                        info(`Register User | Successful | ${user.uid}`);
                        return {status: 200, message: {user: user.uid}};
                    });
            })
            .catch((err) => {
                error(`Register User | Error | ${err}`);
                throw new HttpsError("aborted", "User not registered.");
            });
    }),

    getProfile: functions.region("europe-west1").https.onCall(async (data) => {
        const {userId} = data;
        const docRef = db.collection("users").doc(`${userId}`);
        const userDoc = await docRef.get();
        if (!userDoc.exists)
            throw new HttpsError("aborted", "User does not exist.");

        const userData = userDoc.data()

        const favouriteMovies = []
        await Promise.all(userData.favouriteMovies?.map(async movieId => {
            favouriteMovies.push(await getMovieRequest(movieId))
        }))
        userData.favouriteMovies = favouriteMovies


        return {status: 200, message: {user: userData}};
    }),

    updateProfile: functions.region("europe-west1").https.onCall(async (data) => {
        const {user, userId} = data;
        if (!userId)
            throw new HttpsError("failed-precondition", "Missing required data.");

        const docRef = db.collection("users").doc(`${userId}`);
        const userDoc = await docRef.get();
        if (!userDoc.exists)
            throw new HttpsError("aborted", "User does not exist.");
        return db
            .collection("users")
            .doc(`${userId}`)
            .set(user, {merge: true})
            .then(() => {
                info(`Update User | Successful | ${userId}`);
                return {status: 200, message: {update_sucessful: userId}};
            });
    }),

    getFavouriteMovies: functions
        .region("europe-west1")
        .https.onCall(async (data) => {
            const {userId} = data;
            const docRef = db.collection("users").doc(`${userId}`);
            const userDoc = await docRef.get();
            if (!userDoc.exists)
                throw new HttpsError("aborted", "User does not exist.");
            return userDoc.favouriteMovies;
        }),

    addFavouriteMovie: functions
        .region("europe-west1")
        .https.onCall(async (data) => {
            const {userId, movieId} = data;
            const docRef = db.collection("users").doc(`${userId}`);
            const userDoc = await docRef.get();
            if (!userDoc.exists)
                throw new HttpsError("aborted", "User does not exist.");
            addFavourite("users", movieId, userId).then(() => {
                info(`addFavouriteMovie | Successful | ${userId} | ${movieId}`);
                return {status: 200, message: {addFavouriteMovie: "successful"}};
            });
        }),

    removeFavouriteMovie: functions
        .region("europe-west1")
        .https.onCall(async (data) => {
            const {userId, movieId} = data;
            const docRef = db.collection("users").doc(`${userId}`);
            const userDoc = await docRef.get();
            if (!userDoc.exists)
                throw new HttpsError("aborted", "User does not exist.");
            removeFavourite("users", movieId, userId).then(() => {
                info(`removeFavouriteMovie | Successful | ${userId} | ${movieId}`);
                return {status: 200, message: {removeFavouriteMovie: "successful"}};
            });
        })
};
