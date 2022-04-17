/*
    Controls the dataflow for complaints.
 */

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

import recipes.fridger.backend.crud.Complaints;
import recipes.fridger.backend.dto.CreateComplaintDTO;
import recipes.fridger.backend.model.Complaint;
import recipes.fridger.backend.service.ComplaintService;

@RestController
@Slf4j
@RequestMapping(path = "/v1/complaint")
public class ComplaintController {

    @Autowired
    private Complaints complaints;

    @Autowired
    private ComplaintService complaintService;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createComplaint(@RequestBody @Valid CreateComplaintDTO c) {
        try {
            complaintService.createComplaint(c);
            log.info("Successful creation of complaint");
            return ResponseEntity.ok("Created complaint");
        } catch (Exception e) {
            log.warn("Unable to create complaint\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                    "Unable to create complaint\n" + e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
        try {
            complaintService.deleteComplaint(id);
            log.info("Successfully deleted complaint #" + id);
            return ResponseEntity.ok("Deleted complaint");
        } catch (Exception e) {
            log.warn("Unable to delete complaint\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                    "Unable to delete complaint\n" + e.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Complaint getComplaint(@PathVariable Long id) {
        return complaintService.getComplaint(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Complaint>
    getComplaint(@RequestParam(required = false) Long id,
               @RequestParam(required = false) Long authorId,
                 @RequestParam(required = false) Long recipeId,
               @RequestParam(required = false) Integer severity,
               @RequestParam(required = false) String reason)
    {
        return complaintService.getComplaints(id, authorId, recipeId, severity, reason);
    }
}