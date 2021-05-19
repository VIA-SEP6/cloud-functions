const functions = require("firebase-functions");
const {updateMovieReviewRating} = require("../movies/services/movieDAService");

module.exports = functions
	.region("europe-west1")
	.firestore.document("reviews/{reviewId}")
	.onCreate(async (snap, context) => {
		const {rating} = snap.data();
		const data = {
			movieId: `${snap.data().movieId}`,
			rating: Number.parseFloat(rating)
		};
		await updateMovieReviewRating(data);
	});
