const functions = require("firebase-functions");
const {
    updateMovieReviewRating,
} = require("../../movies/services/movieDAService");
const {updateReviewsCount} = require("../../user/services/userProfileUtils");

module.exports = functions
    .runWith({timeoutSeconds: 300, memory: '2GB'})
    .region("europe-west1")
    .firestore.document("reviews/{reviewId}")
    .onCreate(async (snap, context) => {
        const rating = snap.data().rating;
        const data = {
            movieId: `${snap.data().movieId}`,
            rating: parseFloat(rating),
        };
        await updateMovieReviewRating(data);
        await updateReviewsCount(snap.data().userId);
    });
