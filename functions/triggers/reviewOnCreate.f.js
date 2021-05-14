const functions = require("firebase-functions");
const {updateMovieReviewRating} = require("../movies/services/movieDAService");

module.exports = functions
	.region("europe-west1")
	.firestore.document("reviews/{reviewId}")
	.onCreate(async (snap, context) => {
		const data = {
			movieId: snap.data().movieId,
			rating: snap.data().rating
		};
		updateMovieReviewRating(data);
	});