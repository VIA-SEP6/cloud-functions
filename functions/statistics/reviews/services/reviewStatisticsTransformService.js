const transformTMBReviewResponse = (results) => {
    const reviews = []

    for (const result of results) {
        const rating = result.author_details.rating;
        if (rating === null) {
            reviews.push({rating: 0});
        }
        else {
            reviews.push({rating: rating});
        }
    }
    return reviews;
}

module.exports = {
    transformTMBReviewResponse
}