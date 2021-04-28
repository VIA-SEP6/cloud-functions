const movieDataBeforeTransform = require('./testData/movieDataBeforeTransform.json');
const movieDataAfterTransform = require('./testData/movieDataAfterTransform.json');
const movieDataAfterPosterPathAdd = require('./testData/movieDataAfterPosterPathAdd.json');
const {
	transformData,
	addURLToImagePosterPath
} = require('../services/searchMovieTransformService');

<<<<<<< HEAD
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
=======
test('it should remove unwanted', () => {
>>>>>>> 3e18edd403b2bbdfdd67ebcf41acfe7f5b830b9d
	const result = transformData(movieDataBeforeTransform.data);
	expect(result).toStrictEqual(movieDataAfterTransform.data);
});

test('it should add URL to image poster path', () => {
	const result = addURLToImagePosterPath(movieDataAfterTransform.data);
	expect(result).toStrictEqual(movieDataAfterPosterPathAdd.data);
});
