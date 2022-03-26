package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateComplaintDTO;
import recipes.fridger.backend.model.Complaint;

public interface ComplaintService {
    public void createComplaint(CreateComplaintDTO dto);
    public void deleteComplaint(Long id);
    public Complaint getComplaint(Long id);
    public Iterable<Complaint> getComplaints(Long id, Long authorId, Long recipeId, Integer severity, String reason);

}