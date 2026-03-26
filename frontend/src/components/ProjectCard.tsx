// IMPORTAÇÃO DE ENGENHARIA: Importamos os ícones diretamente de seus arquivos
// para ignorar o índice principal da biblioteca que está quebrado no seu ambiente.
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Code2 from 'lucide-react/dist/esm/icons/code-2';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
// No seu ambiente, o ícone provavelmente se chama 'github-icon' ou foi removido.
// Usaremos 'git-branch' como fallback seguro e universal para indicar repositório.
import GitBranch from 'lucide-react/dist/esm/icons/git-branch'; 

import { motion } from 'framer-motion';

// Correção dos tipos TypeScript (de str para string)
interface ProjectProps {
  project: {
    id: number;
    title: string;    // Corrigido de str
    category: string; // Corrigido de str
    technologies: string[];
    problem_statement: string;
    impact_metrics: string;
    github_link?: string;
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  // Definimos os componentes de ícone para uso no JSX
  const RepoIcon = GitBranch; 
  const CategoryIcon = project.category === 'IOT' ? Cpu : Code2;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative border border-eng-border bg-slate-900/40 p-5 rounded-sm hover:border-eng-cyan transition-all overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-eng-cyan/0 via-eng-cyan/5 to-eng-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-eng-cyan/10 text-eng-cyan rounded-sm border border-eng-cyan/20">
            <CategoryIcon size={18} />
          </div>
          <div className="flex gap-3 text-slate-500">
            {project.github_link && (
              <a 
                href={project.github_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-eng-cyan transition-colors"
              >
                {/* Usamos o ícone de Branch que é universal e seguro */}
                <RepoIcon size={18}/>
              </a>
            )}
            <ExternalLink size={18} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-eng-cyan transition-colors uppercase tracking-tight font-mono">
          {project.title}
        </h3>
        
        <p className="text-[11px] text-slate-400 mt-3 line-clamp-3 font-light leading-relaxed h-12">
          {project.problem_statement}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 uppercase tracking-tighter"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-eng-border flex justify-between items-center font-mono text-[9px]">
          <span className="text-slate-600 uppercase tracking-widest">IMPACT_METRIC:</span>
          <span className="text-eng-green font-bold px-2 py-0.5 bg-eng-green/5 rounded-sm">
            {project.impact_metrics}
          </span>
        </div>
      </div>
    </motion.div>
  );
}