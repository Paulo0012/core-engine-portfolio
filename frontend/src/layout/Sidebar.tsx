import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Cpu, Code2, 
  ScanEye, UserCircle, Radio, ShieldCheck 
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dash', label: 'DASHBOARD_GERAL', icon: <LayoutDashboard size={22} />, path: '/' },
    { id: 'iot', label: 'HARDWARE_IOT', icon: <Cpu size={22} />, path: '/iot' },
    { id: 'saas', label: 'BACKEND_SAAS', icon: <Code2 size={22} />, path: '/saas' },
    { id: 'cv', label: 'AI_COMPUTER_VISION', icon: <ScanEye size={22} />, path: '/cv' },
    { id: 'bio', label: 'ENGINEERING_BIO', icon: <UserCircle size={22} />, path: '/bio' },
    { id: 'live', label: 'LIVE_FEED', icon: <Radio size={22} />, path: '/live' },
  ];

  return (
    <aside className="w-80 h-full border-r border-eng-border bg-eng-black p-8 flex flex-col gap-10">
      {/* Brand Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-black text-eng-cyan tracking-tighter flex items-center gap-2">
          {'>'}_ SG_ENGINE.CORE
        </h1>
        <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">Build: 2026.03.27_Stable</p>
      </div>

      {/* Perfil (Root_Engineer) */}
      <div className="flex items-center gap-4 p-4 border border-eng-border/50 bg-white/5 rounded-sm">
        <div className="relative">
           <div className="w-14 h-14 rounded-full border-2 border-eng-cyan overflow-hidden bg-slate-800">
              <img src="/profile.png" alt="Root" className="grayscale" />
           </div>
           <div className="absolute bottom-0 right-0 w-3 h-3 bg-eng-green rounded-full border-2 border-eng-black" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-tight">Paulo Gomes</h3>
          <p className="text-[10px] text-eng-cyan font-mono italic">ROOT_ENGINEER</p>
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 space-y-3">
        <span className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.5em] block mb-6">Sistemas</span>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 p-4 transition-all duration-300 border-l-2 text-base font-medium tracking-tight
              ${location.pathname === item.path 
                ? 'bg-eng-cyan/10 border-eng-cyan text-eng-cyan shadow-[inset_10px_0_20px_-10px_rgba(6,182,212,0.2)]' 
                : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'
              }`}
          >
            {item.icon}
            <span className="uppercase">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Admin Quick Access */}
      <button 
        onClick={() => navigate('/admin')}
        className="mt-auto flex items-center gap-4 p-4 text-slate-600 hover:text-eng-cyan border border-dashed border-slate-800 hover:border-eng-cyan/50 transition-all uppercase text-sm font-mono tracking-widest"
      >
        <ShieldCheck size={20} /> Access_Vault
      </button>
    </aside>
  );
}