const {searchMovieGetRequest} = require('./services/searchService');
const functions = require("firebase-functions");
const cors = require("cors")({origin: true});

module.exports = functions
	.region("europe-west1")
	.https.onRequest(async (request, response) => {
		const {query} = request.body;
		if (!query)
			return cors(request, response, () => {
				response.status(400).send({data: "Missing query"});
			});
		await searchMovieGetRequest(query)
			.then((result) => {
				return cors(request, response, () => {
					response.status(200).send({data: result.data});
				});
			})
			.catch((err) => {
				return cors(request, response, () => {
					response.sendStatus(500).send({data: "Server error"});
				});
			});
	});
