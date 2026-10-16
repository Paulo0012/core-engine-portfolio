import { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  ExternalLink, X, Code2, PlayCircle, 
  FolderGit2, Cpu, Sparkles, ArrowUpRight 
} from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import FadeUp from '../ui/FadeUp';

interface ProjectGallery {
  id: number;
  image: string;
  caption?: string;
}

interface Project {
  id: string | number;
  title: string;
  category?: string;
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

interface ColumnDef {
  key: 'FULLSTACK' | 'MACHINE_LEARNING' | 'HARDWARE';
  title: string;
  tagline: string;
  icon: React.ReactNode;
  accentBorder: string;
  accentBg: string;
  accentText: string;
}

const COLUMNS: ColumnDef[] = [
  {
    key: 'FULLSTACK',
    title: 'Fullstack',
    tagline: 'Sistemas distribuídos, APIs escaláveis e interfaces modernas',
    icon: <Code2 size={20} className="text-sky-600 dark:text-sky-400" />,
    accentBorder: 'border-sky-500/30',
    accentBg: 'bg-sky-500/10',
    accentText: 'text-sky-600 dark:text-sky-400',
  },
  {
    key: 'MACHINE_LEARNING',
    title: 'Machine Learning',
    tagline: 'Visão computacional, redes neurais e inteligência aplicada',
    icon: <Sparkles size={20} className="text-emerald-600 dark:text-emerald-400" />,
    accentBorder: 'border-emerald-500/30',
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'HARDWARE',
    title: 'Hardware',
    tagline: 'IoT, sistemas embarcados, sensores e telemetria',
    icon: <Cpu size={20} className="text-amber-600 dark:text-amber-400" />,
    accentBorder: 'border-amber-500/30',
    accentBg: 'bg-amber-500/10',
    accentText: 'text-amber-600 dark:text-amber-400',
  },
];

const normalizeCat = (cat?: string): string => {
  if (!cat) return '';
  const upper = cat.trim().toUpperCase();
  if (upper === 'BE' || upper === 'AT') return 'FULLSTACK';
  if (upper === 'CV') return 'MACHINE_LEARNING';
  if (upper === 'IOT') return 'HARDWARE';
  return upper;
};

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
    <section id="projetos" className="scroll-mt-32 pt-16">
      {/* CABEÇALHO DA SEÇÃO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gn-accent block mb-2">
            Engenharia Aplicada & Cases
          </span>
          <h2 className="text-3xl font-medium text-gn-highlight tracking-tight flex items-center gap-3">
            <FolderGit2 className="text-gn-highlight" size={30} />
            Estudos de Caso
          </h2>
        </div>
        <p className="text-xs text-gn-text max-w-md font-light leading-relaxed">
          Projetos autorais categorizados em 3 pilares técnicos de especialidade, com prévias interativas e dossiês de arquitetura.
        </p>
      </div>
      
      {/* GRID DE 3 COLUNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {COLUMNS.map((col, colIndex) => {
          const colProjects = projects.filter(
            (p) => normalizeCat(p.category) === col.key
          );

          return (
            <div key={col.key} className="flex flex-col gap-6">
              {/* CABEÇALHO FIXO TEMÁTICO DA COLUNA */}
              <div className={`p-5 rounded-2xl border ${col.accentBorder} bg-gn-surface/10 backdrop-blur-sm relative overflow-hidden transition-all hover:bg-gn-surface/15`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${col.accentBg} ${col.accentBorder} border`}>
                      {col.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gn-highlight tracking-tight">
                        {col.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full ${col.accentBg} ${col.accentText} border ${col.accentBorder}`}>
                    {colProjects.length} {colProjects.length === 1 ? 'case' : 'cases'}
                  </span>
                </div>
                <p className="text-xs text-gn-text font-light leading-relaxed">
                  {col.tagline}
                </p>
              </div>

              {/* LISTA DE CARDS DA COLUNA */}
              <div className="flex flex-col gap-6">
                {colProjects.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-gn-surface/30 bg-gn-surface/5 text-center flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-gn-text font-mono">
                      Nenhum projeto cadastrado nesta coluna ainda.
                    </span>
                  </div>
                ) : (
                  colProjects.map((p, pIndex) => {
                    const coverUrl = getMediaUrl(p.cover_image);

                    return (
                      <FadeUp key={p.id} delay={colIndex * 0.1 + pIndex * 0.05}>
                        <GlowCard className="rounded-3xl h-full">
                          <div 
                            onClick={() => setSelectedProject(p)}
                            className="bg-gn-bg border border-gn-surface/30 rounded-3xl p-5 flex flex-col gap-5 hover:bg-gn-surface/5 transition-all group cursor-pointer hover:border-gn-surface/60 hover:shadow-xl hover:shadow-gn-surface/5 h-full"
                          >
                            {/* Mídia / Prévia no Topo */}
                            <div className="relative rounded-2xl overflow-hidden border border-gn-surface/30 bg-[#050505] aspect-video w-full">
                              {p.video_demo ? (
                                <video
                                  src={getMediaUrl(p.video_demo)}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              ) : coverUrl ? (
                                <img 
                                  src={coverUrl} 
                                  alt={p.title} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gn-accent font-mono text-xs">
                                  sem_midia.jpg
                                </div>
                              )}

                              {p.video_demo && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/20">
                                  <PlayCircle size={40} className="text-white drop-shadow-lg" />
                                </div>
                              )}

                              {/* Badge de Status no topo */}
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-md z-20">
                                {p.status || 'Em construção'}
                              </div>

                              {/* Badge de Prévia flutuante */}
                              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur text-gn-text text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg group-hover:bg-gn-highlight group-hover:text-gn-bg transition-colors z-20 flex items-center gap-1.5">
                                <span>Ver Case</span>
                                <ArrowUpRight size={12} />
                              </div>
                            </div>

                            {/* Informações do Projeto */}
                            <div className="flex flex-col flex-1 justify-between gap-4">
                              <div className="space-y-2.5">
                                <h4 className="text-xl font-medium text-gn-highlight tracking-tight group-hover:text-gn-accent transition-colors break-words">
                                  {p.title}
                                </h4>

                                <p className="text-xs text-gn-text leading-relaxed font-light line-clamp-3">
                                  {p.description || p.problem_statement}
                                </p>
                              </div>

                              {/* Métrica de Impacto */}
                              {p.impact_metrics && (
                                <div className="border-l-2 border-gn-surface/40 pl-3 py-1 bg-gn-surface/5 rounded-r">
                                  <span className="text-[11px] text-gn-highlight font-mono block truncate">
                                    {p.impact_metrics}
                                  </span>
                                </div>
                              )}

                              {/* Tecnologias */}
                              <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                                {p.technologies?.slice(0, 4).map((t: string) => (
                                  <span 
                                    key={t} 
                                    className="text-[9px] px-2.5 py-1 bg-gn-surface/10 border border-gn-surface/20 rounded-md text-gn-highlight font-bold tracking-wider uppercase"
                                  >
                                    {t}
                                  </span>
                                ))}
                                {p.technologies && p.technologies.length > 4 && (
                                  <span className="text-[9px] px-2 py-1 text-gn-surface font-mono">
                                    +{p.technologies.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </FadeUp>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DO PROJETO COM DETALHES COMPLETOS */}
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
