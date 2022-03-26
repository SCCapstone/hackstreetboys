package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateReviewDTO;
import recipes.fridger.backend.model.Review;

public interface ReviewService {
    public void createReview(CreateReviewDTO dto);
    public void deleteReview(Long id);
    public Review getReview(Long id);
    public Iterable<Review> getReviews(Long id, Long authorId, Long recipeId, Integer rating, String feedback);
//    public Double getAverageRating(Long recipeId);
}