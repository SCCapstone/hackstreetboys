package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Reviews;
import recipes.fridger.backend.dto.CreateReviewDTO;
import recipes.fridger.backend.model.Review;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private Reviews reviews;
    @Override
    public void createReview(CreateReviewDTO dto) {
        Review r = new Review();
        r.setAuthorID(dto.getAuthorID());
        r.setRecipeID(dto.getRecipeID());
        r.setRating(dto.getRating());
        r.setFeedback(dto.getFeedback());
    }
    @Transactional
    @Override
    public void deleteReview(Long id) {
        Optional<Review> review = reviews.findById(id);
        if (review.isPresent()) {
            Review r = review.get();
            reviews.delete(r);
        }
    }
    @Transactional
    @Override
    public Review getReview(Long id) {
        Optional<Review> review = reviews.findById(id);
        if (review.isPresent()) {
            return review.get();
        }
        return null;
    }

    @Transactional
    public Iterable<Review> getReviews(Long userId) {
        return reviews.find(userId);
    }

}
