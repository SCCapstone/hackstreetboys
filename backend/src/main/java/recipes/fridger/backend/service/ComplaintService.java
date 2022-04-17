package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateComplaintDTO;
import recipes.fridger.backend.model.Complaint;

public interface ComplaintService {
    //interface for all methods
    //creates complaint by passing in complaint dto
    public void createComplaint(CreateComplaintDTO dto);

    //deletes a complaint by id
    public void deleteComplaint(Long id);

    //gets a complaint by id
    public Complaint getComplaint(Long id);

    //gets all complaints matching params
    public Iterable<Complaint> getComplaints(Long id, Long authorId, Long recipeId, Integer severity, String reason);

}