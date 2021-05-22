const {db} = require("../../../util/adminDbUtil");

const getTopCommenters = async (limit) => {
    const usersSnapshot = await db.collection("users").orderBy('nrOfComments').limit(limit).get();

    const topCommenters = [];

    usersSnapshot.forEach(doc => {
        topCommenters.push(doc.data());
    });

    return topCommenters;
};

module.exports = {
    getTopCommenters
}