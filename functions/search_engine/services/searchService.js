const axios = require('axios');
const functions = require('firebase-functions');
const {removeUnnecessaryData, addURLToImagePosterPath} = require('./searchMovieTransformService');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/search',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		(data) => {
			data = removeUnnecessaryData(JSON.parse(data));
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
