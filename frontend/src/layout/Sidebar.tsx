import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  // Itens exatamente como você pediu nas imagens de referência
  const menuItems = [
    { label: 'Formações', id: 'formacoes' },
    { label: 'Sobre mim', id: 'sobre-detalhe' },
    { label: 'Soft skills', id: 'skills' },
    { label: 'Linguagens', id: 'linguagens' },
    { label: 'Projetos', id: 'projetos' },
    { label: 'Contato', id: 'contato' },
  ];

  /**
   * Função de Navegação e Scroll
   * Se o usuário estiver em outra página (ex: Admin), ele volta para a Home e depois faz o scroll.
   */
  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Se não encontrar o ID (está em outra rota), vai para a home
      navigate('/');
      // Timeout pequeno para dar tempo do React carregar a Home antes de scrollar
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-md border-b border-white/5 z-50 px-6 lg:px-20 flex items-center justify-between">
      
      {/* Brand / Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
          <Terminal size={20} className="text-purple-500" />
        </div>
        <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
          Paulo<span className="text-purple-500">Gomes</span>
        </h1>
      </div>

      {/* Links de Navegação (Desktop) */}
      <div className="hidden xl:flex items-center gap-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className="text-[11px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em] relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-500 transition-all group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Botão de Ação / Admin */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => handleNavigation('contato')}
          className="hidden md:block px-6 py-2 bg-white text-black text-[10px] font-black uppercase rounded-full hover:bg-purple-500 hover:text-white transition-all"
        >
          Trabalhe Comigo
        </button>
        
        {/* Atalho para o Admin (Discreto) */}
        <button 
          onClick={() => navigate('/login')}
          className="p-2 text-slate-700 hover:text-purple-500 transition-colors"
          title="Acesso Restrito"
        >
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </button>
      </div>
    </nav>
  );
}