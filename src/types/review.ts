export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ReviewRequest {
  id: string;
  userId: string;
  userName: string;
  challengeId: string;
  evidence: string;
  status: ReviewStatus;
  feedback?: string;
  submissionDate: Date;
  challenge: {
    name: string;
    description: string;
    rankName: string;
  };
}
