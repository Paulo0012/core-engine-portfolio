import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import EngineeringBio from './pages/EngineeringBio';
import ProjectDetails from './pages/ProjectDetails';
import AdminDashboard from './pages/AdminDashboard';
import ProjectForm from './pages/ProjectForm';
import Login from './pages/Login';

// HOC (Higher Order Component) para Proteger as Rotas de Admin
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Camada de Layout: Sidebar, Header e Logs fixos para todas as páginas */}
        <Route path="/" element={<MainLayout />}>
          
          {/* VISTAS PÚBLICAS */}
          <Route index element={<Dashboard />} />
          <Route path="bio" element={<EngineeringBio />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="login" element={<Login />} />

          {/* VISTAS ADMINISTRATIVAS (PROTEGIDAS) */}
          <Route 
            path="admin" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Rota para Criar Novo Projeto */}
          <Route 
            path="admin/new" 
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            } 
          />

          {/* Rota para Editar Projeto Existente */}
          <Route 
            path="admin/edit/:id" 
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            } 
          />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;