import { useEffect, useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Database,
  ChevronRight
} from 'lucide-react'; // Ícones corrigidos
import api from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/cases/')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-purple-500/30">
      
      {/* --- HERO SECTION (Estilo Inspiração) --- */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-20 overflow-hidden">
        {/* Fundo com efeito de rede/partículas (pode ser um SVG ou imagem) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-8 order-2 lg:order-1">
            <p className="text-purple-400 font-mono tracking-widest uppercase text-sm">Olá, eu sou o Paulo Gabriel 👋</p>
            
            <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-tight">
              Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Developer</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              Bacharel em Ciência e Tecnologia pela UFMA. Especialista em Backend e Automação, transformando desafios operacionais em soluções eficientes.
            </p>

            <div className="flex gap-6 pt-4">
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"><Github size={24}/></a>
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"><Linkedin size={24}/></a>
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"><Mail size={24}/></a>
            </div>
          </div>

          {/* FOTO À DIREITA (Circular com Neon) */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-72 h-72 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full border-2 border-purple-500/30 overflow-hidden p-3 bg-[#050505]">
                <img 
                  src="/profile.jpg" 
                  alt="Paulo Gomes" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE / FORMAÇÃO (Single Page) --- */}
      <section className="py-24 px-6 lg:px-20 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-bold text-white flex items-center gap-4 italic">
              <ChevronRight className="text-purple-500" /> Formação_E_Experiência
            </h2>
            <div className="space-y-6 text-lg border-l-2 border-purple-500/20 pl-6 ml-2">
              <div>
                <h4 className="font-bold text-white uppercase text-sm tracking-widest text-purple-400">Bacharel em Ciência e Tecnologia (UFMA)</h4>
                <p>Concluído em 2024. Foco em fundamentos de engenharia e computação.</p>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase text-sm tracking-widest text-purple-400">Data Analyst | SEAP-MA</h4>
                <p>Atuação estratégica em análise de dados e automação de escalas com Django.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Stack_Técnica</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <Terminal size={20} className="mx-auto mb-2 text-cyan-400" />
                <span className="text-xs font-bold uppercase">Backend</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <Cpu size={20} className="mx-auto mb-2 text-purple-400" />
                <span className="text-xs font-bold uppercase">Hardware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJETOS (Estilo Cards da Imagem 2) --- */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="text-5xl font-black text-white text-center uppercase tracking-tighter">Projetos_<span className="text-purple-500">Recentes</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group">
                <div className="aspect-video bg-black relative overflow-hidden">
                  <img src={project.cover_image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {project.solution_architecture}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <a href={project.github_link} className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-white transition-colors">
                      <Github size={16} /> GITHUB.COM
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}