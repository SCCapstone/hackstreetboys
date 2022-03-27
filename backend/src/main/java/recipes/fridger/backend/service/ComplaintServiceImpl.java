package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Complaints;
import recipes.fridger.backend.dto.CreateComplaintDTO;
import recipes.fridger.backend.model.Complaint;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ComplaintServiceImpl implements ComplaintService{

    @Autowired
    private Complaints complaints;
    @Override
    public void createComplaint(CreateComplaintDTO dto) {
        Complaint c = new Complaint();
        c.setAuthorId(dto.getAuthorId());
        c.setRecipeId(dto.getRecipeId());
        c.setReason(dto.getReason());
        c.setSeverity(dto.getSeverity());
        complaints.save(c);
    }
    @Transactional
    @Override
    public void deleteComplaint(Long id) {
        Optional<Complaint> complaint = complaints.findById(id);
        if (complaint.isPresent()) {
            Complaint c = complaint.get();
            complaints.delete(c);
        }
    }
    @Transactional
    @Override
    public Complaint getComplaint(Long id) {
        Optional<Complaint> complaint = complaints.findById(id);
        if (complaint.isPresent()) {
            return complaint.get();
        }
        return null;
    }

    @Transactional
    public Iterable<Complaint> getComplaints(Long id, Long authorId, Long recipeId, Integer severity, String reason ) {
        return complaints.find(id, authorId, recipeId, severity, reason);
    }

}