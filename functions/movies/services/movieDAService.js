const {db} = require("../../util/adminDbUtil");
const {error} = require("../../util/logger");

const updateMovieReviewRating = async (data) => {
	const {movieId, rating} = data;

	const movieDocumentRef = db.collection("movies").doc(movieId);

	let movieDocument = await movieDocumentRef.get();

	if (!movieDocument.exists) {
		await createMovie(movieId);
	}

	await db.runTransaction(async (transaction) => {
		movieDocument = await transaction.get(movieDocumentRef);

		const newNumRatings = movieDocument.data().numRatings + 1;

		const oldRatingTotal =
			movieDocument.data().avgRating * movieDocument.data().numRatings;
		const newAvgRating = (oldRatingTotal + rating) / newNumRatings;

		transaction.update(movieDocumentRef, {
			avgRating: newAvgRating,
			numRatings: newNumRatings
		});
	});
};

const createMovie = async (movieId) => {
	return db.collection("movies")
		.doc(movieId)
		.set({avgRating: 0, numRatings: 0})
};

const getMovieRating = async (movieId) => {
	const movieRef = db.collection('movies').doc(String(movieId));
	const movieDoc = await movieRef.get();
	if (!movieDoc.exists) {
		return {avgRating: 0, numRatings: 0};
	}

	return {avgRating: movieDoc.data().avgRating, numRatings: movieDoc.data().numRatings};
};

const getTopMovies = async (limit) => {
	const topMovies = await db
		.collection("movies")
		.orderBy("avgRating", 'desc')
		.limit(limit)
		.get();

	const movies = [];

	topMovies.forEach(snapshot => {
		movies.push({movieId:snapshot.id});
	})

	return movies;
};

module.exports = {
	updateMovieReviewRating,
	getMovieRating,
	getTopMovies
};
