import Phaser from 'phaser';
import { useEffect, useRef, useState } from 'react';
import WholeMazeScene from '../../pages/wholeMaze/WholeMazeScene';
import ExitModal from './../wholeMaze/ExitModal';

const Game: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gameRef = useRef<Phaser.Game | null>(null); // 🟢 Phaser 게임 인스턴스를 저장할 ref 사용

  const handleModalClose = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false, // ✅ 충돌 박스 디버깅 비활성화
        },
      },
      scene: [WholeMazeScene],
      parent: 'game-container',
    };

    // ✅ Phaser 인스턴스가 없을 때만 생성
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    // ✅ 창 크기 변경 감지하여 Phaser 크기 조정
    const handleResize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // ✅ Phaser에서 React 모달을 열도록 설정
    window.openModal = () => setIsModalOpen(true);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null; // ✅ Phaser 인스턴스 해제
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 🟢 의존성 배열에서 `gameSize` 제거 → 한 번만 실행됨

  return (
    <div>
      <div id="game-container"></div>
      {isModalOpen && <ExitModal onClose={handleModalClose} />}
    </div>
  );
};

export default Game;
