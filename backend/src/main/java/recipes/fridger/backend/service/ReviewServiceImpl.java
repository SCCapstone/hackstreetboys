package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.crud.Reviews;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreateReviewDTO;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.model.Review;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService{
    @Autowired
    private Recipes recipes;
    @Autowired
    private Users users;
    @Autowired
    private Reviews reviews;

    //creates review by passing in dto and set values
    @Override
    public void createReview(CreateReviewDTO dto) {
        Review r = new Review();
        r.setAuthorId(dto.getAuthorId());
        r.setRecipeId(dto.getRecipeId());
        r.setRating(dto.getRating());
        r.setFeedback(dto.getFeedback());
        reviews.save(r);
//        Optional<Recipe> optionalRecipe = recipes.findById(dto.getId().longValue());
//        if (optionalRecipe.isPresent()) {
//
//        }
    }

    //delete a review by passing id
    @Transactional
    @Override
    public void deleteReview(Long id) {
        Optional<Review> review = reviews.findById(id);
        if (review.isPresent()) {
            Review r = review.get();
            reviews.delete(r);
        }
    }

    //get a review by id
    @Transactional
    @Override
    public Review getReview(Long id) {
        Optional<Review> review = reviews.findById(id);
        if (review.isPresent()) {
            return review.get();
        }
        return null;
    }

    //get all reviews matching the params
    @Transactional
    public Iterable<Review> getReviews(Long id, Long authorId, Long recipeId, Integer rating, String feedback ) {
        List<Review> reviewList =  reviews.find(id, authorId, recipeId, rating, feedback);
        for(Review r : reviewList){
            System.out.println(users.findById(r.getAuthorId()).get().getName());
            r.setAuthorName((users.findById(r.getAuthorId()).get().getName()!= null) ? users.findById(r.getAuthorId()).get().getName() : "NaN");
            System.out.println(users.findById(r.getAuthorId()).get().getName());
            reviews.save(r);
        }
        return reviewList;
    }

}