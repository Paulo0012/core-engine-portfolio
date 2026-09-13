import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, Home, User, GraduationCap, Code, Briefcase, Globe } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight <= 0) return;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', id: 'inicio', icon: Home },
    { label: 'Sobre mim', id: 'sobre-detalhe', icon: User },
    { label: 'Formações', id: 'formacoes', icon: GraduationCap },
    { label: 'Linguagens', id: 'linguagens', icon: Code },
    { label: 'Projetos', id: 'projetos', icon: Briefcase },
    { label: 'Contato', id: 'contato', icon: Globe },
  ];

  const handleNavigation = (id: string) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
      return;
    }
    
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/40 backdrop-blur-xl border-b border-white/20 z-50 px-6 lg:px-20 flex items-center justify-between shadow-sm">
      
      {/* Progress Bar Topo */}
      <div 
        className="absolute top-0 left-0 h-1 bg-gn-highlight z-50 transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Brand / Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => handleNavigation('inicio')}
      >
        <div className="p-2 bg-gn-highlight/5 rounded-lg group-hover:bg-gn-highlight/10 transition-colors shadow-sm bg-white/60">
          <Server size={20} className="text-gn-highlight" />
        </div>
        <h1 className="text-xl font-black text-gn-highlight tracking-tighter uppercase italic drop-shadow-sm hidden sm:block">
          Paulo<span className="text-gn-surface">Gomes</span>
        </h1>
      </div>

      {/* Links de Navegação (Desktop) */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {menuItems.map(({ label, id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleNavigation(id)}
            className="flex items-center gap-2 text-[11px] font-bold text-gn-surface hover:text-gn-highlight transition-all uppercase tracking-[0.1em] relative group"
          >
            <Icon size={16} className="transition-transform group-hover:scale-110" />
            <span>{label}</span>
            <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-gn-highlight transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Links de Navegação (Mobile / Tablet) */}
      <div className="flex lg:hidden items-center gap-4">
         {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => handleNavigation(id)}
            title={label}
            className="p-2 text-gn-surface hover:text-gn-highlight transition-colors rounded-lg hover:bg-white/50"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>

      {/* Botão de Ação / Admin */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          onClick={() => handleNavigation('contato')}
          className="px-6 py-2 bg-gn-highlight text-gn-bg text-[10px] font-black uppercase rounded-full hover:bg-gn-surface transition-all hover:shadow-lg hover:shadow-gn-highlight/20"
        >
          Trabalhe Comigo
        </button>
        
        {/* Atalho para o Admin (Discreto) */}
        <button 
          onClick={() => navigate('/login')}
          className="p-2 text-gn-surface hover:text-gn-highlight transition-colors"
          title="Acesso Restrito"
        >
          <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
        </button>
      </div>
    </nav>
  );
}