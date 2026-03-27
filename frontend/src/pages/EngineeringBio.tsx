import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png'; 
import { GraduationCap, Award, MapPin, Cpu, Database, Mail } from 'lucide-react';

export default function EngineeringBio() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-16 pb-32"
    >
      {/* SEÇÃO HERO: IDENTIDADE VISUAL GIGANTE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-eng-cyan/20 blur-3xl rounded-full animate-pulse opacity-50" />
          <div className="relative border-2 border-eng-cyan p-3 bg-eng-black glow-cyan">
             <img 
              src={profileImg} 
              alt="Paulo Gomes"
              className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Tag de Engenheiro sobreposta à foto */}
            <div className="absolute bottom-6 left-6 bg-eng-cyan text-black px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-xl">
              Verified_System_Lead
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">
              Paulo <span className="text-eng-cyan">Gomes</span>
            </h2>
            <p className="text-eng-cyan font-mono text-xs uppercase tracking-[0.3em]">Fullstack Engineer & IoT Specialist</p>
          </div>
          
          <p className="text-slate-400 leading-relaxed font-light italic text-lg border-l-2 border-eng-border pl-6">
            "Minha engenharia é focada na convergência entre hardware e software. Não entrego apenas código; desenho infraestruturas escaláveis para problemas complexos de automação e dados."
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
            <div className="border border-eng-border p-4 bg-slate-900/20">
              <span className="text-slate-500 block mb-1">LOCAL_NODE</span>
              <span className="text-white flex items-center gap-2"><MapPin size={12} className="text-eng-cyan"/> SÃO LUÍS, MA</span>
            </div>
            <div className="border border-eng-border p-4 bg-slate-900/20">
              <span className="text-slate-500 block mb-1">CORE_DEGREE</span>
              <span className="text-white flex items-center gap-2"><GraduationCap size={12} className="text-eng-cyan"/> ENG. COMPUTAÇÃO</span>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE ACADÊMICA: O DIFERENCIAL TÉCNICO */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <h3 className="font-mono text-eng-cyan uppercase tracking-[0.4em] text-sm">Academic_Log</h3>
          <div className="h-px flex-1 bg-eng-border" />
        </div>

        <div className="border-l-2 border-eng-border ml-4 space-y-16">
          <div className="relative pl-10 group">
            <div className="absolute w-4 h-4 bg-eng-cyan rounded-full -left-[9px] top-1.5 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
            <span className="text-eng-green font-mono text-[10px] uppercase">2020 — 2025 [Concluído]</span>
            <h4 className="text-2xl font-bold text-white mt-1 uppercase tracking-tight">Bacharelado em Engenharia da Computação</h4>
            <p className="text-slate-500 font-mono text-xs mb-4">Universidade Federal do Maranhão (UFMA)</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-3 text-sm text-slate-400 italic">
                <span className="text-eng-cyan">▹</span> Foco em Visão Computacional e Sistemas de Automação.
              </li>
              <li className="flex gap-3 text-sm text-slate-400 italic">
                <span className="text-eng-cyan">▹</span> Projetos publicados no INPI (Propriedade Intelectual).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}