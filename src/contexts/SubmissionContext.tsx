'use client'

import { createContext, useContext, useReducer, useState, useCallback } from 'react';
import { Challenge, Rank } from '@prisma/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { CustomToast } from '@/components/ui/common/CustomToast';

// Types
export interface Notification {
  id: string;
  type: 'submission' | 'approved' | 'rejected';
  message: string;
  timestamp: string;
  read: boolean;
  challengeId: string;
}

interface Submission {
  id: string;
  challengeId: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING';
  feedback?: string;
  timestamp: number;
}

interface SubmissionState {
  submissions: Submission[];
  notifications: Notification[];
  unreadCount: number;
  selectedChallenge: Challenge | null;
  isModalOpen: boolean;
  selectedRank: Rank | null;
  ranks: Rank[];
  refreshLeaderboard: boolean;
}

type SubmissionAction =
  | { type: 'ADD_SUBMISSION'; payload: Submission }
  | { type: 'UPDATE_SUBMISSION'; payload: Submission }
  | { type: 'SET_SUBMISSIONS'; payload: Submission[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ' }
  | { type: 'SET_SELECTED_CHALLENGE'; payload: Challenge | null }
  | { type: 'SET_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_SELECTED_RANK'; payload: Rank | null }
  | { type: 'SET_RANKS'; payload: Rank[] }
  | { type: 'RESET_REFRESH_LEADERBOARD' };

// Initial state
const initialState: SubmissionState = {
  submissions: [],
  notifications: [],
  unreadCount: 0,
  selectedChallenge: null,
  isModalOpen: false,
  selectedRank: null,
  ranks: [],
  refreshLeaderboard: false,
};

// Reducer
function submissionReducer(state: SubmissionState, action: SubmissionAction): SubmissionState {
  switch (action.type) {
    case 'ADD_SUBMISSION':
      return {
        ...state,
        submissions: [...state.submissions, action.payload],
      };
    case 'UPDATE_SUBMISSION':
      return {
        ...state,
        submissions: state.submissions.map((submission) =>
          submission.id === action.payload.id ? action.payload : submission
        ),
      };
    case 'SET_SUBMISSIONS':
      return {
        ...state,
        submissions: action.payload,
      };
    case 'ADD_NOTIFICATION':
      // Show custom toast for all notifications
      toast.custom(() => (
        <CustomToast 
          message={action.payload.message}
          type={action.payload.type}
        />
      ));
      
      // Only add challenge result notifications to the list
      if (action.payload.type === 'approved' || action.payload.type === 'rejected') {
        return {
          ...state,
          notifications: [...state.notifications, action.payload],
          unreadCount: state.unreadCount + 1,
          refreshLeaderboard: true,
        };
      }
      return state;
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      };
    case 'SET_SELECTED_CHALLENGE':
      return { ...state, selectedChallenge: action.payload };
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'SET_SELECTED_RANK':
      return { ...state, selectedRank: action.payload };
    case 'SET_RANKS':
      return { ...state, ranks: action.payload };
    case 'RESET_REFRESH_LEADERBOARD':
      return { ...state, refreshLeaderboard: false };
    default:
      return state;
  }
}

interface SubmissionContextType {
  state: SubmissionState;
  selectedChallenge: Challenge | null;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setSelectedChallenge: (challenge: Challenge | null) => void;
  addSubmission: (submission: Submission) => void;
  updateSubmission: (submission: Submission) => void;
  setSubmissions: (submissions: Submission[]) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  markAsRead: () => void;
  selectedRank: Rank | null;
  setSelectedRank: (rank: Rank | null) => void;
  ranks: Rank[];
  setRanks: (ranks: Rank[]) => void;
  onSubmit?: (challenge: Challenge) => void;
  refetchChallenges: boolean;
  setRefetchChallenges: (value: boolean) => void;
  resetRefreshLeaderboard: () => void;
}

export const SubmissionContext = createContext<SubmissionContextType>({
  state: initialState,
  selectedChallenge: null,
  modalOpen: false,
  setModalOpen: () => {},
  setSelectedChallenge: () => {},
  addSubmission: () => {},
  updateSubmission: () => {},
  setSubmissions: () => {},
  addNotification: () => {},
  removeNotification: () => {},
  markAsRead: () => {},
  selectedRank: null,
  setSelectedRank: () => {},
  ranks: [],
  setRanks: () => {},
  onSubmit: undefined,
  refetchChallenges: false,
  setRefetchChallenges: () => {},
  resetRefreshLeaderboard: () => {},
});

// Provider
export function SubmissionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(submissionReducer, initialState);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [onSubmit] = useState<((challenge: Challenge) => void) | undefined>(undefined);
  const [refetchChallenges, setRefetchChallenges] = useState(false);

  const addSubmission = useCallback((submission: Submission) => {
    dispatch({
      type: 'ADD_SUBMISSION',
      payload: submission,
    });
  }, []);

  const updateSubmission = useCallback((submission: Submission) => {
    dispatch({
      type: 'UPDATE_SUBMISSION',
      payload: submission,
    });
  }, []);

  const setSubmissions = useCallback((submissions: Submission[]) => {
    dispatch({
      type: 'SET_SUBMISSIONS',
      payload: submissions,
    });
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...notification,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        read: false,
      },
    });
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id,
    });
  }, []);

  const markAsRead = useCallback(() => {
    dispatch({
      type: 'MARK_AS_READ',
    });
  }, []);

  const resetRefreshLeaderboard = useCallback(() => {
    dispatch({
      type: 'RESET_REFRESH_LEADERBOARD',
    });
  }, []);

  const value = {
    state,
    selectedChallenge,
    modalOpen,
    setModalOpen,
    setSelectedChallenge,
    addSubmission,
    updateSubmission,
    setSubmissions,
    addNotification,
    removeNotification,
    markAsRead,
    selectedRank,
    setSelectedRank,
    ranks,
    setRanks,
    onSubmit,
    refetchChallenges,
    setRefetchChallenges,
    resetRefreshLeaderboard
  };

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
}

// Hook
export function useSubmissionContext() {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissionContext must be used within a SubmissionProvider');
  }
  return context;
} 