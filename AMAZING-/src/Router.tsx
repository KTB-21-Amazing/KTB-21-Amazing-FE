import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Game from './components/common/Game';
import MeetNPC from './pages/meetNPC/MeetNPC';
import Userform from './pages/userform/Userform';
import { GameProvider } from './context/GameContent';

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.navigateToMeetNPC = () => {
      navigate('/meet-npc'); // ✅ Phaser에서 호출 가능하도록 연결
    };
  }, [navigate]);

  return (
    <GameProvider>
    <Routes>
      <Route path="/" element={<Userform />} />
      <Route path="/maze" element={<Game />} />
      <Route path="/meet-npc" element={<MeetNPC />} />
    </Routes>
    </GameProvider>
  );
};

export default AppRouter;
