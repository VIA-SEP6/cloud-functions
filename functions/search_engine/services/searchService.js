const axios = require('axios');
const functions = require('firebase-functions');
const {transformData} = require('./movieTransformService');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/search',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		(data) => {
			return transformData(JSON.parse(data));
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
