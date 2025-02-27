import { Routes, Route } from 'react-router-dom';
import Userform from './pages/userform/Userform';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Userform />} />
    </Routes>
  );
};

export default AppRouter;
