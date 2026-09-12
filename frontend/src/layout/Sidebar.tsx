import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Formações', id: 'formacoes' },
    { label: 'Sobre mim', id: 'sobre-detalhe' },
    { label: 'Soft skills', id: 'skills' },
    { label: 'Linguagens', id: 'linguagens' },
    { label: 'Projetos', id: 'projetos' },
    { label: 'Contato', id: 'contato' },
  ];

  const handleNavigation = (id: string) => {
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
    <nav className="fixed top-0 left-0 right-0 h-20 bg-gn-bg/90 backdrop-blur-md border-b border-gn-surface/20 z-50 px-6 lg:px-20 flex items-center justify-between">
      
      {/* Brand / Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="p-2 bg-gn-highlight/5 rounded-lg group-hover:bg-gn-highlight/10 transition-colors">
          <Terminal size={20} className="text-gn-highlight" />
        </div>
        <h1 className="text-xl font-black text-gn-highlight tracking-tighter uppercase italic">
          Paulo<span className="text-gn-surface">Gomes</span>
        </h1>
      </div>

      {/* Links de Navegação (Desktop) */}
      <div className="hidden xl:flex items-center gap-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className="text-[11px] font-bold text-gn-surface hover:text-gn-highlight transition-all uppercase tracking-[0.2em] relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gn-highlight transition-all group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Botão de Ação / Admin */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => handleNavigation('contato')}
          className="hidden md:block px-6 py-2 bg-gn-highlight text-gn-bg text-[10px] font-black uppercase rounded-full hover:bg-gn-surface transition-all"
        >
          Trabalhe Comigo
        </button>
        
        {/* Atalho para o Admin (Discreto) */}
        <button 
          onClick={() => navigate('/login')}
          className="p-2 text-gn-surface hover:text-gn-highlight transition-colors"
          title="Acesso Restrito"
        >
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </button>
      </div>
    </nav>
  );
}