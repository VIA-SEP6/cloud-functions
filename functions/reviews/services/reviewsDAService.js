const {db} = require("../../util/adminDbUtil");


const getAllReviewsByMovieId = async (movieId) => {
    const reviews = [];

    const querySnapshot = await db.collection("reviews").where("movieId", "==", movieId).get();
        querySnapshot.forEach((doc) => {
            reviews.push(doc.data());
        });

    return reviews;
}

module.exports = {
    getAllReviewsByMovieId
}