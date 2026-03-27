import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Cpu, GitBranch, ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string[];
  problem_statement: string;
  impact_metrics: string;
  github_link?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  // Função para entrar no Dossiê Técnico
  const handleDeepDive = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative border border-eng-border bg-slate-900/40 p-6 rounded-sm hover:border-eng-cyan transition-all cursor-pointer"
      onClick={handleDeepDive}
    >
      {/* Efeito de Scanline Local no Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-eng-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2.5 bg-eng-cyan/10 text-eng-cyan rounded-sm border border-eng-cyan/20">
            {project.category === 'IOT' ? <Cpu size={20} /> : <Code2 size={20} />}
          </div>
          
          <div className="flex gap-4 text-slate-500">
            {project.github_link && (
              <a 
                href={project.github_link} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => e.stopPropagation()} // Impede de abrir os detalhes ao clicar no link
                className="hover:text-eng-cyan transition-colors"
              >
                <GitBranch size={18} />
              </a>
            )}
            <ArrowUpRight size={18} className="group-hover:text-white transition-colors" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-eng-cyan transition-colors uppercase tracking-tighter font-mono">
          {project.title}
        </h3>
        
        <p className="text-[12px] text-slate-400 mt-3 line-clamp-2 font-light leading-relaxed h-10">
          {project.problem_statement}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-500 uppercase tracking-tighter"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[9px] font-mono text-slate-700">+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-eng-border flex justify-between items-center font-mono">
          <div>
            <span className="text-[9px] text-slate-600 uppercase block tracking-widest">Efficiency_Gain</span>
            <span className="text-sm font-bold text-eng-green glow-green">
              {project.impact_metrics}
            </span>
          </div>
          
          <button className="text-[10px] text-eng-cyan border border-eng-cyan/30 px-3 py-1.5 hover:bg-eng-cyan hover:text-black transition-all uppercase tracking-widest">
            View_Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}