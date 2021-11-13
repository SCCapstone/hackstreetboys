package recipes.fridger.backend.stale;

public class Review {
    private long id;
    private long author_id;
    private long recipe_id;
    private int rating;
    private String feedback;

    public Review(long id, long author_id, long recipe_id, int rating, String feedback) {
        this.id = id;
        this.author_id = author_id;
        this.recipe_id = recipe_id;
        this.rating = rating;
        this.feedback = feedback;
    }

    // ReviewID
    public long getReviewId() {
        return id;
    }
    public void setReviewId(long new_id) {
        id = new_id;
    }

    // AuthorID
    public long getAuthorId() {
        return author_id;
    }
    public void setAuthorId(long new_author_id) {
        author_id = new_author_id;
    }

    // RecipeID
    public long getRecipeId() {
        return recipe_id;
    }
    public void setRecipeId(long new_recipe_id) {
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
    public String getFeedback() {
        return feedback;
    }
    public void setFeedback(String new_feedback) {
        feedback = new_feedback;
    }

}