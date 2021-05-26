const {getAllReviewsByMovieId} = require("../../../reviews/services/reviewsDAService");
const {getMovieRequest} = require("../../../movies/services/movieAPIService");
const {transformTMBReviewResponse} = require("../services/reviewStatisticsTransformService");

const getReviewStatistics = async (movieId) => {
    const statistics = {};
    const tmaReviews = await getAllReviewsByMovieId(movieId);
    statistics["tma_review_count"] = groupReviewStatisticsByRating(tmaReviews);

    const tmbMovie = await getMovieRequest(movieId, "reviews");
    const imdbReviews = transformTMBReviewResponse(tmbMovie.reviews.results);
    statistics["tmdb_review_count"] = groupReviewStatisticsByRating(imdbReviews);

    return statistics;
}

const groupReviewStatisticsByRating = (reviews) => {
    return reviews.reduce((acc, review) => {
        acc[review.rating] = acc[review.rating] + 1 || 1;
        return acc;
    }, {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
    });
}

module.exports = {
    getReviewStatistics: getReviewStatistics
}