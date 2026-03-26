import { ExternalLink, Github, Code2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectProps {
  project: {
    id: number;
    title: str;
    category: str;
    technologies: string[];
    problem_statement: string;
    impact_metrics: string;
    github_link?: string;
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative border border-eng-border bg-slate-900/40 p-5 rounded-sm hover:border-eng-cyan transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-eng-cyan/10 text-eng-cyan rounded-sm">
          {project.category === 'IOT' ? <Cpu size={18} /> : <Code2 size={18} />}
        </div>
        <div className="flex gap-3 text-slate-500">
          {project.github_link && <a href={project.github_link} className="hover:text-white"><Github size={16}/></a>}
          <ExternalLink size={16} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-white group-hover:text-eng-cyan transition-colors uppercase tracking-tight">
        {project.title}
      </h3>
      
      <p className="text-xs text-slate-400 mt-3 line-clamp-3 font-light leading-relaxed">
        {project.problem_statement}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map(tech => (
          <span key={tech} className="text-[9px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-slate-400 uppercase">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-eng-border flex justify-between items-center">
        <span className="text-[10px] text-slate-500 font-mono italic">IMPACT_RESULT:</span>
        <span className="text-[10px] text-eng-green font-mono font-bold uppercase">{project.impact_metrics}</span>
      </div>
    </motion.div>
  );
}