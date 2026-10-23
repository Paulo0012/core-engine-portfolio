import { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  ExternalLink, X, Code2, PlayCircle, 
  FolderGit2, Cpu, Sparkles, ArrowUpRight, Activity 
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
  headerBorder: string;
  headerBg: string;
  iconContainer: string;
  titleColor: string;
  badgeClass: string;
}

const COLUMNS: ColumnDef[] = [
  {
    key: 'FULLSTACK',
    title: 'Fullstack',
    tagline: 'Sistemas distribuídos, APIs escaláveis e interfaces modernas',
    icon: <Code2 size={20} className="text-gn-highlight" />,
    headerBorder: 'border-gn-surface/40 hover:border-gn-surface/80',
    headerBg: 'bg-gradient-to-b from-gn-surface/20 via-gn-surface/10 to-transparent',
    iconContainer: 'bg-gn-surface/25 border-gn-surface/50 text-gn-highlight',
    titleColor: 'text-gn-highlight',
    badgeClass: 'bg-gn-surface/25 text-gn-highlight border-gn-surface/40',
  },
  {
    key: 'MACHINE_LEARNING',
    title: 'Machine Learning',
    tagline: 'Visão computacional, redes neurais e inteligência aplicada',
    icon: <Sparkles size={20} className="text-gn-highlight" />,
    headerBorder: 'border-gn-surface/40 hover:border-gn-surface/80',
    headerBg: 'bg-gradient-to-b from-gn-surface/20 via-gn-surface/10 to-transparent',
    iconContainer: 'bg-gn-surface/25 border-gn-surface/50 text-gn-highlight',
    titleColor: 'text-gn-highlight',
    badgeClass: 'bg-gn-surface/25 text-gn-highlight border-gn-surface/40',
  },
  {
    key: 'HARDWARE',
    title: 'Hardware',
    tagline: 'IoT, sistemas embarcados, sensores e telemetria',
    icon: <Cpu size={20} className="text-gn-highlight" />,
    headerBorder: 'border-gn-surface/40 hover:border-gn-surface/80',
    headerBg: 'bg-gradient-to-b from-gn-surface/20 via-gn-surface/10 to-transparent',
    iconContainer: 'bg-gn-surface/25 border-gn-surface/50 text-gn-highlight',
    titleColor: 'text-gn-highlight',
    badgeClass: 'bg-gn-surface/25 text-gn-highlight border-gn-surface/40',
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

const formatTechTag = (tag: string): string => {
  let clean = tag;
  if (clean.includes(':')) {
    clean = clean.split(':')[1].trim();
  }
  if (clean.includes('(')) {
    clean = clean.split('(')[0].trim();
  }
  if (clean.includes('.')) {
    clean = clean.split('.')[0].trim();
  }
  if (clean.length > 18) {
    clean = clean.substring(0, 16) + '…';
  }
  return clean || tag;
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
      {/* CABEÇALHO CENTRALIZADO DA SEÇÃO */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gn-surface/20 border border-gn-surface/40 text-[11px] font-mono uppercase tracking-[0.25em] text-gn-highlight shadow-xs">
          <FolderGit2 size={14} className="text-gn-highlight" /> Engenharia Aplicada & Cases
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gn-highlight tracking-tight">
          Estudos de Caso
        </h2>
        <p className="text-xs lg:text-sm text-gn-accent font-light leading-relaxed max-w-lg mx-auto">
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
              {/* CABEÇALHO FIXO TEMÁTICO DA COLUNA COM ALTURA PADRONIZADA */}
              <div className={`p-5 rounded-2xl border ${col.headerBorder} ${col.headerBg} backdrop-blur-md flex flex-col justify-between min-h-[135px] shadow-xs transition-all`}>
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${col.iconContainer}`}>
                      {col.icon}
                    </div>
                    <h3 className={`text-lg font-bold tracking-tight ${col.titleColor}`}>
                      {col.title}
                    </h3>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${col.badgeClass}`}>
                    {colProjects.length} {colProjects.length === 1 ? 'case' : 'cases'}
                  </span>
                </div>
                <p className="text-xs text-gn-accent font-light leading-relaxed">
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
                        <GlowCard className="rounded-3xl h-full flex flex-col">
                          <div 
                            onClick={() => setSelectedProject(p)}
                            className="bg-gn-bg border border-gn-surface/30 rounded-3xl p-5 flex flex-col justify-between h-full hover:bg-gn-surface/5 transition-all group cursor-pointer hover:border-gn-surface/60 hover:shadow-xl hover:shadow-gn-surface/5"
                          >
                            {/* Mídia / Prévia no Topo */}
                            <div className="relative rounded-2xl overflow-hidden border border-gn-surface/30 bg-[#050505] aspect-video w-full shrink-0">
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
                              <div className="absolute bottom-3 right-3 bg-gn-bg/95 border border-gn-surface/40 text-gn-text text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg group-hover:bg-gn-highlight group-hover:text-gn-bg transition-colors z-20 flex items-center gap-1.5">
                                <span>Ver Case</span>
                                <ArrowUpRight size={12} />
                              </div>
                            </div>

                            {/* Informações Alinhadas do Card */}
                            <div className="flex flex-col flex-1 justify-between pt-4 gap-3.5">
                              <div className="space-y-2">
                                {/* Título com altura padronizada de 2 linhas */}
                                <h4 className="text-base lg:text-[17px] font-bold text-gn-highlight group-hover:text-gn-accent transition-colors tracking-tight line-clamp-2 h-12 flex items-center">
                                  {p.title}
                                </h4>

                                {/* Descrição com altura padronizada */}
                                <p className="text-xs text-gn-accent font-light leading-relaxed line-clamp-2 h-10">
                                  {p.description || p.problem_statement}
                                </p>
                              </div>

                              {/* Métrica de Impacto com altura e estilo padronizados */}
                              <div className="h-8 px-3 rounded-lg bg-gn-surface/10 border border-gn-surface/30 flex items-center gap-2 overflow-hidden">
                                <Activity size={12} className="text-gn-accent shrink-0" />
                                <span className="text-[11px] font-mono text-gn-highlight truncate font-medium">
                                  {p.impact_metrics || 'Métricas no Dossiê'}
                                </span>
                              </div>

                              {/* Tecnologias em linha única sem quebrar o grid */}
                              <div className="h-7 flex items-center gap-1.5 overflow-hidden">
                                {p.technologies?.slice(0, 3).map((t: string) => (
                                  <span 
                                    key={t} 
                                    title={t}
                                    className="text-[9px] px-2.5 py-1 bg-gn-surface/15 border border-gn-surface/30 rounded-md text-gn-highlight font-bold tracking-wider uppercase truncate max-w-[120px]"
                                  >
                                    {formatTechTag(t)}
                                  </span>
                                ))}
                                {p.technologies && p.technologies.length > 3 && (
                                  <span className="text-[9px] px-2 py-1 text-gn-accent font-mono font-medium">
                                    +{p.technologies.length - 3}
                                  </span>
                                )}
                              </div>

                              {/* Rodapé de Ação */}
                              <div className="pt-3 border-t border-gn-surface/20 flex items-center justify-between text-[11px] font-mono text-gn-accent group-hover:text-gn-highlight transition-colors">
                                <span className="uppercase tracking-wider text-[10px]">Dossiê Técnico</span>
                                <span className="flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-transform text-gn-highlight">
                                  Explorar <ArrowUpRight size={13} />
                                </span>
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
                <h3 className="text-2xl font-bold text-gn-highlight">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedProject.technologies?.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-gn-surface/20 border border-gn-surface/40 rounded text-gn-highlight font-mono uppercase">
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
                      <h4 className="text-xs font-mono text-gn-accent tracking-widest uppercase mb-2 font-bold">Desafio / Problema</h4>
                      <p className="text-gn-highlight text-sm leading-relaxed">{selectedProject.problem_statement}</p>
                    </div>
                  )}
                  {selectedProject.solution_architecture && (
                    <div>
                      <h4 className="text-xs font-mono text-gn-accent tracking-widest uppercase mb-2 font-bold">Arquitetura da Solução</h4>
                      <p className="text-gn-highlight text-sm leading-relaxed whitespace-pre-line">{selectedProject.solution_architecture}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {selectedProject.impact_metrics && (
                    <div>
                      <h4 className="text-xs font-mono text-gn-accent tracking-widest uppercase mb-2 font-bold">Impacto / Métricas</h4>
                      <div className="p-4 bg-gn-surface/10 border border-gn-surface rounded-lg">
                        <p className="text-gn-highlight text-sm leading-relaxed font-medium">{selectedProject.impact_metrics}</p>
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {(selectedProject.github_link || selectedProject.live_demo) && (
                    <div>
                      <h4 className="text-xs font-mono text-gn-accent tracking-widest uppercase mb-3 font-bold">Links Externos</h4>
                      <div className="flex gap-4">
                        {selectedProject.github_link && (
                          <a 
                            href={selectedProject.github_link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gn-surface/30 hover:bg-gn-surface rounded-lg text-sm text-gn-highlight font-medium transition-colors border border-gn-surface"
                          >
                            <Code2 size={16} /> Repositório
                          </a>
                        )}
                        {selectedProject.live_demo && (
                          <a 
                            href={selectedProject.live_demo} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gn-highlight hover:bg-gn-accent text-gn-bg font-medium rounded-lg text-sm transition-colors shadow-sm"
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
                  <h4 className="text-xs font-mono text-gn-accent tracking-widest uppercase mb-4 border-b border-gn-surface pb-2 font-bold">Galeria Técnica</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.gallery.map(img => (
                      <div key={img.id} className="rounded-lg overflow-hidden border border-gn-surface group">
                        <img 
                          src={getMediaUrl(img.image)} 
                          alt={img.caption || 'Project asset'} 
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {img.caption && (
                          <p className="p-2 text-xs text-gn-accent bg-gn-bg text-center">{img.caption}</p>
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
