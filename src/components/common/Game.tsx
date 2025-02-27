import Phaser from 'phaser';
import { useEffect, useState } from 'react';
import Userform from '../../pages/userform/Userform';
import WholeMazeScene from '../../pages/wholeMaze/WholeMazeScene';
import ExitModal from './../wholeMaze/ExitModal';

const Game: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameSize, setGameSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
    console.log(isModalOpen);
  };

  useEffect(() => {
    // ✅ 화면 크기 동적 조정
    const handleResize = () => {
      setGameSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: gameSize.width,
      height: gameSize.height,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false, // ✅ 디버그 모드 활성화 (충돌 박스 확인)
        },
      },
      scene: [Userform, WholeMazeScene],
      parent: 'game-container',
    };

    const game = new Phaser.Game(config);

    // ✅ Phaser에서 React 모달을 열도록 설정 (타입 명확하게 지정)
    window.openModal = () => setIsModalOpen(true);

    return () => {
      game.destroy(true);
      window.removeEventListener('resize', handleResize);
    };
  }, [gameSize]);

  return (
    <div>
      <div id="game-container"></div>
      {isModalOpen && <ExitModal onClose={handleModalClose} />}
    </div>
  );
};

export default Game;
