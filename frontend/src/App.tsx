import { useState, useEffect } from 'react';
import { 
  Terminal, Cpu, Database, LayoutDashboard, 
  Settings, User, Code2, Microscope, Radio, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes Internos e API
import api from './api';
import TelemetryHeader from './components/TelemetryHeader';
import ProjectCard from './components/ProjectCard';
import SystemLogs from './components/SystemLogs';

// Importação da Imagem de Perfil Tratada
import profileImg from './assets/profile.png'; 

// Tipagem de Engenharia para os Projetos
interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string[];
  problem_statement: string;
  solution_architecture: string;
  impact_metrics: string;
  github_link?: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  // Hook de Carregamento (Handshake com o Core Engine Django)
  useEffect(() => {
    const loadSystemData = async () => {
      try {
        setLoading(true);
        // Busca os cases do backend
        const response = await api.get('/cases/');
        setProjects(response.data);
      } catch (error) {
        console.error("[CRITICAL] Failed to poll projects from Django Engine.");
      } finally {
        // Pequeno delay para simular o boot do SO industrial
        setTimeout(() => setLoading(false), 1200); 
      }
    };
    loadSystemData();
  }, []);

  // Lógica de Filtragem de Ativos
  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // SPLASH SCREEN DE BOOT
  if (loading) {
    return (
      <div className="h-screen w-full bg-eng-black flex items-center justify-center font-mono select-none">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-eng-cyan border-t-transparent animate-spin rounded-full glow-cyan" />
          <div className="text-center space-y-1">
            <span className="text-eng-cyan animate-pulse uppercase tracking-[0.4em] text-xs font-bold">
              Initializing_Soares_Gomes_OS...
            </span>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">Load_Core_Memory... OK</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-eng-black select-none text-slate-300 font-sans">
      
      {/* SIDEBAR: CONTROL UNIT & PROFILE */}
      <aside className="w-64 border-r border-eng-border bg-slate-900/20 flex flex-col z-20">
        
        {/* LOGO & BUILD INFO */}
        <div className="p-6 border-b border-eng-border">
          <h1 className="font-mono font-bold text-eng-cyan tracking-tighter flex items-center gap-2 uppercase">
            <Terminal size={20} /> SG_ENGINE.CORE
          </h1>
          <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-widest font-mono">
            Uptime: Stable_Node_01
          </p>
        </div>

        {/* PROFILE BLOCK INTEGRADO */}
        <div className="p-6 border-b border-eng-border bg-black/30 flex flex-col items-center text-center">
          <div className="relative mb-4 group">
            <div className="absolute inset-0 rounded-full bg-eng-cyan opacity-20 group-hover:opacity-40 blur-md transition-opacity" />
            <img 
              src={profileImg} 
              alt="Paulo Gomes - Engenheiro de Software" 
              className="w-24 h-24 rounded-full object-cover border-2 border-eng-cyan relative z-10 p-0.5 glow-cyan"
            />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight uppercase">Paulo Gomes</h2>
          <p className="text-[10px] font-mono text-eng-cyan uppercase tracking-wider mb-1">Software_Engineer</p>
          <p className="text-[10px] text-slate-500 font-light leading-relaxed">São Luís, MA | Especialista Fullstack & IoT</p>
        </div>

        {/* NAVEGAÇÃO TÉCNICA */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem 
            icon={<LayoutDashboard size={18}/>} 
            label="All_Systems" 
            active={filter === 'ALL'} 
            onClick={() => setFilter('ALL')} 
          />
          <NavItem icon={<Cpu size={18}/>} label="Hardware_IoT" active={filter === 'IOT'} onClick={() => setFilter('IOT')} />
          <NavItem icon={<Code2 size={18}/>} label="Backend_SaaS" active={filter === 'BE'} onClick={() => setFilter('BE')} />
          <NavItem icon={<Microscope size={18}/>} label="AI_Vision" active={filter === 'CV'} onClick={() => setFilter('CV')} />
          
          <div className="pt-6 pb-2 px-4 text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">External_Links</div>
          <NavItem icon={<User size={18}/>} label="Engineering_Bio" />
          <NavItem icon={<Radio size={18}/>} label="Live_Telemetry" />
        </nav>

        {/* STATUS BAR */}
        <div className="p-4 border-t border-eng-border bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-eng-green animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Secure_Shell_Active</span>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--color-eng-border)_0%,_transparent_1px)] bg-[size:40px_40px]">
        
        {/* HEADER DE TELEMETRIA ATIVA */}
        <TelemetryHeader />
        
        {/* ÁREA DE CONTEÚDO SCROLLABLE */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <header className="mb-10 flex justify-between items-end border-b border-eng-border pb-6">
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-white tracking-tighter uppercase font-mono">
                {filter}_Modules
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-eng-cyan to-transparent mt-2" />
            </div>
            <div className="text-[11px] font-mono text-slate-600 text-right uppercase tracking-wider">
              Nodes_Loaded: {filteredProjects.length}<br/>
              Location: São Luís, MA | SEAP-MA
            </div>
          </header>

          {/* GRID DE CASES COM ANIMAÇÃO */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* TERMINAL DE LOGS DE SISTEMA */}
        <SystemLogs />
      </main>
    </div>
  );
}

// Sub-componente de Navegação para manter o App.tsx limpo e tipado
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-sm transition-all font-mono text-[11px] uppercase tracking-wider
      ${active 
        ? 'bg-eng-cyan/10 text-eng-cyan border-l-2 border-eng-cyan glow-cyan' 
        : 'text-slate-600 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      <span className={active ? "text-eng-cyan" : "text-slate-500"}>{icon}</span>
      {label}
    </button>
  );
}

export default App;