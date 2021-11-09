package recipes.fridger.backend;

public class Review {
    private final long review_id;
    private final long author_id;
    private final long recipe_id;
    private final int rating;
    private final String feedback;

    public Review(long id, long author_id, long recipe_id, int rating, String feedback) {
        this.id = id;
        this.author_id = author_id;
        this.recipe_id = recipe_id;
        this.rating = rating;
        this.feedback = feedback;
    }

    // ReviewID
    public long getReviewId() {
        return review_id;
    }
    public void setReviewId(String new_review_id) {
        review_id = new_review_id;
    }

    // AuthorID
    public long getAuthorId() {
        return author_id;
    }
    public void setAuthorId(String new_author_id) {
        author_id = new_author_id;
    }

    // RecipeID
    public long getRecipeId() {
        return recipe_id;
    }
    public void setRecipeId(String new_recipe_id) {
        recipe_id = new_recipe_id;
    }

    // Rating
    public int getRating() {
        return rating;
    }
    public void setRating(int new_rating) {
        rating = new_rating;
    }

    // Feedback
    public boolean getFeedback() {
        return feedback;
    }
    public void setFeedback(boolean new_feedback) {
        feedback = new_feedback;
    }

}