const movieDataBeforeTransform = require('./testData/movieDataBeforeTransform.json');
const movieDataAfterTransform = require('./testData/movieDataAfterTransform.json');
const movieDataAfterPosterPathAdd = require('./testData/movieDataAfterPosterPathAdd.json');
const {
	transformData,
	addURLToImagePosterPath
} = require('../services/searchMovieTransformService');

test('it should remove unwanted', () => {
	const result = transformData(movieDataBeforeTransform.data);
	expect(result).toStrictEqual(movieDataAfterTransform.data);
});

test('it should add URL to image poster path', () => {
	const result = addURLToImagePosterPath(movieDataAfterTransform.data);
	expect(result).toStrictEqual(movieDataAfterPosterPathAdd.data);
});
