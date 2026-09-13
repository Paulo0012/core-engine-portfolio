import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, ArrowLeft, Upload, Film, 
  Image as ImageIcon, RefreshCw, CheckCircle2, X, Plus, Terminal, AlertTriangle
} from 'lucide-react';
import api from '../services/api';
import { useProjectSubmit } from '../hooks/useProjectSubmit';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Referências para os inputs de arquivo escondidos
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const { submitForm, loading, errorMsg, setErrorMsg } = useProjectSubmit(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'IOT',
    status: 'Em construção',
    problem_statement: '',
    solution_architecture: '',
    impact_metrics: '',
    technologies: '',
    github_link: '',
    live_demo: '',
  });

  // Estados para Armazenamento de Arquivos (Binários)
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [demoVideo, setDemoVideo] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  // Estados para Visualização (Previews)
  const [preview, setPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Carregar dados existentes em caso de edição
  useEffect(() => {
    if (id) {
      api.get(`/cases/${id}`).then((res) => {
        const p = res.data;
        setFormData({
          title: p.title,
          category: p.category || 'IOT',
          status: p.status || 'Em construção',
          problem_statement: p.problem_statement || '',
          solution_architecture: p.solution_architecture || '',
          impact_metrics: p.impact_metrics || '',
          technologies: p.technologies ? p.technologies.join(', ') : '',
          github_link: p.github_link || '',
          live_demo: p.live_demo || '',
        });
        if (p.cover_image) setPreview(p.cover_image);
        if (p.gallery) setGalleryPreviews(p.gallery.map((img: any) => img.image));
      });
    }
  }, [id]);

  // Gerenciador da Galeria de Fotos
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setGalleryImages(prev => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData, coverImage, demoVideo, galleryImages);
  };

  return (
    <div className="max-w-5xl mx-auto pb-48 pt-10 px-6 font-mono text-base text-gn-text">
      
      {/* CABEÇALHO DE OPERAÇÃO */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-gn-text hover:text-gn-highlight transition-colors uppercase text-xs font-bold">
          <ArrowLeft size={16} /> Voltar ao Painel
        </button>
        <h2 className="text-3xl font-black text-gn-highlight italic uppercase tracking-tighter">
          {id ? 'Update' : 'New'}_<span className="text-gn-accent">Technical_Asset</span>
        </h2>
      </div>

      {errorMsg && (
        <div className="mb-8 flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          <AlertTriangle size={20} className="shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">{errorMsg}</div>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-700">
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* SEÇÃO 1: NÚCLEO TÉCNICO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/50 p-8 rounded-2xl border border-gn-surface/50 shadow-sm">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest flex items-center gap-2">
              <Terminal size={14}/> Identificador_do_Projeto
            </label>
            <input 
              required 
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all" 
              placeholder="Ex: Lume SaaS / Equatorial AI"
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest">Categoria</label>
            <select
              required
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="IOT">Internet of Things (IOT)</option>
              <option value="BE">Backend & Scalability (BE)</option>
              <option value="CV">Computer Vision (CV)</option>
              <option value="AT">Automation & Data (AT)</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest">Status</label>
            <select
              required
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="Em construção">Em construção</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest flex items-center gap-2">
               Tecnologias (Separadas por vírgula)
            </label>
            <input 
              required 
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all" 
              placeholder="Ex: Python, Django, React"
              value={formData.technologies} 
              onChange={e => setFormData({...formData, technologies: e.target.value})} 
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest flex items-center gap-2">
               Métricas de Impacto
            </label>
            <input 
              required 
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all" 
              placeholder="Ex: +40% velocidade, -10h trabalho"
              value={formData.impact_metrics} 
              onChange={e => setFormData({...formData, impact_metrics: e.target.value})} 
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest">Problema (Problem Statement)</label>
            <textarea 
              rows={3} 
              required
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all resize-none" 
              placeholder="Descreva o problema que o projeto resolve..."
              value={formData.problem_statement} 
              onChange={e => setFormData({...formData, problem_statement: e.target.value})} 
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest">Arquitetura da Solução</label>
            <textarea 
              rows={4} 
              required
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all resize-none" 
              placeholder="Descreva a solução técnica implementada..."
              value={formData.solution_architecture} 
              onChange={e => setFormData({...formData, solution_architecture: e.target.value})} 
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest flex items-center gap-2">
               Github Link (Opcional)
            </label>
            <input 
              type="url"
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all" 
              placeholder="https://github.com/seu-repo"
              value={formData.github_link} 
              onChange={e => setFormData({...formData, github_link: e.target.value})} 
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gn-text uppercase tracking-widest flex items-center gap-2">
               Live Demo (Opcional)
            </label>
            <input 
              type="url"
              className="w-full bg-gn-bg border border-gn-surface/50 p-5 text-gn-highlight focus:border-gn-accent outline-none rounded-xl transition-all" 
              placeholder="https://sua-demo.com"
              value={formData.live_demo} 
              onChange={e => setFormData({...formData, live_demo: e.target.value})} 
            />
          </div>
        </section>

        {/* SEÇÃO 2: MÍDIA PRINCIPAL (CAPA E VÍDEO) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div onClick={() => fileInputRef.current?.click()} className="group relative h-56 border-2 border-dashed border-gn-surface/50 bg-white/50 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-gn-accent cursor-pointer overflow-hidden transition-all">
            {preview ? <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-80" /> : <ImageIcon size={40} className="text-gn-surface" />}
            <span className="relative z-10 text-[11px] font-bold text-gn-highlight uppercase tracking-widest bg-white/50 px-2 py-1 rounded">Capa_Principal (16:9)</span>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={e => {
              const file = e.target.files?.[0];
              if (file) { setCoverImage(file); setPreview(URL.createObjectURL(file)); }
            }} />
          </div>

          <div onClick={() => videoInputRef.current?.click()} className="group h-56 border-2 border-dashed border-gn-surface/50 bg-white/50 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-gn-accent cursor-pointer transition-all">
            <Film size={40} className={demoVideo ? 'text-gn-accent' : 'text-gn-surface'} />
            <span className="text-[11px] font-bold text-gn-highlight uppercase tracking-widest">
              {demoVideo ? 'Demo_Video_Ready ✅' : 'Demo_Video (Opcional)'}
            </span>
            <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={e => setDemoVideo(e.target.files?.[0] || null)} />
          </div>
        </section>

        {/* SEÇÃO 3: GALERIA DE INSPEÇÃO (MÚLTIPLAS FOTOS) */}
        <section className="space-y-6 p-8 border border-gn-surface/50 rounded-2xl bg-white/50 shadow-sm">
          <label className="text-xs font-bold text-gn-text uppercase tracking-[0.3em] block">Inspection_Gallery (Evidências de Projeto)</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {galleryPreviews.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gn-surface/30 group shadow-sm">
                <img src={src} className="w-full h-full object-cover transition-all duration-500" />
                <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ))}
            <div onClick={() => galleryInputRef.current?.click()} className="aspect-square border-2 border-dashed border-gn-surface/50 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-gn-accent cursor-pointer bg-gn-bg hover:bg-gn-surface/20 transition-all">
              <Plus size={32} className="text-gn-surface" />
              <span className="text-[10px] font-bold uppercase text-gn-text">Add_Photos</span>
              <input type="file" ref={galleryInputRef} hidden multiple accept="image/*" onChange={handleGalleryChange} />
            </div>
          </div>
        </section>

        {/* --- BARRA DE AÇÕES FIXA NO RODAPÉ --- */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-gn-surface/30 p-6 z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
             <div className="hidden md:flex items-center gap-3 text-[10px] text-gn-text uppercase tracking-widest font-bold">
               <RefreshCw size={14} className={loading ? 'animate-spin text-gn-accent' : ''} />
               {loading ? 'Transmitting_Data_to_Vault...' : 'System_Ready_for_Commit'}
             </div>
             
             <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={() => navigate('/admin')} 
                  className="flex-1 md:flex-none px-10 py-4 border border-gn-surface text-gn-highlight font-bold uppercase text-xs hover:bg-gn-surface/20 transition-all rounded-lg"
                >
                  Cancelar
                </button>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 md:flex-none bg-gn-highlight text-gn-bg px-14 py-4 font-black uppercase text-xs hover:bg-gn-accent transition-all flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(61,88,85,0.39)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processando...' : <><CheckCircle2 size={18} /> Finalizar_Ativo</>}
                </button>
             </div>
          </div>
        </div>

      </form>
    </div>
  );
}