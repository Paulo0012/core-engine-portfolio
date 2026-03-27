import { NavLink } from 'react-router-dom';
import { 
  Terminal, Cpu, Database, LayoutDashboard, 
  User, Code2, Microscope, Radio, ShieldCheck 
} from 'lucide-react';
import profileImg from '../assets/profile.png'; 

export default function Sidebar() {
  return (
    <aside className="w-68 border-r border-eng-border bg-slate-900/40 flex flex-col z-20 backdrop-blur-md">
      
      {/* HEADER: SISTEMA OPERACIONAL */}
      <div className="p-6 border-b border-eng-border">
        <div className="flex items-center gap-2 text-eng-cyan mb-1">
          <Terminal size={18} />
          <h1 className="font-mono font-bold tracking-tighter text-sm uppercase">SG_ENGINE.CORE</h1>
        </div>
        <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Build: 2026.03.26_STABLE</p>
      </div>

      {/* PERFIL RÁPIDO: SUA IDENTIDADE VISUAL */}
      <NavLink 
        to="/bio" 
        className={({ isActive }) => `p-6 border-b border-eng-border flex items-center gap-4 transition-all hover:bg-white/5 ${isActive ? 'bg-eng-cyan/5' : ''}`}
      >
        <div className="relative">
          <img 
            src={profileImg} 
            alt="Paulo Gomes" 
            className="w-12 h-12 rounded-full object-cover border border-eng-cyan/50 p-0.5"
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-eng-green rounded-full border-2 border-eng-black animate-pulse" />
        </div>
        <div>
          <h2 className="text-xs font-bold text-white uppercase tracking-tight">Paulo Gomes</h2>
          <p className="text-[9px] font-mono text-slate-500 uppercase italic">Root_Engineer</p>
        </div>
      </NavLink>

      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="pb-2 px-4 text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">Sistemas</div>
        
        <SidebarLink to="/" icon={<LayoutDashboard size={18}/>} label="Dashboard_Geral" />
        <SidebarLink to="/hardware" icon={<Cpu size={18}/>} label="Hardware_IoT" />
        <SidebarLink to="/backend" icon={<Code2 size={18}/>} label="Backend_SaaS" />
        <SidebarLink to="/ai" icon={<Microscope size={18}/>} label="AI_Computer_Vision" />
        
        <div className="pt-6 pb-2 px-4 text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">Documentação</div>
        <SidebarLink to="/bio" icon={<User size={18}/>} label="Engineering_Bio" />
        <SidebarLink to="/telemetry" icon={<Radio size={18}/>} label="Live_Feed" />
      </nav>

      {/* FOOTER: STATUS DE SEGURANÇA */}
      <div className="p-4 border-t border-eng-border bg-black/40">
        <div className="flex items-center gap-3 px-2">
          <ShieldCheck size={14} className="text-eng-green shadow-glow-green" />
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic">
            Secure_Shell_Active
          </span>
        </div>
      </div>
    </aside>
  );
}

// Sub-componente interno para links estilizados
function SidebarLink({ to, icon, label }: { to: string, icon: any, label: string }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-[10px] uppercase tracking-wider
        ${isActive 
          ? 'bg-eng-cyan/10 text-eng-cyan border-l-2 border-eng-cyan glow-cyan' 
          : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
        }
      `}
    >
      <span className="opacity-80">{icon}</span>
      {label}
    </NavLink>
  );
}