const {getMovieRating} = require("./movieDAService");
const {preAppendValueToMultipleKeys} = require("../../util/jsonTransformService");

const addURLToImages = (data) => {
	const imagesBaseURL = "https://image.tmdb.org/t/p/w500";
    const imageKeys = ['backdrop_path','poster_path','logo_path','profile_path'];

	return preAppendValueToMultipleKeys(data,imageKeys,imagesBaseURL);
};

const addTMAVoteAverage = async (data) => {
	data["tma_vote_average"] = await getMovieRating(data.id);
	return data;
};

module.exports = {
	addURLToImages,
	addTMAVoteAverage
};
