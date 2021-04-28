const axios = require('axios');
const functions = require('firebase-functions');
const {transformData, addURLToImagePosterPath} = require('../../movies/services/movieTransformService');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/search',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		(data) => {
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
			data = transformData(JSON.parse(data), keysToRemove);
			data = addURLToImagePosterPath(data);
			return data;
		}
	]
});

const searchMovieGetRequest = async (keyword) => {
	return axiosInstance.get('/movie', {
		params: {
			query: keyword
		}
	});
};

module.exports = {
	searchMovieGetRequest
};
