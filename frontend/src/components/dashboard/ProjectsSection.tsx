import { ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description?: string;
  problem_statement?: string;
  cover_image?: string;
  technologies?: string[];
  live_demo?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projetos" className="scroll-mt-32 pt-16 border-t border-white/5">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-white tracking-tight">
          Estudos de Caso
        </h2>
        <div className="flex-1 h-px bg-white/5"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => {
          const coverUrl = p.cover_image?.startsWith('http') 
            ? p.cover_image 
            : p.cover_image 
              ? `http://localhost:8000${p.cover_image}`
              : '';
              
          return (
            <div 
              key={p.id} 
              className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-neutral-500 transition-all"
            >
              <div className="aspect-video bg-neutral-900 overflow-hidden relative border-b border-white/10">
                {coverUrl ? (
                  <img 
                    src={coverUrl} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-neutral-600 font-mono text-xs">
                      no_image.jpg
                   </div>
                )}
                
                {p.live_demo && (
                  <a 
                    href={p.live_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              
              <div className="p-8 space-y-5 flex-1 flex flex-col">
                <h3 className="text-xl font-medium text-neutral-100 tracking-tight">{p.title}</h3>
                <p className="text-neutral-400 text-sm line-clamp-3 leading-relaxed font-light">
                  {p.problem_statement || p.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                  {p.technologies?.map((t: string) => (
                    <span 
                      key={t} 
                      className="text-[10px] px-2 py-1 bg-white/[0.03] border border-white/5 rounded-md text-neutral-400 font-mono tracking-widest uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
