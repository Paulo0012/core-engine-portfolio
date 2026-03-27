import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Globe, Server, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string[];
  problem_statement: string;
  solution_architecture: string;
  impact_metrics: string;
  github_link?: string;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/cases/${id}/`);
        setProject(res.data);
      } catch (err) {
        navigate('/'); // Fallback se o projeto não existir
      }
    };
    fetchDetail();
  }, [id, navigate]);

  if (!project) return <div className="p-20 font-mono animate-pulse text-eng-cyan uppercase">Accessing_Encrypted_Data...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto pb-32"
    >
      {/* NAVEGAÇÃO SUPERIOR */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-eng-cyan transition-colors font-mono text-xs mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        RETURN_TO_DASHBOARD
      </button>

      {/* HEADER DO PROJETO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-eng-cyan font-mono text-[10px] mb-4 uppercase tracking-[0.3em]">
            <Activity size={14} /> System_Operational_Profile
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-eng-cyan/5 border border-eng-cyan/20 p-6 rounded-sm glow-cyan flex flex-col justify-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Efficiency_Gain</span>
          <p className="text-2xl font-bold text-eng-green uppercase tracking-tighter italic">
            {project.impact_metrics}
          </p>
        </div>
      </div>

      {/* CONTEÚDO TÉCNICO: ARQUITETURA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COLUNA ESQUERDA: O PROBLEMA */}
        <section className="space-y-8">
          <div className="border border-eng-border p-8 bg-slate-900/20">
            <h3 className="flex items-center gap-3 text-white font-bold mb-4 uppercase tracking-tight">
              <Layers size={20} className="text-eng-cyan" /> Problem_Statement
            </h3>
            <p className="text-slate-400 leading-relaxed font-light text-sm italic border-l-2 border-eng-border pl-6">
              "{project.problem_statement}"
            </p>
          </div>
        </section>

        {/* COLUNA DIREITA: A ARQUITETURA (O "CÉREBRO") */}
        <section className="space-y-8">
          <div className="border border-eng-cyan/10 p-8 bg-eng-cyan/5">
            <h3 className="flex items-center gap-3 text-white font-bold mb-4 uppercase tracking-tight">
              <Cpu size={20} className="text-eng-cyan" /> Solution_Architecture
            </h3>
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {project.solution_architecture}
              </p>
              
              {/* BOTÕES DE AÇÃO */}
              <div className="flex gap-4 pt-6">
                {project.github_link && (
                  <a 
                    href={project.github_link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 text-[10px] font-mono hover:bg-white/10 transition-all uppercase tracking-widest text-white"
                  >
                    <Server size={14} /> Open_Repository
                  </a>
                )}
                <button className="flex-1 flex items-center justify-center gap-2 bg-eng-cyan/10 border border-eng-cyan/40 py-3 text-[10px] font-mono hover:bg-eng-cyan/20 transition-all uppercase tracking-widest text-eng-cyan">
                  <Globe size={14} /> Live_Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER DA PÁGINA: LOG DE ACESSO */}
      <div className="mt-20 pt-8 border-t border-eng-border">
        <p className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.4em] text-center">
          Authorization_Required_to_View_Full_Technical_Diagrams
        </p>
      </div>
    </motion.div>
  );
}