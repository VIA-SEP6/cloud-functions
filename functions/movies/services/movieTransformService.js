const {getMovieRating} = require("./movieDAService");
const {
	preAppendValueToMultipleKeys
} = require("../../util/jsonTransformService");
const {removeKeys} = require("../../util/jsonTransformService");

const addURLToImages = (data) => {
	const imagesBaseURL = "https://image.tmdb.org/t/p/w500";
	const imageKeys = [
		"backdrop_path",
		"poster_path",
		"logo_path",
		"profile_path"
	];

	return preAppendValueToMultipleKeys(data, imageKeys, imagesBaseURL);
};

const addTMAVoteAverage = async (data) => {
	const {avgRating, numRatings} = await getMovieRating(data.id);

	data["tma_vote_average"] = avgRating;
	data["tma_vote_count"] = numRatings;

	return data;
};

const addTMAVoteAverageToMultipleMovies = async (data) => {
	for (const result of data.results) {
		const {avgRating, numRatings} = await getMovieRating(data.id);

		result["tma_vote_average"] = avgRating;
		result["tma_vote_count"] = numRatings;
	}

	return data;
};

const overwriteIMDBVotesWithTMA = async (data) => {
	for (const result of data['tma_results']) {
		result["vote_average"] = result["tma_vote_average"];
		result["vote_count"] = result["tma_vote_count"];
	}

	return data;
};

const limitResults = (limit, data) => {
	data.results = data.results.slice(0, limit);
	return data;
};

const removePagination = (data) => {
	const keys = ['total_pages', 'total_results', 'page'];

	return removeKeys(data, keys);
};

const filterMovieDetails = (data) => {
	const keys = [
		'spoken_languages',
		'runtime',
		'revenue',
		'production_countries',
		'production_companies',
		'budget',
		'belongs_to_collection'
	];

	return removeKeys(data, keys);
};

module.exports = {
	addURLToImages,
	addTMAVoteAverage,
	addTMAVoteAverageToMultipleMovies,
	limitResults,
	removePagination,
	filterMovieDetails,
	overwriteIMDBVotesWithTMA
};
