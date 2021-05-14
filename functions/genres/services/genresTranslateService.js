const genreJson = require('../movieGenres/movieGenres.json');

const translateGenre = (id) => {
  const result = genreJson.genres[id];
  if (result) {
    return result;
  }
  return 'Undefined genre'
}

module.exports = {
  translateGenre
}