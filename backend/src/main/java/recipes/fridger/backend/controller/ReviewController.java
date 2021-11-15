package recipes.fridger.backend.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

import recipes.fridger.backend.crud.Reviews;
import recipes.fridger.backend.dto.CreateReviewDTO;
import recipes.fridger.backend.model.Review;
import recipes.fridger.backend.service.ReviewService;

@RestController
@Slf4j
@RequestMapping(path = "/v1/review")
public class ReviewController {

    @Autowired
    private Reviews reviews;

    @Autowired
    private ReviewService reviewService;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createReview(@RequestBody @Valid CreateReviewDTO r) {
        try {
            reviewService.createReview(r);
            log.info("Successful creation of review");
            return ResponseEntity.ok("Created review");
        } catch (Exception e) {
            log.warn("Unable to create review\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                "Unable to create review\n" + e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
            log.info("Successfully deleted review #" + id);
            return ResponseEntity.ok("Deleted review");
        } catch (Exception e) {
            log.warn("Unable to delete review\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                "Unable to delete review\n" + e.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Review getReview(@PathVariable Long id) {
        return reviewService.getReview(id);
    }

}
