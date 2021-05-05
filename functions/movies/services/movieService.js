const axios = require('axios');
const functions = require('firebase-functions');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	params: {api_key: functions.config().tmdbservice.key}
});

const getMovieRequest = async (id, append_to_response = "credits") => {
	return axiosInstance.get(`/${id}`, {
		params: {
			append_to_response: append_to_response
		}
	});
};

module.exports = {
	getMovieRequest
};
