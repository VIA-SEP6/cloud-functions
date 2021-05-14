const {
	preAppendValueToMultipleKeys
} = require("../../util/jsonTransformService");
const {
	getCountPerDepartment,
	getGenreNameCount
} = require("./peopleStatisticsService");

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

const addStatistics = (data) => {
	data["cast_statistics"] = getGenreNameCount(data);
	data["crew_statistics"] = getCountPerDepartment(data);

	return data;
};

const reduceCreditsByKnownForDepartment = (data) => {
	data['movie_credits'] =
		data.known_for_department === "Acting"
			? data.movie_credits.cast
			: data.movie_credits.crew;

	return data;
};

module.exports = {
	addURLToImages,
	reduceCreditsByKnownForDepartment,
	addStatistics
};
