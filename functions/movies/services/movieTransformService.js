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
	data["tma_vote_average"] = await getMovieRating(data.id);

	return data;
};

const addTMAVoteAverageToMultipleMovies = async (data) => {
	for (const result of data.results) {
		result["tma_vote_average"] = await getMovieRating(result.id);
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
	filterMovieDetails
};
