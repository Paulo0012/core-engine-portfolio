import { useNavigate } from 'react-router-dom';

/**
 * NAVBAR_TOP_ENGINE
 * Navegação superior unificada baseada nas referências de UI.
 */
export default function Navbar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Formações', id: 'formacoes' },
    { label: 'Sobre mim', id: 'sobre' },
    { label: 'Soft skills', id: 'skills' },
    { label: 'Linguagens', id: 'linguagens' },
    { label: 'Projetos', id: 'projetos' },
    { label: 'Certificados', id: 'certificados' },
    { label: 'Contato', id: 'contato' },
  ];

  // Função para scroll suave até a seção
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/'); // Se não estiver na home, volta para ela
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-xl border-b border-white/5 z-50 px-6 lg:px-20 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
          Paulo<span className="text-purple-500">Gomes</span>
        </h1>
      </div>

      {/* Nav Links (Inspirado na imagem e0a586.png) */}
      <div className="hidden xl:flex items-center gap-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-sm font-medium text-slate-400 hover:text-white transition-all uppercase tracking-widest"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Call to Action (Inspirado na imagem e1869e.png) */}
      <button 
        onClick={() => scrollToSection('contato')}
        className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold uppercase rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all"
      >
        Hire Me
      </button>
    </nav>
  );
}