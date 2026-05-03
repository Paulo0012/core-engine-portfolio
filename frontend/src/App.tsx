import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes de Estrutura
import Navbar from './layout/Sidebar'; // Seu novo menu superior

// Páginas do Ecossistema
import Dashboard from './pages/Dashboard'; // Agora sua Landing Page Única
import AdminDashboard from './pages/AdminDashboard';
import ProjectForm from './pages/ProjectForm';
import Login from './pages/Login';

/**
 * PROTOCOLO DE PROTEÇÃO DE NÓ (HOC)
 * Verifica a existência do Token JWT.
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/**
 * CORE_ENGINE_APPLICATION
 * Gerencia o roteamento centralizado com Navbar fixa no topo.
 */
function App() {
  return (
    <Router>
      {/* O Navbar fica fora das Routes para aparecer em todas as páginas.
          O fundo #050505 garante a estética Deep Black do seu projeto.
      */}
      <div className="min-h-screen bg-[#050505] flex flex-col">
        
        <Navbar />

        {/* Container Principal com padding-top (pt-20) 
            para o conteúdo não ficar sob o Navbar fixo.
        */}
        <main className="flex-1 pt-20">
          <Routes>
            
            {/* --- ACESSO PÚBLICO (Landing Page) --- */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />

            {/* --- ACESSO RESTRITO (Painel Administrativo) --- */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin/new" 
              className="mt-10"
              element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/admin/edit/:id" 
              element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              } 
            />

            {/* REDIRECIONAMENTO GLOBAL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;