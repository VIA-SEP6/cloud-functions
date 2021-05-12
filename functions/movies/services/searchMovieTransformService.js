const {removeKeys} = require("../../util/jsonTransformService");
const {getMovieRating} = require("./movieDAService");

const removeUnnecessaryData = (data) => {
	const keysToRemove = [
		"adult",
		"backdrop_path",
		"genre_ids",
		"original_language",
		"original_title",
		"popularity",
		"release_date",
		"video",
		"vote_count"
	];

	return removeKeys(data, keysToRemove);
};

const addURLToImagePosterPath = (data) => {
	const imagesBaseURL = "https://image.tmdb.org/t/p/w500";

	for (const result of data.results) {
		if (result["poster_path"]) {
			result["poster_path"] = imagesBaseURL + result["poster_path"];
		}
	}

	return data;
};

const addTMAVoteAverage = async (data) => {
	for (const result of data.results) {
		result["tma_vote_average"] = await getMovieRating(result.id);
	}

	return data;
};

module.exports = {
	removeUnnecessaryData,
	addURLToImagePosterPath,
	addTMAVoteAverage
};
