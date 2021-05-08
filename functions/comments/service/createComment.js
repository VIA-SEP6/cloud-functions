const {db} = require("../../util/adminDbUtil");

module.exports = function createComment(data) {
    const {userId, movieId, content, parent} = data;
    if (!userId || !content || !movieId)
        return {status: 404, message: "Missing comment info!"};

    const docReference = db.collection("comments").doc();
    const userReference = db.collection("users").doc(userId);
    const dataMap = {
        movieId: movieId,
        by: userReference,
        content
    };
    return docReference.set(dataMap).then(() => {
        if (parent) {
            const referenceMap = {
                commentReference: docReference
            };
            return db.collection("comments")
                .doc(parent)
                .collection("replies")
                .doc()
                .create(referenceMap)
        }
    });
}
