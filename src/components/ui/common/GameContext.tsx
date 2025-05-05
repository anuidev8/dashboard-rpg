'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
  xp: number;
  level: number;
  badges: string[];
  quests: { id: string; title: string; completed: boolean }[];
};

type Action =
  | { type: 'ADD_XP'; payload: number }
  | { type: 'LEVEL_UP' }
  | { type: 'ADD_BADGE'; payload: string }
  | { type: 'COMPLETE_QUEST'; payload: string };

const initialState: State = {
  xp: 0,
  level: 1,
  badges: [],
  quests: [],
};

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_XP':
      return { ...state, xp: state.xp + action.payload };
    case 'LEVEL_UP':
      return { ...state, level: state.level + 1 };
    case 'ADD_BADGE':
      return { ...state, badges: [...state.badges, action.payload] };
    case 'COMPLETE_QUEST':
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest.id === action.payload ? { ...quest, completed: true } : quest
        ),
      };
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
