const functions = require("firebase-functions");
const {info, error} = require("../util/logger");
const {db, admin} = require("../util/adminDbUtil");

module.exports = functions
	.region("europe-west1")
	.firestore.document("users/{userId}")
	.onUpdate((change, context) => {
		const updatedUser = change.after.data();
		const {userId} = context.params;

		db.collection("reviews")
			.where("userId", "==", userId)
			.get()
			.then((snap) => {
				for (const doc of snap) {
					updateReviews(doc.id, updatedUser);
				}

				info(`User update | Successful | ${userId}`);
				return {status: 200, message: {user: userId}};
			})
			.catch((err) => {
				error(`User update | Error | ${err}`);
				return {status: 500, message: "User not updated"};
			});
		db.collection("comments")
			.where("userId", "==", userId)
			.get()
			.then((snap) => {
				for (const doc of snap) {
					updateComments(doc.id, updatedUser);

					info(`User update | Successful | ${userId}`);
					({status: 200, message: {user: userId}});
					continue;
				}
			})
			.catch((err) => {
				error(`User update | Error | ${err}`);
				return {status: 500, message: "User not updated"};
			});
	});
function updateReviews(reviewId, user) {
	return db
		.collection("reviews")
		.doc(reviewId)
		.update({user})
		.catch((err) => {
			error(`updateReviews | Error | ${err}`);
			return {
				status: 500,
				message: "Reviews not updated with latest user updates"
			};
		});
}

function updateComments(commentId, user) {
	return db
		.collection("comments")
		.doc(commentId)
		.update({user})
		.catch((err) => {
			error(`updateComments | Error | ${err}`);
			return {
				status: 500,
				message: "Comments not updated with latest user updates"
			};
		});
}
