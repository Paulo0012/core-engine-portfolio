import { useEffect, useState } from 'react';
// Correção dos imports: Removido o que causava erro e padronizado
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Code2, 
  Database, 
  ExternalLink, 
  Play,
  ChevronRight,
  Monitor,
  Smartphone
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Carregamento dinâmico dos seus projetos do Django
    api.get('/cases/')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Erro ao carregar projetos:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION (Inspirada na Imagem do Victor) --- */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-20">
        {/* Fundo com efeito de rede/tecnologia opcional via CSS pode ser adicionado aqui */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-sm tracking-widest uppercase">
              <Terminal size={18} /> Engine Operacional
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl text-slate-400 font-light">Olá, eu sou o Paulo Gabriel</h2>
              <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">
                Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Developer</span> <br /> 
                + Backend
              </h1>
              <p className="text-xl lg:text-2xl text-slate-500 max-w-xl leading-relaxed">
                Transformando desafios operacionais em soluções tecnológicas eficientes. Bacharel em Ciência e Tecnologia pela UFMA.
              </p>
            </div>

            {/* Redes Sociais com ícones corrigidos */}
            <div className="flex gap-8 pt-4">
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white"><Github size={28}/></a>
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white"><Linkedin size={28}/></a>
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white"><Mail size={28}/></a>
            </div>
          </div>

          {/* FOTO CIRCULAR COM EFEITO NEON (Lado Direito) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 lg:w-[480px] lg:h-[480px]">
              {/* Brilho Neon Externo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 blur-[60px] opacity-20"></div>
              {/* Borda Neon Fina */}
              <div className="relative w-full h-full rounded-full border-2 border-purple-500/40 overflow-hidden p-2 bg-[#050505]">
                <img 
                  src="/profile.jpg" 
                  alt="Paulo Gabriel" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO SOBRE MIM & FORMAÇÃO --- */}
      <section className="py-32 px-6 lg:px-20 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4 uppercase">
              <ChevronRight className="text-purple-500" /> Formação_Acadêmica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-2xl font-bold text-white">Bacharel em C&T</h4>
                <p className="text-slate-400 text-lg leading-relaxed">Concluído em 2024 pela UFMA. Base sólida em lógica e fundamentos de engenharia.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-2xl font-bold text-white">Engenharia de Computação</h4>
                <p className="text-slate-400 text-lg leading-relaxed">Graduando pela UFMA com foco em sistemas complexos e arquitetura de hardware.</p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Stack_Expertise</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-xl bg-purple-500/5 border border-purple-500/10">
                <Code2 className="text-purple-500" size={32} />
                <span className="text-xl font-bold text-white">Backend (Python/Django)</span>
              </div>
              <div className="flex items-center gap-6 p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                <Cpu className="text-cyan-500" size={32} />
                <span className="text-xl font-bold text-white">Sistemas Embarcados</span>
              </div>
              <div className="flex items-center gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
                <Database className="text-slate-400" size={32} />
                <span className="text-xl font-bold text-white">Data Analyst & BI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PROJETOS (Inspirada no Layout de Cards que você enviou) --- */}
      <section id="projects" className="py-32 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase">Meus_<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projetos</span></h2>
            <p className="text-xl text-slate-500">Persistência de dados e eficiência operacional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project: any) => (
              <div key={project.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.cover_image || "/placeholder.jpg"} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                  />
                </div>
                <div className="p-10 space-y-6">
                  <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed line-clamp-3">{project.solution_architecture}</p>
                  
                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <a href={project.github_link} className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-colors">
                      <Github size={18} /> GITHUB.COM
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-slate-500 text-lg uppercase tracking-widest font-mono">
          Transformando Desafios em Tecnologia © 2026
        </p>
      </footer>
    </div>
  );
}