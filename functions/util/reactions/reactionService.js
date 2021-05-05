const {db} = require("../adminDbUtil");

const likeTopic = async (collection, topicId, userUid) => {
	const topicReference = db.collection(collection).doc(topicId);

	return new Promise(async (resolve, reject) => {
		const topicDocument = await topicReference.get();
		if (!topicDocument.exists) {
			reject({code: "404", error: "Document not found"});
			return;
		}

		let {likes} = topicDocument.data();
		const {dislikes} = topicDocument.data();

		if (dislikes && dislikes.includes(userUid)) {
			const filteredDislikes = dislikes.filter((id) => id !== userUid);
			topicReference.set({dislikes: filteredDislikes}, {merge: true});
		}

		if (likes && likes.includes(userUid)) {
			return;
		}

		if (!likes) {
			likes = [];
		}

		likes.push(userUid);
		topicReference.set({likes: likes}, {merge: true});
		resolve("success");
	});
};

const dislikeTopic = async (collection, topicId, userUid) => {
	const topicReference = db.collection(collection).doc(topicId);

	return new Promise(async (resolve, reject) => {
		const topicDocument = await topicReference.get();
		if (!topicDocument.exists) {
			reject({code: "404", error: "Document not found"});
			return;
		}

		const {likes} = topicDocument.data();
		let {dislikes} = topicDocument.data();

		if (likes && likes.includes(userUid)) {
			const filteredLikes = likes.filter((id) => id !== userUid);
			topicReference.set({likes: filteredLikes}, {merge: true});
		}

		if (dislikes && dislikes.includes(userUid)) {
			resolve("success");
			return;
		}

		if (!dislikes) {
			dislikes = [];
		}

		dislikes.push(userUid);
		topicReference.set({dislikes: dislikes}, {merge: true});
		resolve("success");
	});
};

const clearReactionFromTopic = async (collection, topicId, userUid) => {
	const topicReference = db.collection(collection).doc(topicId);

	return new Promise(async (resolve, reject) => {
		const topicDocument = await topicReference.get();
		if (!topicDocument.exists) {
			reject({code: "404", error: "Document not found"});
			return;
		}

		const {likes} = topicDocument.data();
		const {dislikes} = topicDocument.data();

		if (likes && likes.includes(userUid)) {
			const filteredLikes = likes.filter((id) => id !== userUid);
			topicReference.set({likes: filteredLikes}, {merge: true});
		}

		if (dislikes && dislikes.includes(userUid)) {
			const filteredDislikes = dislikes.filter((id) => id !== userUid);
			topicReference.set({dislikes: filteredDislikes}, {merge: true});
		}

		resolve("success");
	});
};

module.exports = {
	likeTopic,
	dislikeTopic,
	clearReactionFromTopic
};
