const {db} = require("../../util/adminDbUtil");

const updateReviewsCount = async (userId) => {
    const userRef = db.collection("users").doc(`${userId}`);
    await db.runTransaction(async (transaction) => {
        const user = await transaction.get(userRef);
        if (!user.exists) return;
        transaction.update(userRef, {nrOfReviews: (user.get("nrOfReviews") || 0) + 1});
    });
};

const updateCommentsCount = async (userId) => {
    const userRef = db.collection("users").doc(`${userId}`);
    await db.runTransaction(async (transaction) => {
        const user = await transaction.get(userRef);
        if (!user.exists) return;
        transaction.update(userRef, {nrOfComments: (user.get("nrOfComments") || 0) + 1});
    });
}

const getUpdatedUser = (user) => {
    let updatedUser = {};
    Object.entries(user).map(([key, value]) => {
        if (value)
            updatedUser[`${key}`] = value

    })
    return updatedUser
}

module.exports = {
    updateReviewsCount,
    updateCommentsCount,
    getUpdatedUser
};
