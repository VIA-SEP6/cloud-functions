const {db} = require("../../../util/adminDbUtil");

const getTopCommenters = async (limit) => {
    const usersSnapshot = await db.collection("users").orderBy('nrOfComments', "desc").limit(limit).get();

    const topCommenters = [];

    usersSnapshot.forEach(doc => {
        topCommenters.push({id: doc.id, ...doc.data()});
    });

    return topCommenters;
};

module.exports = {
    getTopCommenters
}