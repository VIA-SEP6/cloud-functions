const movieDataBeforeTransform = require('./testData/movieDataBeforeTransform.json');
const movieDataAfterTransform = require('./testData/movieDataAfterTransform.json');
const {
	transformData,
	addURLToImagePosterPath
} = require('../services/movieTransformService');

test('it should add URL to image poster path', () => {
	const imagesBaseURL = "https://image.tmdb.org/t/p/w500";
	const validImage = '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg';
	const validURLImage = imagesBaseURL + validImage;
	expect(addURLToImagePosterPath(validImage)).toBe(validURLImage);
});

test('it should return null if invalid image poster path', () => {
	const invalidImage = undefined;
	expect(addURLToImagePosterPath(invalidImage)).toBe(null);
});

test('it should remove unwanted data and add urls to the poster paths', () => {
	const result = transformData(movieDataBeforeTransform.data);
	expect(result).toStrictEqual(movieDataAfterTransform.data);
});
