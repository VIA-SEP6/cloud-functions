const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { getMovieRequest } = require("./services/movieService");
const { searchMovieGetRequest } = require("./services/searchService");

module.exports = {
  get: functions
    .region("europe-west1")
    .https.onRequest(async (request, response) => {
      const { id, append_to_response } = request.body;
      if (!id)
        return cors(request, response, () => {
          response.status(400).send({ data: "Missing id" });
        });
      await getMovieRequest(id, append_to_response)
        .then((result) => {
          return cors(request, response, () => {
            response.status(200).send({ data: result.data });
          });
        })
        .catch((err) => {
          return cors(request, response, () => {
            response.sendStatus(500).send({ data: "Server error" });
          });
        });
    }),
  search: functions
    .region("europe-west1")
    .https.onRequest(async (request, response) => {
      const { query } = request.body;
      if (!query)
        return cors(request, response, () => {
          response.status(400).send({ data: "Missing query" });
        });
      await searchMovieGetRequest(query)
        .then((result) => {
          return cors(request, response, () => {
            response.status(200).send({ data: result.data });
          });
        })
        .catch((err) => {
          console.log(err);
          return cors(request, response, () => {
            response.status(500).send({ data: "Server error " + err });
          });
        });
    }),
};
