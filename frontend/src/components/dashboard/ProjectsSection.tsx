import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, Code2, PlayCircle, CheckCircle2, Circle, AlertCircle, FolderGit2 } from 'lucide-react';

interface ProjectGallery {
  id: number;
  image: string;
  caption?: string;
}

interface Project {
  id: string;
  title: string;
  status?: string;
  description?: string;
  problem_statement?: string;
  solution_architecture?: string;
  impact_metrics?: string;
  cover_image?: string;
  video_demo?: string;
  technologies?: string[];
  live_demo?: string;
  github_link?: string;
  gallery?: ProjectGallery[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getMediaUrl = (path?: string) => {
    if (!path) return '';
    const baseUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api/v1', '') 
      : 'http://localhost:8000';
    return path.startsWith('http') ? path : `${baseUrl}${path}`;
  };

  return (
    <section id="projetos" className="scroll-mt-32 pt-16 ">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight flex items-center gap-3">
          <FolderGit2 className="text-gn-highlight" size={28} />
          Estudos de Caso
        </h2>
        
      </div>
      
      <div className="flex flex-col gap-12 relative">
        {/* Linha vertical da timeline (desktop) */}
        <div className="hidden md:block absolute left-[140px] top-8 bottom-8 w-px bg-gn-surface/30"></div>

        {projects.map((p, index) => {
          const coverUrl = getMediaUrl(p.cover_image);
              
          return (
            <div key={p.id} className="flex gap-6 lg:gap-10 relative">
              {/* Timeline Lateral Esquerda */}
              <div className="hidden md:flex flex-col items-end w-[120px] shrink-0 pt-10 pr-2 relative">
                <span className="text-[10px] font-black uppercase text-gn-surface tracking-widest text-right">
                  {p.status || 'Em construção'}
                </span>
                <div className="absolute right-[-25px] lg:right-[-29px] top-11 w-2.5 h-2.5 rounded-full bg-gn-surface ring-4 ring-gn-bg z-10"></div>
              </div>

              {/* Card Principal */}
              <div 
                onClick={() => setSelectedProject(p)} 
                className="flex-1 bg-gn-bg border border-gn-surface/30 rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 hover:bg-gn-surface/5 transition-colors group cursor-pointer hover:border-gn-surface/60 hover:shadow-xl hover:shadow-gn-surface/5"
              >
                {/* Coluna Esquerda: Info */}
                <div className="flex-1 flex flex-col justify-center space-y-5">
                  <span className="text-[10px] font-black uppercase text-gn-highlight tracking-widest">
                    Projetos
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-medium text-gn-highlight tracking-tight group-hover:text-gn-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gn-text leading-relaxed font-light line-clamp-4">
                    {p.description || p.problem_statement}
                  </p>
                  
                  <div className="border-l-2 border-gn-surface/30 pl-4 py-1 my-2">
                    <span className="text-xs text-gn-surface font-light">
                      Concepção e desenvolvimento autoral
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                    {p.technologies?.map((t: string) => (
                      <span 
                        key={t} 
                        className="text-[10px] px-3 py-1.5 bg-gn-surface/10 border border-gn-surface/20 rounded-lg text-gn-highlight font-bold tracking-wider uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coluna Direita: Imagem & Prévia */}
                <div className="lg:w-[45%] xl:w-[50%] shrink-0 relative rounded-2xl overflow-hidden border border-gn-surface/30 bg-[#050505] aspect-video lg:aspect-auto min-h-[240px]">
                  {coverUrl ? (
                    <img 
                      src={coverUrl} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gn-accent font-mono text-xs">
                      no_image.jpg
                    </div>
                  )}
                  
                  {p.video_demo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/20">
                      <PlayCircle size={48} className="text-white drop-shadow-lg" />
                    </div>
                  )}

                  {/* Botão de Prévia estilo flutuante */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-gn-text text-[10px] font-black uppercase px-4 py-2.5 rounded-lg shadow-lg hover:bg-gn-highlight hover:text-gn-bg transition-colors z-20">
                    Prévia da Home
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DO PROJETO */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div 
            className="bg-gn-bg border border-gn-surface rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gn-bg/95 backdrop-blur z-20 flex justify-between items-start p-6 border-b border-gn-surface">
              <div>
                <h3 className="text-2xl font-medium text-gn-highlight">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedProject.technologies?.map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-gn-surface border border-gn-surface/50 rounded text-gn-accent font-mono uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gn-surface rounded-full text-gn-text hover:text-gn-highlight transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-8">
              {/* Vídeo de Demonstração */}
              {selectedProject.video_demo && (
                <div className="rounded-xl overflow-hidden border border-gn-surface bg-black">
                  <video 
                    src={getMediaUrl(selectedProject.video_demo)} 
                    controls 
                    className="w-full max-h-[500px] object-contain"
                  />
                </div>
              )}

              {/* Detalhes Técnicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {selectedProject.problem_statement && (
                    <div>
                      <h4 className="text-sm font-mono text-gn-accent tracking-widest uppercase mb-2">Desafio / Problema</h4>
                      <p className="text-gn-text text-sm leading-relaxed">{selectedProject.problem_statement}</p>
                    </div>
                  )}
                  {selectedProject.solution_architecture && (
                    <div>
                      <h4 className="text-sm font-mono text-gn-accent tracking-widest uppercase mb-2">Arquitetura da Solução</h4>
                      <p className="text-gn-text text-sm leading-relaxed whitespace-pre-line">{selectedProject.solution_architecture}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {selectedProject.impact_metrics && (
                    <div>
                      <h4 className="text-sm font-mono text-gn-accent tracking-widest uppercase mb-2">Impacto / Métricas</h4>
                      <div className="p-4 bg-gn-surface/10 border border-gn-surface rounded-lg">
                        <p className="text-gn-highlight text-sm leading-relaxed font-light">{selectedProject.impact_metrics}</p>
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {(selectedProject.github_link || selectedProject.live_demo) && (
                    <div>
                      <h4 className="text-sm font-mono text-gn-accent tracking-widest uppercase mb-3">Links Externos</h4>
                      <div className="flex gap-4">
                        {selectedProject.github_link && (
                          <a 
                            href={selectedProject.github_link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gn-surface/30 hover:bg-gn-surface rounded-lg text-sm text-gn-highlight transition-colors border border-gn-surface"
                          >
                            <Code2 size={16} /> Repositório
                          </a>
                        )}
                        {selectedProject.live_demo && (
                          <a 
                            href={selectedProject.live_demo} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gn-accent hover:bg-gn-highlight text-gn-bg font-medium rounded-lg text-sm transition-colors"
                          >
                            <ExternalLink size={16} /> Demo Ao Vivo
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Galeria */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div>
                  <h4 className="text-sm font-mono text-gn-accent tracking-widest uppercase mb-4 border-b border-gn-surface pb-2">Galeria Técnica</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.gallery.map(img => (
                      <div key={img.id} className="rounded-lg overflow-hidden border border-gn-surface group">
                        <img 
                          src={getMediaUrl(img.image)} 
                          alt={img.caption || 'Project asset'} 
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {img.caption && (
                          <p className="p-2 text-xs text-gn-text bg-gn-bg text-center">{img.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
