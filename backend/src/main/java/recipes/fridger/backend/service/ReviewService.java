package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateReviewDTO;
import recipes.fridger.backend.model.Review;

public interface ReviewService {
    //interface for all methods
    //create review by passing in dto
    public void createReview(CreateReviewDTO dto);

    //delete review by id
    public void deleteReview(Long id);

    //get review by id
    public Review getReview(Long id);

    //get all reviews matching params
    public Iterable<Review> getReviews(Long id, Long authorId, Long recipeId, Integer rating, String feedback);
//    public Double getAverageRating(Long recipeId);
}