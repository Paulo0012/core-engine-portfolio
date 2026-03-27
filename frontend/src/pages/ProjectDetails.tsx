import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Cpu, Globe, Server, Layers, 
  Activity, Terminal, Database, Shield 
} from 'lucide-react';
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
  image?: string;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/cases/${id}/`);
        setProject(res.data);
      } catch (err) {
        console.error("ERRO_DE_ACESSO_AO_NÓ");
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]);

  if (loading) return (
    <div className="h-full flex items-center justify-center font-mono text-eng-cyan animate-pulse">
      [REQUISITANDO_METADADOS_DO_PROJETO_ID_{id}...]
    </div>
  );

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      className="max-w-6xl mx-auto pb-32"
    >
      {/* HEADER DE NAVEGAÇÃO */}
      <nav className="mb-12 flex justify-between items-center border-b border-eng-border pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-eng-cyan transition-all font-mono text-[10px] uppercase group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back_to_System_Core
        </button>
        <div className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.3em]">
          Project_ID: {project.id} // Status: <span className="text-eng-green italic">Deployed</span>
        </div>
      </nav>

      {/* TÍTULO E MÉTRICAS GIGANTES */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
        <div className="lg:col-span-3">
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1 bg-eng-cyan/5 border border-eng-cyan/20 text-eng-cyan font-mono text-[9px] uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-900 border border-eng-border p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-eng-green/5 rotate-45 translate-x-8 -translate-y-8" />
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Performance_Gain</span>
          <p className="text-3xl font-bold text-eng-green tracking-tighter glow-green">
            {project.impact_metrics}
          </p>
          <Activity size={16} className="text-eng-green/20 absolute bottom-4 right-4" />
        </div>
      </div>

      {/* GRID TÉCNICO DE ENGENHARIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* BLOCO: O DESAFIO (INPUT) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400 uppercase tracking-widest">
            <Shield size={16} className="text-eng-cyan" /> 01_Problem_Statement
          </div>
          <div className="p-8 border-l-4 border-eng-border bg-white/5 italic text-slate-400 leading-relaxed font-light">
            "{project.problem_statement}"
          </div>
          
          <div className="p-6 border border-eng-border bg-slate-900/40 font-mono">
             <div className="flex items-center gap-2 text-eng-cyan text-[10px] mb-4 uppercase">
               <Database size={14}/> Data_Structure_Info
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed uppercase">
               Este projeto exigiu a integração de múltiplas fontes de dados e protocolos de comunicação em tempo real, focando em baixa latência e integridade de pacotes.
             </p>
          </div>
        </section>

        {/* BLOCO: A ENGENHARIA (OUTPUT) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400 uppercase tracking-widest">
            <Terminal size={16} className="text-eng-cyan" /> 02_Technical_Architecture
          </div>
          <div className="p-8 border border-eng-cyan/20 bg-eng-cyan/5 relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-eng-cyan" />
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-light italic">
              {project.solution_architecture}
            </p>

            {/* BOTÕES DE REPOSITÓRIO */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {project.github_link && (
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-4 text-[10px] font-mono text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                  <Server size={14} /> Open_Src_Repo
                </a>
              )}
              <button className="flex items-center justify-center gap-2 bg-eng-cyan text-black py-4 text-[10px] font-mono font-bold hover:bg-white transition-all uppercase tracking-widest shadow-glow-cyan">
                <Globe size={14} /> Live_System_Demo
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER DA PÁGINA */}
      <footer className="mt-24 pt-8 border-t border-eng-border text-center">
        <p className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.5em]">
          Engineering_Dossier_End_of_File // Paulo_Gomes_2026
        </p>
      </footer>
    </motion.div>
  );
}