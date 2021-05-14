const {translateGenre} = require('../services/genresTranslateService');

test('it should translate genre when provided corresponding ID', () => {
	expect("Action").toStrictEqual(translateGenre(28));
});

test('it should state undefined genre when id not found', () => {
	expect("Undefined genre").toStrictEqual(translateGenre(99999999));
});
