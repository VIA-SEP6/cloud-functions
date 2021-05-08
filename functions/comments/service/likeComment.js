const {likeTopic} = require("../../util/reactions/reactionService");

module.exports = function likeComment(data) {
    const {userId, commentId} = data

    if (!userId || !commentId)
        return {status: 404, message: "Missing relevant data!"};
    return likeTopic("comments", commentId, userId)
        .then(() => {
            return {status: 200, message: "Successfully liked"};
        })
        .catch((err) => {
            return {error: err};
        });
}