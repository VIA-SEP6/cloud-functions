const axios = require('axios');
const functions = require('firebase-functions');
const {addURLToImages, addTMAVoteAverage} = require('./movieTransformService.js');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		async (data) => {
		  data = addURLToImages(JSON.parse(data));
		  data = await addTMAVoteAverage(data);
	
		  return data;
		},
	  ],
});

const getMovieRequest = async (id, append_to_response = "credits") => {
	const data = await getMovie(id, append_to_response);
	return data;
};

const getMovie = async (id, append_to_response) => {
	try {
		const {data} = await axiosInstance.get(`/${id}`, {
			params: {
				append_to_response: append_to_response
			}
		});
		return data;
	}
	catch (error) {
		console.log(error);
	}
}

module.exports = {
	getMovieRequest
};
