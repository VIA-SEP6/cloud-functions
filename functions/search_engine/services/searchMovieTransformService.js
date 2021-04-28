const keysToRemove = [
	'adult',
	'backdrop_path',
	'genre_ids',
	'original_language',
	'original_title',
	'overview',
	'popularity',
	'release_date',
	'video',
	'vote_count'
];

const transformData = (data) => {
	for (const result of data.results) {
		for (const key of keysToRemove) {
			delete result[key];
		}
	}

	return data;
};

<<<<<<< HEAD:functions/search_engine/services/movieTransformService.js
const addURLToImagePosterPath = (imagePosterPath) => {
	const imagesBaseURL = "https://image.tmdb.org/t/p/w500";
=======
const addURLToImagePosterPath = (data) => {
	const imagesBaseURL = 'https://image.tmdb.org/t/p/w500';
>>>>>>> 3e18edd403b2bbdfdd67ebcf41acfe7f5b830b9d:functions/search_engine/services/searchMovieTransformService.js

	for (const result of data.results) {
		if (result['poster_path']) {
			result['poster_path'] = imagesBaseURL + result['poster_path'];
		}
	}

	return data;
};

module.exports = {
	transformData,
	addURLToImagePosterPath
};
