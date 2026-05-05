import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, ArrowLeft, Upload, Film, 
  Image as ImageIcon, RefreshCw, CheckCircle2, X, Plus
} from 'lucide-react';
import api from '../services/api';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    impact_metrics: '',
    technologies: '',
    github_link: '',
  });

  // Estados de Mídia
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [demoVideo, setDemoVideo] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  // Previews
  const [preview, setPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

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
        if (p.gallery) setGalleryPreviews(p.gallery.map((img: any) => img.image));
      });
    }
  }, [id]);

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
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    
    const techArray = formData.technologies.split(',').map(t => t.trim());
    data.append('technologies', JSON.stringify(techArray));

    if (coverImage) data.append('cover_image', coverImage);
    if (demoVideo) data.append('demo_video', demoVideo);
    
    // Anexa múltiplas fotos da galeria
    galleryImages.forEach((file) => {
      data.append('gallery_images', file);
    });

    try {
      if (id) {
        await api.put(`/cases/${id}/`, data);
      } else {
        await api.post('/cases/', data);
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert("Erro ao sincronizar com o Core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-40 pt-10 px-6 font-mono text-base">
      
      <div className="flex items-center justify-between mb-12">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase text-xs font-bold">
          <ArrowLeft size={16} /> Painel de Controle
        </button>
        <h2 className="text-3xl font-black text-white italic uppercase">
          {id ? 'Update' : 'New'}_<span className="text-purple-500">Asset</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* DADOS TÉCNICOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Project_Title</label>
            <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Solution_Architecture</label>
            <textarea rows={4} className="w-full bg-black border border-white/10 p-4 text-white focus:border-purple-500 outline-none rounded-lg" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
        </section>

        {/* MÍDIA PRINCIPAL */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div onClick={() => fileInputRef.current?.click()} className="group relative h-48 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 cursor-pointer overflow-hidden">
            {preview ? <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-40" /> : <ImageIcon size={32} className="text-slate-700" />}
            <span className="relative z-10 text-[10px] font-bold text-white uppercase tracking-widest">Capa_Principal</span>
            <input type="file" ref={fileInputRef} hidden onChange={e => {
              const file = e.target.files?.[0];
              if (file) { setCoverImage(file); setPreview(URL.createObjectURL(file)); }
            }} />
          </div>

          <div onClick={() => videoInputRef.current?.click()} className="group h-48 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-cyan-500/50 cursor-pointer">
            <Film size={32} className={demoVideo ? 'text-cyan-500' : 'text-slate-700'} />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{demoVideo ? 'Video_Ready' : 'Demo_Video'}</span>
            <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={e => setDemoVideo(e.target.files?.[0] || null)} />
          </div>
        </section>

        {/* GALERIA DE FOTOS (MÚLTIPLAS) */}
        <section className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Project_Gallery (Múltiplas Fotos)</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryPreviews.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                <img src={src} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ))}
            <div onClick={() => galleryInputRef.current?.click()} className="aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 cursor-pointer bg-white/5">
              <Plus size={24} className="text-purple-500" />
              <span className="text-[9px] font-bold uppercase text-slate-500">Add_Image</span>
              <input type="file" ref={galleryInputRef} hidden multiple accept="image/*" onChange={handleGalleryChange} />
            </div>
          </div>
        </section>

        {/* BARRA FIXA */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 z-50">
          <div className="max-w-5xl mx-auto flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/admin')} className="px-8 py-4 text-slate-500 font-bold uppercase text-xs hover:text-white transition-all">Cancelar</button>
            <button type="submit" disabled={loading} className="bg-purple-600 text-white px-12 py-4 font-black uppercase text-xs hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.4)] rounded-lg">
              {loading ? <RefreshCw className="animate-spin" /> : <><CheckCircle2 size={18} /> Persistir_Dados</>}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}