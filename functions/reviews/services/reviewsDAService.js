const {db} = require("../../util/adminDbUtil");


const getAllReviewsByMovieId = async (movieId) => {
    const querySnapshot = await db.collection("reviews").where("movieId", "==", movieId).get();
    return querySnapshot.docs.map(doc => doc.data())
}

module.exports = {
    getAllReviewsByMovieId: getAllReviewsByMovieId
}