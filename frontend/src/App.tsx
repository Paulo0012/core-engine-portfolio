import { useState, useEffect } from 'react';
import { 
  Terminal, Cpu, Database, LayoutDashboard, 
  User, Code2, Microscope, Radio, Plus, LogOut, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes de Serviço e UI
import api from './services/api';
import TelemetryHeader from './components/TelemetryHeader';
import ProjectCard from './components/ProjectCard';
import SystemLogs from './components/SystemLogs';
import LoginModal from './components/LoginModal';
import CreateProjectModal from './components/CreateProjectModal';

interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string[];
  problem_statement: string;
  impact_metrics: string;
  github_link?: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Função de Handshake com o Backend
  const loadProjects = async () => {
    try {
      const response = await api.get('/cases/');
      setProjects(response.data);
    } catch (error) {
      console.error("[CRITICAL] Failed to poll projects from engine.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload(); 
  };

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-eng-black select-none text-slate-300">
      
      {/* SIDEBAR: CONTROL UNIT */}
      <aside className="w-64 border-r border-eng-border bg-slate-900/20 flex flex-col z-20">
        <div className="p-6 border-b border-eng-border">
          <h1 className="font-mono font-bold text-eng-cyan tracking-tighter flex items-center gap-2 uppercase">
            <Terminal size={20} /> SG_ENGINE.CORE
          </h1>
          <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-widest font-mono">
            Status: Active_Stable
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard size={18}/>} label="All_Nodes" active={filter === 'ALL'} onClick={() => setFilter('ALL')} />
          <NavItem icon={<Cpu size={18}/>} label="Hardware_IoT" active={filter === 'IOT'} onClick={() => setFilter('IOT')} />
          <NavItem icon={<Code2 size={18}/>} label="Backend_SaaS" active={filter === 'BE'} onClick={() => setFilter('BE')} />
          <NavItem icon={<Microscope size={18}/>} label="AI_Vision" active={filter === 'CV'} onClick={() => setFilter('CV')} />
          
          <div className="pt-6 pb-2 px-4 text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">External</div>
          <NavItem icon={<User size={18}/>} label="Eng_Bio" />
          <NavItem icon={<Radio size={18}/>} label="Live_Feed" />
        </nav>

        {/* ADMIN CONTROL PANEL */}
        <div className="p-4 border-t border-eng-border bg-black/40 space-y-3">
          {isAuthenticated ? (
            <>
              <button 
                className="w-full flex items-center gap-2 text-[10px] font-mono text-eng-cyan hover:text-white transition-all bg-eng-cyan/5 p-2 border border-eng-cyan/20"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus size={14} /> NEW_PROJECT_ENTRY
              </button>
              <button 
                className="w-full flex items-center gap-2 text-[10px] font-mono text-red-500 hover:text-white transition-colors p-2"
                onClick={handleLogout}
              >
                <LogOut size={14} /> TERMINATE_SESSION
              </button>
            </>
          ) : (
            <button 
              className="w-full flex items-center gap-2 text-[10px] font-mono text-slate-600 hover:text-eng-cyan transition-colors p-2"
              onClick={() => setIsLoginOpen(true)}
            >
              <ShieldAlert size={14} /> ADMIN_ACCESS
            </button>
          )}
          <div className="flex items-center gap-3 pt-2">
            <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-eng-cyan shadow-[0_0_8px_#06b6d4]' : 'bg-eng-green shadow-[0_0_8px_#10b981]'} animate-pulse`} />
            <span className="text-[9px] font-mono text-slate-600 uppercase">
              {isAuthenticated ? 'ROOT_USER' : 'GUEST_MODE'}
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--color-eng-border)_0%,_transparent_1px)] bg-[size:40px_40px]">
        <TelemetryHeader />
        
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <header className="mb-10 flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-white tracking-tighter uppercase font-mono">
                {filter}_SYSTEMS
              </h2>
              <div className="h-0.5 w-32 bg-gradient-to-r from-eng-cyan to-transparent" />
            </div>
          </header>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <SystemLogs />
      </main>

      {/* MODALS DE GESTÃO */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={() => setIsAuthenticated(true)} 
      />
      <CreateProjectModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onRefresh={loadProjects} 
      />
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-[10px] uppercase tracking-widest
      ${active 
        ? 'bg-eng-cyan/10 text-eng-cyan border-l-2 border-eng-cyan glow-cyan' 
        : 'text-slate-600 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default App;