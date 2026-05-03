import { useEffect, useState } from 'react';
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
  FileText,
  ChevronRight
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/cases/').then(res => setProjects(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION (A sua foto e o seu título) --- */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-20 pt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm tracking-[0.2em]">
              <Terminal size={18} /> AVAILABLE_FOR_OPERATIONS
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl text-slate-400 font-light uppercase tracking-widest">Paulo Gabriel Soares Gomes</h2>
              <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                Software <br /> 
                <span className="text-gradient">Developer</span> <br />
                & Backend
              </h1>
              <p className="text-xl lg:text-2xl text-slate-500 max-w-xl leading-relaxed font-light">
                Bacharel em Ciência e Tecnologia pela UFMA. Especialista em automação tática e sistemas de missão crítica.
              </p>
            </div>

            <div className="flex gap-8 pt-4">
              <a href="https://github.com/paulogomes" className="p-4 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"><Github size={24}/></a>
              <a href="https://linkedin.com/in/paulogomes" className="p-4 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"><Linkedin size={24}/></a>
              <a href="mailto:contato@paulogomes.dev" className="p-4 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"><Mail size={24}/></a>
            </div>
          </div>

          {/* FOTO À DIREITA (ESTILO INSPIRAÇÃO) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 lg:w-[500px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 animate-pulse blur-[100px] opacity-20"></div>
              <div className="relative w-full h-full rounded-full border-[1px] border-cyan-500/30 overflow-hidden p-3 bg-[#050505]">
                <img 
                  src="/profile.jpg" 
                  alt="Paulo Gomes" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000 scale-110" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE MIM & FORMAÇÃO (TUDO EM UM SÓ LUGAR) --- */}
      <section className="py-32 px-6 lg:px-20 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4">
              <ChevronRight className="text-cyan-500" /> Formação_e_Experiência
            </h2>
            
            <div className="space-y-10 border-l-2 border-white/5 pl-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                <h4 className="text-xl font-bold text-white">Bacharel em Ciência e Tecnologia — UFMA</h4>
                <p className="text-slate-500 italic">Concluído em 2024</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                <h4 className="text-xl font-bold text-white">Engenharia de Computação — UFMA</h4>
                <p className="text-slate-500 italic">Em andamento</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-cyan-500"></div>
                <h4 className="text-xl font-bold text-white">Data Analyst — SEAP-MA</h4>
                <p className="text-slate-500">Atuação estratégica e automação de processos táticos.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
             <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Stack_Técnica</h2>
             <div className="grid grid-cols-1 gap-4">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <Code2 className="text-cyan-500" />
                  <div><p className="text-sm text-slate-500">Backend</p><p className="font-bold text-white">Python / Django Ninja</p></div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <Cpu className="text-purple-500" />
                  <div><p className="text-sm text-slate-500">Hardware</p><p className="font-bold text-white">RTOS / Sistemas Embarcados</p></div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <Database className="text-cyan-500" />
                  <div><p className="text-sm text-slate-500">Data</p><p className="font-bold text-white">SQL / Automação BI</p></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PROJETOS (GRID GRANDE) --- */}
      <section id="projects" className="py-32 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
            <h2 className="text-6xl font-black text-white tracking-tighter italic">Projetos_<span className="text-gradient">Engine</span></h2>
            <p className="text-xl text-slate-500 font-light max-w-md">Soluções reais desenvolvidas com rigor técnico e foco em escalabilidade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project: any) => (
              <div key={project.id} className="group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 p-8 space-y-6">
                
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                   <img 
                    src={project.cover_image || "/placeholder.jpg"} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute top-4 left-4 px-4 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-white/10">
                    {project.category}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed line-clamp-3">{project.solution_architecture}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono">{tech}</span>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-6">
                    <button className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors">
                      <Play size={18} /> VIEW_DEMO
                    </button>
                    <a href={project.github_link} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors">
                      <Github size={18} /> REPOSITORY
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-slate-500 italic text-xl">“Transformando desafios operacionais em soluções tecnológicas eficientes.”</p>
          <div className="flex justify-center gap-8 text-slate-600">
            <span className="text-xs tracking-widest">© 2026 PAULO GOMES</span>
            <span className="text-xs tracking-widest">MADE_IN_MARANHÃO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}