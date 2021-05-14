const {translateGenre} = require("../../genres/services/genresTranslateService");

const getCountPerDepartment = (data) => {
    const crew = data.movie_credits.crew;
    const countPerDepartment = crew.reduce((acc, person) => {
      acc[person.department] = acc[person.department] + 1 || 1;
      return acc;
    }, {});
    return countPerDepartment;
};
  
const getGenreNameCount = (data) => {
    const cast = data.movie_credits.cast;
    const groupByGenreName = cast.reduce((acc, person) => {
      const { genre_ids } = person;
      genre_ids.forEach((genre) => {
        const translatedGenre = translateGenre(genre);
        acc[translatedGenre] = acc[translatedGenre] + 1 || 1;
      });
      return acc;
    }, {});
    return groupByGenreName;
};

module.exports = {
    getCountPerDepartment,
    getGenreNameCount
}