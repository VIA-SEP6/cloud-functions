const {clearReactionFromTopic} = require("../../util/reactions/reactionService");

module.exports = function clearCommentReaction(data) {
    const {userId, commentId} = data
    if (!userId || !commentId)
        return {status: 404, message: "Missing relevant data!"};
    return clearReactionFromTopic("comments", commentId, userId)
        .then(() => {
            return {status: 200, message: "Successfully cleared"};
        })
        .catch((err) => {
            return {error: err};
        });
}
