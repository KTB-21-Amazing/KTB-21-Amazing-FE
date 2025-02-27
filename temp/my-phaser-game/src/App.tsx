import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import gameConfig from './game';

const GameComponent: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let game: Phaser.Game | null = null;

    if (gameRef.current) {
      game = new Phaser.Game({ ...gameConfig, parent: gameRef.current });
    }

    return () => {
      game?.destroy(true);
    };
  }, []);

  return <div ref={gameRef} id="phaser-game"></div>;
};

export default function App() {
  return (
    <div>
      <h1>React + Phaser Game</h1>
      <GameComponent />
    </div>
  );
}
