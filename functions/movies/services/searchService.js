const axios = require("axios");
const functions = require("firebase-functions");
const { tmdbKey } = require("../../envConfigVariables");
const {
  removeUnnecessaryData,
  addURLToImagePosterPath,
  addTMAVoteAverage
} = require("../services/searchMovieTransformService");

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/search",
  params: { api_key: tmdbKey },
  transformResponse: [
    async (data) => {
      data = removeUnnecessaryData(JSON.parse(data));
      data = addURLToImagePosterPath(data);
      data = await addTMAVoteAverage(data);

      return data;
    },
  ],
});

const searchMovieGetRequest = async (keyword) => {
  return await getMovies(keyword)
};

const getMovies = async(keyword) => {
  try {
    const {data} = await axiosInstance.get("/movie", {
      params: {
        query: keyword,
      },
    });
    return data;
  }
  catch (error) {
    error(`Search Service ---> getMovies | Error | ${err}`)
    return error;
  }
}

module.exports = {
  searchMovieGetRequest,
};
