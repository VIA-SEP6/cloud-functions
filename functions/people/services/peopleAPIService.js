const axios = require("axios");
const {tmdbKey} = require("../../envConfigVariables");
const {
	addURLToImages,
	reduceCreditsByKnownForDepartment,
	addStatistics
} = require("./peopleTransformService");

const axiosPersonDetailsInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3/person",
	params: {api_key: tmdbKey},
	transformResponse: [
		async (data) => {
			data = addStatistics(JSON.parse(data));
			data = reduceCreditsByKnownForDepartment(data);
			data = addURLToImages(data);

			return data;
		}
	]
});

const getPersonRequest = async (personId) => {
	try {
		const {data} = await axiosPersonDetailsInstance.get(`/${personId}`, {
			params: {
				append_to_response: "movie_credits"
			}
		});
		return data;
	} catch (err) {
		error(`People API Service ---> getPersonRequest | Error | ${err}`);
		return err;
	}
};

module.exports = {
	getPersonRequest
};
