const axios = require('axios');
const functions = require('firebase-functions');
const {
	addURLToImages,
	addTMAVoteAverage,
	addTMAVoteAverageToMultipleMovies,
	limitResults,
	removePagination,
	filterMovieDetails
} = require('./movieTransformService.js');
const {getTopMovies} = require('./movieDAService.js');
const {error} = require("../../util/logger");

const getSingleMovieInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		async (data) => {
			data = filterMovieDetails(JSON.parse(data));
			data = addURLToImages(data);
			data = await addTMAVoteAverage(data);

			return data;
		}
	]
});

const getMoviesInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		async (data) => {
			data = removePagination(JSON.parse(data));
			data = addURLToImages(data);
			data = await addTMAVoteAverageToMultipleMovies(data);

			return data;
		}
	]
});

const getTopRatedMoviesInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	params: {api_key: functions.config().tmdbservice.key},
	transformResponse: [
		async (data) => {
			const limit = 3;

			data = removePagination(JSON.parse(data));
			data = limitResults(limit, data);
			data["tma_results"] = await prepareTMATopRatedMovies(limit);
			data = addURLToImages(data);
			data = await addTMAVoteAverageToMultipleMovies(data);

			return data;
		}
	]
});

const getMovieRequest = async (id, append_to_response = "credits") => {
	return await getMovie(id, append_to_response);
};

const getMovie = async (id, append_to_response) => {
	try {
		const {data} = await getSingleMovieInstance.get(`/${id}`, {
			params: {
				append_to_response: append_to_response
			}
		});
		return data;
	} catch (err) {
		error(`Movie API Service ---> getMovie | Error | ${err}`);
		return err;
	}
};

const getMoviesRequest = async (endpoint) => {
	return await getMovies(endpoint);
};

const getMovies = async (endpoint) => {
	try {
		const {data} = await getMoviesInstance.get(`/${endpoint}`);
		return data;
	} catch (err) {
		error(`Movie API Service ---> getMovies | Error | ${err}`);
		return err;
	}
};

const getTopRatedMoviesRequest = async () => {
	return await getTopRatedMovies();
};

const getTopRatedMovies = async () => {
	try {
		const {data} = await getTopRatedMoviesInstance.get('/top_rated');
		return data;
	} catch (err) {
		error(`Movie API Service ---> getTopRatedMovies | Error | ${err}`);
		return err;
	}
};

const prepareTMATopRatedMovies = async (limit) => {
	const tmaTopMovies = await getTopMovies(limit);
	const tmaResults = [];

	console.log(tmaTopMovies);
	if (tmaTopMovies.length > 0) {
		for (const movie of tmaTopMovies) {
			tmaResults.push(await getMovie(movie.movieId, null));
		}
	}

	return tmaResults;
};

module.exports = {
	getMovieRequest,
	getMoviesRequest,
	getTopRatedMoviesRequest
};
