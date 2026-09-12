import { useEffect, useState } from 'react';
// Imports revisados para evitar erros de compilação
import { 
  Mail, 
  Code2, 
  ExternalLink, 
  Terminal,
  Briefcase
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/cases/')
      .then(res => setProjects(res.data))
      .catch(e => console.error("Erro na API:", e));
  }, []);

  return (
    <div className="space-y-32 pb-32 px-6 lg:px-20 max-w-7xl mx-auto">
      
      {/* --- HERO --- */}
      <section id="sobre" className="min-h-[90vh] flex items-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8">
            <p className="text-purple-500 font-mono font-bold tracking-[0.3em] uppercase flex items-center gap-2">
              <Terminal size={18} /> I am Paulo Gomes
            </p>
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tighter">
              Software Developer <br />
              <span className="text-slate-500">+ Backend Engineer</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Bacharel em C&T e Graduando em Engenharia de Computação pela UFMA. 
              Especialista em automação e infraestrutura escalável.
            </p>
            <div className="flex gap-6">
               <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
                  <p className="text-3xl font-bold text-white">2+</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Anos Exp.</p>
               </div>
               <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
                  <p className="text-3xl font-bold text-white">10+</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Projetos</p>
               </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-80 h-80 lg:w-[480px] lg:h-[480px] rounded-full border-2 border-purple-500/30 p-3 bg-black">
                <img src="/profile.jpg" alt="Paulo Gomes" className="w-full h-full object-cover object-top rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMAÇÕES --- */}
      <section id="formacoes" className="scroll-mt-32">
        <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4 italic underline decoration-purple-500">
          Formações_
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-base">
          <div className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl space-y-4">
            <h4 className="text-purple-500 font-bold">2024 / Concluído</h4>
            <h3 className="text-2xl font-bold text-white">Bacharel em Ciência e Tecnologia</h3>
            <p className="text-slate-500">UFMA - Universidade Federal do Maranhão</p>
          </div>
          <div className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl space-y-4">
            <h4 className="text-purple-500 font-bold">Em andamento</h4>
            <h3 className="text-2xl font-bold text-white">Engenharia de Computação</h3>
            <p className="text-slate-500">UFMA / Residência em Embarcados IFMA</p>
          </div>
        </div>
      </section>

      {/* --- EXPERIÊNCIA (SOBRE MIM) --- */}
      <section id="sobre-detalhe" className="scroll-mt-32">
        <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4 italic underline decoration-purple-500">
          Experiência_Profissional
        </h2>
        <div className="space-y-8">
          <div className="flex gap-6 p-8 bg-white/5 rounded-3xl border border-white/10">
            <Briefcase className="text-purple-500 shrink-0" size={32} />
            <div>
              <h3 className="text-xl font-bold text-white">Data Analyst | SEAP-MA</h3>
              <p className="text-purple-400 font-mono text-sm">2024 - Atual</p>
              <p className="text-slate-500 mt-4 text-lg">Atuação estratégica com foco em análise de dados, automação de processos táticos e gestão de escalas com Django.</p>
            </div>
          </div>
          <div className="flex gap-6 p-8 bg-white/5 rounded-3xl border border-white/10">
            <Briefcase className="text-slate-500 shrink-0" size={32} />
            <div>
              <h3 className="text-xl font-bold text-white">Assistente Técnico | Infogames</h3>
              <p className="text-purple-400 font-mono text-sm">2 Anos</p>
              <p className="text-slate-500 mt-4 text-lg">Manutenção, suporte e soluções de automação comercial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LINGUAGENS --- */}
      <section id="linguagens" className="scroll-mt-32">
        <h2 className="text-4xl font-bold text-white mb-12 italic underline decoration-cyan-500">
          Linguagens_ & Stack_
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['Python', 'Django', 'React', 'PHP', 'TypeScript', 'SQL', 'C++', 'OpenCV'].map(item => (
            <div key={item} className="p-8 border border-white/5 bg-white/5 rounded-2xl flex flex-col items-center gap-4 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
              <Code2 className="text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white text-base">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJETOS --- */}
      <section id="projetos" className="scroll-mt-32">
        <h2 className="text-5xl font-black text-white mb-16 text-center tracking-tighter uppercase">
          Meus_<span className="text-purple-500">Projetos</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p: any) => {
            const coverUrl = p.cover_image?.startsWith('http') 
              ? p.cover_image 
              : p.cover_image 
                ? `http://localhost:8000${p.cover_image}`
                : '';
                
            return (
              <div key={p.id} className="bg-[#0c0c0c] flex flex-col border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-purple-500/30 transition-all">
                <div className="aspect-video bg-black overflow-hidden relative">
                  {coverUrl && (
                    <img src={coverUrl} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  )}
                  <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full border border-white/10">
                     <ExternalLink size={16} className="text-white" />
                  </div>
                </div>
                <div className="p-10 space-y-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{p.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3">{p.problem_statement || p.description}</p>
                  
                  <div className="flex flex-wrap gap-2 flex-1">
                    {p.technologies?.map((t: string) => (
                      <span key={t} className="text-[10px] px-3 py-1 bg-white/5 rounded-full border border-white/10 text-slate-400 uppercase font-bold h-fit">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-mono" title={p.impact_metrics}>Case_Study_v1.0</span>
                    <div className="flex gap-4">
                      {p.github_link && (
                        <a href={p.github_link} target="_blank" rel="noopener noreferrer">
                          <Code2 className="text-slate-500 hover:text-purple-500 cursor-pointer transition-colors" size={20} />
                        </a>
                      )}
                      {p.live_demo && (
                        <a href={p.live_demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="text-slate-500 hover:text-purple-500 cursor-pointer transition-colors" size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SOFT SKILLS --- */}
      <section id="skills" className="scroll-mt-32">
        <h2 className="text-4xl font-bold text-white mb-12 italic underline decoration-purple-500 text-right">
          _SoftSkills
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Liderança Acadêmica', 'Pensamento Estratégico', 'Gestão de Projetos Jrs', 'Comunicação Técnica'].map(skill => (
            <span key={skill} className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-purple-500/10 transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* --- CONTATO --- */}
      <section id="contato" className="py-20 text-center space-y-12 bg-white/5 rounded-[3rem] border border-white/10">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Let's build something_</h2>
            <p className="text-slate-500">Transformando desafios em código eficiente.</p>
          </div>
          <div className="flex justify-center gap-10">
             <a href="#" className="p-6 rounded-full border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all group">
             </a>
             <a href="#" className="p-6 rounded-full border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all group">
             </a>
             <a href="#" className="p-6 rounded-full border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all group">
                <Mail className="text-slate-500 group-hover:text-white" />
             </a>
          </div>
      </section>

    </div>
  );
}