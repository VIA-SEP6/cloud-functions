const {getCountPerDepartment,getGenreNameCount} = require('../services/peopleStatisticsService')
const jsonFile = require('./testData/peopleDetail.json')

test('it should get count per depatment', () => {
    const countPerDepartment = {Art: 3,Crew: 10,Directing: 18,Editing: 5,Production: 32, 'Visual Effects': 1,Writing: 30}
    expect(countPerDepartment).toStrictEqual(getCountPerDepartment(jsonFile.data));
});

test('it should get genre name count', () => {
    const genreNameCount = {Documentary: 42, History: 1, 'TV Movie': 3,
    'Science Fiction': 3,
    Action: 1,
    Comedy: 3,
    Adventure: 2,
    Mystery: 1,
    Music: 2,
    Fantasy: 2,
    Romance: 2,
    Drama: 2}
    expect(genreNameCount).toStrictEqual(getGenreNameCount(jsonFile.data));
})
