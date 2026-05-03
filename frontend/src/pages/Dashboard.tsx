import { useEffect, useState } from 'react';
import { Mail, Cpu, Code2, Database, Award, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/cases/').then(res => setProjects(res.data)).catch(e => console.error(e));
  }, []);

  return (
    <div className="space-y-32 pb-32">
      
      {/* --- HERO (Apresentação Principal) --- */}
      <section id="sobre" className="min-h-[90vh] flex items-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8">
            <p className="text-purple-500 font-mono font-bold tracking-[0.3em] uppercase">I am Paulo Gomes</p>
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tighter">
              Software Developer <br />
              <span className="text-slate-500">+ Backend Engineer</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Transformando desafios operacionais em soluções eficientes. 
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

          {/* Foto Estilo Victor (image_e1869e.png) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-80 h-80 lg:w-[480px] lg:h-[480px] rounded-full border-2 border-purple-500/30 p-3 bg-black">
                <img src="/profile.jpg" className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMAÇÕES --- */}
      <section id="formacoes" className="scroll-mt-32">
        <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4 italic underline decoration-purple-500">Formações_</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-base">
          <div className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl">
            <h4 className="text-purple-500 font-bold mb-2">2024 / Concluído</h4>
            <h3 className="text-2xl font-bold text-white mb-4">Bacharel em Ciência e Tecnologia</h3>
            <p className="text-slate-500">Universidade Federal do Maranhão (UFMA)</p>
          </div>
          <div className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl">
            <h4 className="text-purple-500 font-bold mb-2">Em andamento</h4>
            <h3 className="text-2xl font-bold text-white mb-4">Engenharia de Computação</h3>
            <p className="text-slate-500">UFMA / Residência em Embarcados IFMA</p>
          </div>
        </div>
      </section>

      {/* --- LINGUAGENS (Cards estilo image_e17fb6.jpg) --- */}
      <section id="linguagens" className="scroll-mt-32">
        <h2 className="text-4xl font-bold text-white mb-12 italic underline decoration-cyan-500">Linguagens_ & Stack_</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Python', 'Django', 'React', 'PHP', 'TypeScript', 'SQL', 'C++', 'OpenCV'].map(item => (
            <div key={item} className="p-8 border border-white/5 bg-white/5 rounded-2xl flex flex-col items-center gap-4 hover:border-purple-500/50 transition-all">
              <Code2 className="text-purple-500" />
              <span className="font-bold text-white text-base">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJETOS --- */}
      <section id="projetos" className="scroll-mt-32">
        <h2 className="text-5xl font-black text-white mb-16 text-center tracking-tighter">Meus_<span className="text-purple-500">Projetos</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p: any) => (
            <div key={p.id} className="bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] overflow-hidden group">
              <div className="aspect-video bg-black overflow-hidden">
                <img src={p.cover_image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-10 space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">{p.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.technologies.map((t: string) => <span key={t} className="text-[10px] px-3 py-1 bg-white/5 rounded-full border border-white/10 text-slate-400">{t}</span>)}
                </div>
                <div className="pt-6 border-t border-white/5">
                  <a href={p.github_link} className="text-xs font-bold text-purple-400 flex items-center gap-2 hover:text-white transition-colors">
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTATO --- */}
      <section id="contato" className="py-20 text-center space-y-12 bg-white/5 rounded-[3rem] border border-white/10">
          <h2 className="text-4xl font-black text-white">Let's build something_</h2>
          <div className="flex justify-center gap-10">
            <a href="#" className="p-5 rounded-full border border-white/10 hover:border-purple-500 text-slate-500 hover:text-white transition-all"><Linkedin /></a>
            <a href="#" className="p-5 rounded-full border border-white/10 hover:border-purple-500 text-slate-500 hover:text-white transition-all"><Github /></a>
            <a href="#" className="p-5 rounded-full border border-white/10 hover:border-purple-500 text-slate-500 hover:text-white transition-all"><Mail /></a>
          </div>
      </section>

    </div>
  );
}