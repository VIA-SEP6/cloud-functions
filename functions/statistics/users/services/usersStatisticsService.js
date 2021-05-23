const {db} = require("../../../util/adminDbUtil");

const getTopCommenters = async (limit) => {
	const usersSnapshot = await db
		.collection("users")
		.orderBy("nrOfComments", "desc")
		.limit(limit)
		.get();

	const topCommenters = [];

	for (const doc of usersSnapshot) {
		topCommenters.push({id: doc.id, ...doc.data()});
	}

	return topCommenters;
};

module.exports = {
	getTopCommenters
};
