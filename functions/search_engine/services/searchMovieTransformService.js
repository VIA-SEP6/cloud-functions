const keysToRemove = [
  "adult",
  "backdrop_path",
  "genre_ids",
  "original_language",
  "original_title",
  "overview",
  "popularity",
  "release_date",
  "video",
  "vote_count",
];

const transformData = (data) => {
  for (const result of data.results) {
    for (const key of keysToRemove) {
      delete result[key];
    }
  }

  return data;
};

const addURLToImagePosterPath = (data) => {
  const imagesBaseURL = "https://image.tmdb.org/t/p/w500";

  for (const result of data.results) {
    if (result["poster_path"]) {
      result["poster_path"] = imagesBaseURL + result["poster_path"];
    }
  }

  return data;
};

module.exports = {
  transformData,
  addURLToImagePosterPath,
};