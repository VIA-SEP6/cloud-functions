const {info} = require("../../util/logger");
const {admin} = require("../../util/adminDbUtil");
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

const updateUserInAuth = (userId, userData) => {
    admin.auth()
        .updateUser(userId, userData)
        .then(() => {
            info(`Auth Update User | Successful | Updated ${userData}`)
        })
}

const updateProfilePhotoUrl = async (userId, path) => {
        return db.collection("users")
        .doc(userId)
        .set({profilePhotoUrl: path},{merge: true});
}

module.exports = {
    updateReviewsCount,
    updateCommentsCount,
    getUpdatedUser,
    updateProfilePhotoUrl,
    updateUserInAuth
};
