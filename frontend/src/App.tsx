import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import EngineeringBio from './pages/EngineeringBio';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* O MainLayout contém a Sidebar, Header e SystemLogs fixos */}
        <Route path="/" element={<MainLayout />}>
          {/* Rota Principal: Grid de Projetos */}
          <Route index element={<Dashboard />} />
          
          {/* Rota de Biografia: Sua Identidade Visual e Acadêmica */}
          <Route path="bio" element={<EngineeringBio />} />
          
          {/* Rota de Detalhes: Deep Dive Técnico (Hardware/Software) */}
          <Route path="project/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;