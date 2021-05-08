const {dislikeTopic} = require("../../util/reactions/reactionService");

module.exports = function dislikeComment(data) {
    const {userId, commentId} = data
    if (!userId || !commentId)
        return {status: 404, message: "Missing relevant data!"};
    return dislikeTopic("comments", commentId, userId)
        .then(() => {
            return {status: 200, message: "Successfully disliked"};
        })
        .catch((err) => {
            return {error: err};
        });
}