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
    }, {});
}

module.exports = {
    getReviewStatistics: getReviewStatistics
}