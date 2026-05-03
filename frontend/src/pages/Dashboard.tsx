import { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Mail, Terminal, 
  Cpu, Code2, Database, BarChart3, 
  ChevronRight, ExternalLink, Play
} from 'lucide-react';
import api from '../services/api';

export default function LandingPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Carrega seus projetos do Django Ninja
    api.get('/cases/').then(res => setProjects(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center px-10 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm tracking-widest">
              <Terminal size={16} /> AVAILABLE_FOR_OPERATIONS
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl text-slate-400 font-medium tracking-tight">Olá, eu sou o Paulo Gabriel! 👋</h2>
              <h1 className="text-7xl font-bold text-white tracking-tighter leading-none">
                Software Developer <br />
                <span className="text-gradient">& Backend Engineer</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                Transformando desafios operacionais em infraestrutura escalável. 
                Bacharel em Ciência e Tecnologia pela UFMA e Residente em Sistemas Embarcados.
              </p>
            </div>

            <div className="flex gap-6 pt-4">
              <a href="https://github.com/paulogomes" className="p-4 rounded-full neon-border hover:bg-cyan-500/10 transition-all"><Github /></a>
              <a href="https://linkedin.com/in/paulogomes" className="p-4 rounded-full neon-border hover:bg-cyan-500/10 transition-all"><Linkedin /></a>
              <a href="mailto:contato@paulogomes.dev" className="p-4 rounded-full neon-border hover:bg-cyan-500/10 transition-all"><Mail /></a>
            </div>
          </div>

          {/* FOTO À ESQUERDA (ESTILO INSPIRAÇÃO) */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-80 h-80 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 animate-pulse blur-3xl opacity-20"></div>
              <div className="relative w-full h-full rounded-full border-2 border-cyan-500/30 overflow-hidden p-4">
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

      {/* --- TECH STACK (CARTÕES) --- */}
      <section className="py-32 px-10 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 neon-border bg-white/5 rounded-2xl space-y-4">
            <Code2 className="text-cyan-500" size={40} />
            <h3 className="text-2xl font-bold text-white">Linguagens & Web</h3>
            <p className="text-lg text-slate-500">Python (Django), PHP, TypeScript, React. Desenvolvimento focado em performance e segurança.</p>
          </div>
          <div className="p-10 neon-border bg-white/5 rounded-2xl space-y-4">
            <Cpu className="text-purple-500" size={40} />
            <h3 className="text-2xl font-bold text-white">Embarcados & IA</h3>
            <p className="text-lg text-slate-500">RTOS, Raspberry Pi Pico W, MediaPipe, OpenCV. Integração entre hardware e visão computacional.</p>
          </div>
          <div className="p-10 neon-border bg-white/5 rounded-2xl space-y-4">
            <Database className="text-cyan-500" size={40} />
            <h3 className="text-2xl font-bold text-white">Dados & BI</h3>
            <p className="text-lg text-slate-500">Análise estratégica na SEAP-MA, automação de relatórios PDF e gestão de escalas complexas.</p>
          </div>
        </div>
      </section>

      {/* --- PROJETOS EM EVIDÊNCIA --- */}
      <section id="projects" className="py-32 px-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-white tracking-tighter">Ativos de <span className="text-gradient">Engenharia</span></h2>
            <p className="text-xl text-slate-500">Projetos reais com impacto operacional comprovado.</p>
          </div>

          <div className="grid grid-cols-1 gap-20">
            {projects.map((project: any) => (
              <div key={project.id} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center neon-border p-10 rounded-3xl bg-white/5">
                <div className="space-y-6">
                  <div className="text-cyan-500 font-mono text-sm tracking-widest">{project.category}</div>
                  <h3 className="text-4xl font-bold text-white">{project.title}</h3>
                  <p className="text-xl text-slate-400 leading-relaxed">{project.solution_architecture}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm">{tech}</span>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-4">
                    <button className="flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-colors">
                      <Play size={20} /> VIEW_DEMO
                    </button>
                    <a href={project.github_link} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                      <Github size={20} /> REPOSITORY
                    </a>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video">
                  <img 
                    src={project.cover_image || "/placeholder.jpg"} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTATO --- */}
      <footer className="py-20 border-t border-white/5 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Vamos construir o próximo nível?</h2>
        <p className="text-slate-500 italic">“Transformando desafios operacionais em soluções tecnológicas eficientes.”</p>
      </footer>
    </div>
  );
}