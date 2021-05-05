const functions = require("firebase-functions");
const {db} = require("../util/adminDbUtil");

module.exports = functions.region("europe-west1").https.onCall(async (data) => {
	const comment = data;
	if (!comment.userUid || !comment.content || !comment.movieId)
		return {status: 404, message: "Missing comment info!"};

	const docReference = db.collection("comments").doc();
	const userReference = db.collection("users").doc(comment.userUid);
	const dataMap = {
		movieId: comment.movieId,
		by: userReference,
		content: comment.content
	};
	docReference.set(dataMap).then(() => {
		if (comment.parent) {
			const referenceMap = {
				commentReference: docReference
			};
			db.collection("comments")
				.doc(comment.parent)
				.collection("replies")
				.doc()
				.create(referenceMap);
		}
	});
});
