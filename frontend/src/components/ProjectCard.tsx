import { motion } from 'framer-motion';
import api from '../services/api';

// IMPORTAÇÃO DE ENGENHARIA: Importamos os ícones diretamente para evitar erro de índice
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Code2 from 'lucide-react/dist/esm/icons/code-2';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import GitBranch from 'lucide-react/dist/esm/icons/git-branch'; 
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Edit from 'lucide-react/dist/esm/icons/edit';

interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string[];
  problem_statement: string;
  impact_metrics: string;
  github_link?: string;
}

interface ProjectCardProps {
  project: Project;
  isAdmin: boolean;
  onRefresh: () => void;
  onEdit: (project: Project) => void;
}

export default function ProjectCard({ project, isAdmin, onRefresh, onEdit }: ProjectCardProps) {
  
  // Função para deletar o registro do Banco de Dados
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `SISTEMA: Confirmar exclusão permanente do nó [${project.title}]?`
    );

    if (confirmDelete) {
      try {
        await api.delete(`/cases/${project.id}/`);
        onRefresh(); // Recarrega a lista no App.tsx
      } catch (err) {
        console.error("CRITICAL_FAILURE: Erro ao comunicar com o backend para exclusão.");
        alert("Erro: Não foi possível deletar o projeto.");
      }
    }
  };

  const CategoryIcon = project.category === 'IOT' ? Cpu : Code2;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative border border-eng-border bg-slate-900/40 p-5 rounded-sm hover:border-eng-cyan transition-all overflow-hidden"
    >
      {/* Overlay de Scanline local */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-eng-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-eng-cyan/10 text-eng-cyan rounded-sm border border-eng-cyan/20">
            <CategoryIcon size={18} />
          </div>
          
          <div className="flex gap-3 text-slate-500">
            {/* Controles de Administrador */}
            {isAdmin && (
              <div className="flex gap-2 border-r border-eng-border pr-3 mr-1">
                <button 
                  onClick={() => onEdit(project)}
                  className="hover:text-amber-500 transition-colors p-1"
                  title="EDIT_NODE"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={handleDelete}
                  className="hover:text-red-500 transition-colors p-1"
                  title="TERMINATE_NODE"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            {project.github_link && (
              <a 
                href={project.github_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-eng-cyan transition-colors p-1"
              >
                <GitBranch size={18}/>
              </a>
            )}
            <ExternalLink size={18} className="hover:text-white cursor-pointer transition-colors p-1" />
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
              className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-500 uppercase tracking-tighter"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-eng-border flex justify-between items-center font-mono text-[9px]">
          <span className="text-slate-600 uppercase tracking-widest">Efficiency_Impact:</span>
          <span className="text-eng-green font-bold glow-green px-2 py-0.5 bg-eng-green/5 rounded-sm">
            {project.impact_metrics}
          </span>
        </div>
      </div>
    </motion.div>
  );
}