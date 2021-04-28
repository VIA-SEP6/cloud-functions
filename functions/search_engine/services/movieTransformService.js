const keysToRemove = [
	'adult',
	'backdrop_path',
	'genre_ids',
	'original_language',
	'original_title',
	'overview',
	'popularity',
	'release_date',
	'video',
	'vote_count'
];

const transformData = (data) => {
	for (const result of data.results) {
		for (const key of keysToRemove) {
			delete result[key];
		}

		result.poster_path = addURLToImagePosterPath(result.poster_path);
	}

	console.log(data);
	return data;
};

const addURLToImagePosterPath = (imagePosterPath) => {
    const imagesBaseURL = 'https://image.tmdb.org/t/p/w500';

	if (imagePosterPath) {
		return imagesBaseURL + imagePosterPath;
	}

	return null;
};

module.exports = {
	transformData,
	addURLToImagePosterPath
};
