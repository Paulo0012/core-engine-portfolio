import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, ArrowLeft, Upload, Film, 
  Image as ImageIcon, RefreshCw, CheckCircle2 
} from 'lucide-react';
import api from '../services/api';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    impact_metrics: '',
    technologies: '', // Enviado como string separada por vírgulas
    github_link: '',
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [demoVideo, setDemoVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Carregar dados se for edição
  useEffect(() => {
    if (id) {
      api.get(`/cases/${id}/`).then((res) => {
        const p = res.data;
        setFormData({
          title: p.title,
          category: p.category,
          description: p.description,
          impact_metrics: p.impact_metrics,
          technologies: p.technologies.join(', '),
          github_link: p.github_link || '',
        });
        if (p.cover_image) setPreview(p.cover_image);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('impact_metrics', formData.impact_metrics);
    data.append('github_link', formData.github_link);
    
    // Converte a string de tecnologias de volta para array para o backend
    const techArray = formData.technologies.split(',').map(t => t.trim());
    data.append('technologies', JSON.stringify(techArray));

    if (coverImage) data.append('cover_image', coverImage);
    if (demoVideo) data.append('demo_video', demoVideo);

    try {
      if (id) {
        await api.put(`/cases/${id}/`, data);
      } else {
        await api.post('/cases/', data);
      }
      navigate('/admin');
    } catch (err) {
      console.error("Erro ao salvar projeto:", err);
      alert("Falha ao salvar. Verifique se todos os campos estão preenchidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-40 pt-10 px-6 font-mono text-base">
      
      {/* CABEÇALHO */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-xs font-bold"
        >
          <ArrowLeft size={16} /> Voltar ao Painel
        </button>
        <h2 className="text-3xl font-black text-white italic uppercase">
          {id ? 'Edit' : 'New'}_<span className="text-purple-500">Project</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* SEÇÃO 1: INFORMAÇÕES BÁSICAS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Identificador do Projeto</label>
            <input 
              required
              className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none transition-all rounded-lg"
              placeholder="Ex: Sistema de Gestão SEAP"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Categoria_Core</label>
            <select 
              className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none transition-all rounded-lg"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Selecionar...</option>
              <option value="Backend">Backend Engineer</option>
              <option value="Computer Vision">AI Vision</option>
              <option value="Embedded">Embedded Systems</option>
              <option value="Fullstack">Fullstack Development</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Descrição_Técnica</label>
            <textarea 
              rows={4}
              className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none transition-all rounded-lg"
              placeholder="Descreva a arquitetura e o propósito do projeto..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </section>

        {/* SEÇÃO 2: MÉTRICAS E LINKS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Métricas de Impacto</label>
            <input 
              className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none transition-all rounded-lg"
              placeholder="Ex: +45% Eficiência"
              value={formData.impact_metrics}
              onChange={e => setFormData({...formData, impact_metrics: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Github_Source</label>
            <input 
              className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none transition-all rounded-lg"
              placeholder="https://github.com/..."
              value={formData.github_link}
              onChange={e => setFormData({...formData, github_link: e.target.value})}
            />
          </div>
        </section>

        {/* SEÇÃO 3: MÍDIA (UPLOAD) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Foto de Capa */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer overflow-hidden"
          >
            {preview ? (
              <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            ) : (
              <ImageIcon size={40} className="text-slate-700 group-hover:text-purple-500" />
            )}
            <span className="text-xs font-bold text-slate-500 group-hover:text-white uppercase tracking-[0.2em]">Capa do Projeto</span>
            <input type="file" ref={fileInputRef} hidden onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                setCoverImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }} />
          </div>

          {/* Vídeo de Demo */}
          <div 
            onClick={() => videoInputRef.current?.click()}
            className="group h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer"
          >
            <Film size={40} className={`text-slate-700 group-hover:text-cyan-500 ${demoVideo ? 'text-cyan-500' : ''}`} />
            <span className="text-xs font-bold text-slate-500 group-hover:text-white uppercase tracking-[0.2em]">
              {demoVideo ? 'Vídeo Selecionado ✅' : 'Demo_Video (MP4)'}
            </span>
            <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={e => setDemoVideo(e.target.files?.[0] || null)} />
          </div>
        </section>

        {/* BARRA DE AÇÕES FIXA (BOTÃO DE SALVAR) */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
             <p className="hidden md:block text-[10px] text-slate-600 uppercase tracking-[0.3em]">
               System_Status: <span className="text-green-500 italic">Ready_to_Deploy</span>
             </p>
             
             <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={() => navigate('/admin')}
                  className="flex-1 md:flex-none px-8 py-4 border border-white/10 text-slate-500 font-bold uppercase text-xs hover:bg-white/5 transition-all rounded-lg"
                >
                  Cancelar
                </button>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 md:flex-none bg-purple-600 text-white px-12 py-4 font-black uppercase text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.4)] rounded-lg disabled:bg-slate-800 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} /> Sincronizando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> Finalizar_Ativo
                    </>
                  )}
                </button>
             </div>
          </div>
        </div>

      </form>
    </div>
  );
}