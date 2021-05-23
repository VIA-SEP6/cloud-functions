const functions = require("firebase-functions");
const { HttpsError } = require("firebase-functions/lib/providers/https");
const {
	getMovieRequest,
	getMoviesRequest,
	getTopRatedMoviesRequest
} = require("./services/movieAPIService");
const { warn } = require("../util/logger");
const {searchMovieGetRequest} = require("./services/searchAPIService");

module.exports = {
  get: functions.region("europe-west1").https.onCall(async (data, context) => {
    const { movieId, append_to_response } = data;
    if (!movieId) new HttpsError("invalid-argument", "Missing movieId");
    return getMovieRequest(movieId, append_to_response)
      .catch((err) => {
        new HttpsError("failed-precondition", err);
      });
  }),
  getPopular: functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      return getMoviesRequest("popular")
        .catch((err) => {
          new HttpsError("failed-precondition", err);
        });
    }),
  getUpcoming: functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      return getMoviesRequest("upcoming")
        .catch((err) => {
          new HttpsError("failed-precondition", err);
        });
    }),
  getTopRated: functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      return getTopRatedMoviesRequest()
        .catch((err) => {
          new HttpsError("failed-precondition", err);
        });
    }),
  search: functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      const { query } = data;
      if (!query) new HttpsError("invalid-argument", "Missing required fields");
      return searchMovieGetRequest(query)
        .catch((err) => {
          new HttpsError("failed-precondition", err);
        });
    }),
};
