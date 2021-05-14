const {db} = require("../adminDbUtil");
const {info} = require("../../util/logger");

const likeTopic = async (collection, topicId, userUid) => {
	const topicReference = db.collection(collection).doc(topicId);

	const topicDocument = await topicReference.get();

	if (!topicDocument.exists) {
		return Promise.reject("missing document");
	}

	const {likes} = topicDocument.data();
	const {dislikes} = topicDocument.data();

	if (likes.includes(userUid)) {
		return Promise.resolve("already liked");
	}

	likes.push(userUid);

	if (dislikes.includes(userUid)) {
		const filteredDislikes = dislikes.filter((id) => id !== userUid);
		return topicReference.set(
			{likes: likes, dislikes: filteredDislikes},
			{merge: true}
		);
	}

	return topicReference.set({likes: likes}, {merge: true});
};

const dislikeTopic = async (collection, topicId, userUid) => {
	const topicReference = db.collection(collection).doc(topicId);

	const topicDocument = await topicReference.get();

	if (!topicDocument.exists) {
		return Promise.reject("missing document");
	}

	const {likes} = topicDocument.data();
	const {dislikes} = topicDocument.data();

	if (dislikes.includes(userUid)) {
		return Promise.resolve("already disliked");
	}

	dislikes.push(userUid);

	if (likes.includes(userUid)) {
		const filteredLikes = likes.filter((id) => id !== userUid);
		return topicReference.set(
			{likes: filteredLikes, dislikes: dislikes},
			{merge: true}
		);
	}

	return topicReference.set({dislikes: dislikes}, {merge: true});
};

const clearReactionFromTopic = async (collection, topicId, userUid) => {
	const topicReference = db.collection(collection).doc(topicId);

	const topicDocument = await topicReference.get();
	if (!topicDocument.exists) {
		return Promise.reject('missing document');
	}

	const {likes} = topicDocument.data();
	const {dislikes} = topicDocument.data();

	if (likes.includes(userUid)) {
		const filteredLikes = likes.filter((id) => id !== userUid);
		return topicReference.set({likes: filteredLikes}, {merge: true});
	}

	if (dislikes.includes(userUid)) {
		const filteredDislikes = dislikes.filter((id) => id !== userUid);
		return topicReference.set({dislikes: filteredDislikes}, {merge: true});
	}
};

const addFavourite = async (collection, movieId, userUid) => {
	const collecReference = db.collection(collection).doc(userUid);
	const doc = await collecReference.get();
	let {favouriteMovies} = doc.data();
	if (!favouriteMovies) favouriteMovies = [];
	favouriteMovies.push(movieId);
	info(favouriteMovies);
	return collecReference.set(
		{
			favouriteMovies: [...new Set(favouriteMovies)]
		},
		{
			merge: true
		}
	);
};

const removeFavourite = async (collection, movieId, userUid) => {
	const collecReference = db.collection(collection).doc(userUid);
	const doc = await collecReference.get();
	const {favouriteMovies} = doc.data();
	if (favouriteMovies && favouriteMovies.includes(movieId)) {
		const filterFavMovies = favouriteMovies.filter((id) => id !== movieId);
		return collecReference.set(
			{
				favouriteMovies: filterFavMovies
			},
			{merge: true}
		);
	}
};

module.exports = {
	likeTopic,
	dislikeTopic,
	clearReactionFromTopic,
	addFavourite,
	removeFavourite
};
