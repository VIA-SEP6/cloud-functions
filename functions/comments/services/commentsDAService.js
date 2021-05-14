const {db} = require("../../util/adminDbUtil");

const addComment = async (content, userId, movieId, parent = undefined) => {
	const userDoc = await db.collection("users").doc(`${userId}`).get();
	const user = userDoc.data();

	if (!user) return Promise.reject("user not found");

	const commentObj = {
		movieId,
		content,
		userId,
		timestamp: new Date(),
		user,
		likes: [],
		dislikes: []
	};

	if (parent) {
		commentObj.parent = parent;
	}

	return db.collection("comments").doc().set(commentObj, {merge: true});
};

module.exports = {
	addComment
};
