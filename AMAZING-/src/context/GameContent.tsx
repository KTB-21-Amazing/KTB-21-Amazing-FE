// src/context/GameContext.tsx (새 파일 생성)
import { createContext, useContext, useState } from 'react';

interface GameContextProps {
  backgroundImage: string;
  setBackgroundImage: (image: string) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  return (
    <GameContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
