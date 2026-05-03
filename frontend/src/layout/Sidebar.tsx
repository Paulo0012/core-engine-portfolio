import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Cpu, Code2, 
  ScanEye, UserCircle, Radio, ShieldCheck 
} from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { id: 'iot', label: 'Hardware', icon: <Cpu size={20} />, path: '/iot' },
    { id: 'saas', label: 'Backend', icon: <Code2 size={20} />, path: '/saas' },
    { id: 'cv', label: 'AI Vision', icon: <ScanEye size={20} />, path: '/cv' },
    { id: 'bio', label: 'Bio', icon: <UserCircle size={20} />, path: '/bio' },
    { id: 'live', label: 'Live', icon: <Radio size={20} />, path: '/live' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-md border-b border-white/10 z-50 px-10 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-cyan-500/50 overflow-hidden bg-slate-900">
           <img src="/profile.jpg" alt="Paulo" className="w-full h-full object-cover grayscale" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tighter uppercase font-mono">
          SG_ENGINE<span className="text-cyan-500">.CORE</span>
        </h1>
      </div>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all
              ${location.pathname === item.path ? 'text-cyan-400' : 'text-slate-500 hover:text-white'}
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Action */}
      <button 
        onClick={() => navigate('/admin')}
        className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase hover:bg-cyan-500 hover:text-black transition-all rounded-full"
      >
        Hire Me
      </button>
    </nav>
  );
}