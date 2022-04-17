/*
  The model; variables for a complaint
*/

export interface Complaint{
    id: number;
    authorId: number;
    complaintId: number;
    severity: number;
    reason: string;
}