const functions = require("firebase-functions");
const tmdbKey = functions.config().tmdbservice.key;
module.exports = { tmdbKey };
