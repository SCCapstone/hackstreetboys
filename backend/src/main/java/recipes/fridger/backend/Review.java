package recipes.fridger.backend;

public class Review {
    private String review_id;
    private String author_id;
    private String recipe_id;
    private int rating;
    private String feedback;

    public Review(String review_id, String author_id, String recipe_id, int rating, String feedback) {
        this.review_id = review_id;
        this.author_id = author_id;
        this.recipe_id = recipe_id;
        this.rating = rating;
        this.feedback = feedback;
    }

    // ReviewID
    public long getReviewId() {
        return Long.parseLong(review_id);
    }
    public void setReviewId(String new_review_id) {
        review_id = new_review_id;
    }

    // AuthorID
    public long getAuthorId() {
        return Long.parseLong(author_id);
    }
    public void setAuthorId(String new_author_id) {
        author_id = new_author_id;
    }

    // RecipeID
    public long getRecipeId() {
        return Long.parseLong(recipe_id);
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
        return Boolean.parseBoolean(feedback);
    }
    public void setFeedback(boolean new_feedback) {
        feedback = String.valueOf(new_feedback);
    }

}