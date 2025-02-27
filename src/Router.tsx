import { Routes, Route } from 'react-router-dom';
import Userform from './pages/userform/userform';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Userform />} />
    </Routes>
  );
};

export default AppRouter;
