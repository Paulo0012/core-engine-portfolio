import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Páginas do Ecossistema
import Dashboard from './pages/Dashboard';
import EngineeringBio from './pages/EngineeringBio';
import ProjectDetails from './pages/ProjectDetails';
import AdminDashboard from './pages/AdminDashboard';
import ProjectForm from './pages/ProjectForm';
import Login from './pages/Login';

/**
 * PROTOCOLO DE PROTEÇÃO DE NÓ (HOC)
 * Verifica a existência do Token JWT no armazenamento local.
 * Se ausente, redireciona o intruso para o Login_Gateway.
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Camada de Gabinete: Sidebar, Header e Logs fixos */}
        <Route path="/" element={<MainLayout />}>
          
          {/* --- VISTAS PÚBLICAS (OPEN_ACCESS) --- */}
          <Route index element={<Dashboard />} />
          <Route path="bio" element={<EngineeringBio />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="login" element={<Login />} />

          {/* --- VISTAS ADMINISTRATIVAS (RESTRICTED_ACCESS) --- */}
          
          {/* Painel de Controle Principal */}
          <Route 
            path="admin" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Inserção de Novo Ativo (Equatorial, SEAP, etc) */}
          <Route 
            path="admin/new" 
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            } 
          />

          {/* Edição de Ativo Existente via ID_NODE */}
          <Route 
            path="admin/edit/:id" 
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            } 
          />

        </Route>

        {/* CATCH_ALL: Redireciona rotas inexistentes para o Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;