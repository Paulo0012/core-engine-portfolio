import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import EngineeringBio from './pages/EngineeringBio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bio" element={<EngineeringBio />} />
          {/* Rotas futuras como Detalhes de Projeto aqui */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;