import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, XCircle, FileImage, FileVideo, 
  Trash2, Layers3, Zap, PlusCircle 
} from 'lucide-react';
import api from '../services/api';

/**
 * PROJECT_FORM_GATEWAY
 * Gerencia o ciclo de vida de criação de novos ativos técnicos.
 * Suporta metadados JSON e Mídia Binária (FormData).
 */
export default function ProjectForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'BE',
    technologies: 'React, Django', // Coloque um valor padrão para testar
    problem_statement: 'Resumo do problema',
    solution_architecture: '',
    impact_metrics: 'N/A',
    github_link: '',
    live_demo: '',
   });

  // 2. Estado de Mídia (Arquivos Únicos)
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [videoDemo, setVideoDemo] = useState<File | null>(null);

  // 3. Estado de Mídia (Galeria Múltipla)
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  // Estado para previews visuais (para conferência antes de salvar)
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Manipulador de Arquivos Únicos (Capa e Vídeo)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'cover' | 'video') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'cover') {
        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file)); // Gera preview temporário
      } else {
        setVideoDemo(file);
      }
    }
  };

  // Manipulador de Arquivos Múltiplos (Galeria)
  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setGalleryImages(prev => [...prev, ...filesArray]);
      
      // Gera previews temporários para todas as novas imagens
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // Remove imagem da galeria antes de enviar
  const removeGalleryItem = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Protocolo de Commit (Inicia Upload)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title || !formData.solution_architecture) {
      setError("ERRO: Título e Arquitetura da Solução são mandatórios.");
      setLoading(false);
      return;
   }
    try {
      // O Pulo do Gato: FormData para enviar arquivos + texto
      const submitData = new FormData();
      
      // Anexa metadados (texto)
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitData.append(key, value);
      });

      // Anexa arquivos únicos
      if (coverImage) submitData.append('cover', coverImage);
      if (videoDemo) submitData.append('video', videoDemo);

      // Anexa arquivos múltiplos (Galeria)
      galleryImages.forEach((image) => {
        submitData.append('gallery_images', image);
      });

      // Envia para o Backend (A rota POST / exige AuthBearer)
      await api.post('/cases/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Sobrescreve o JSON padrão do api.ts
        },
      });

      console.log("COMMIT_SUCCESS: Novo nó persistido no Core.");
      navigate('/admin'); // Retorna para o Dashboard
    } catch (err: any) {
      const msg = err.response?.data?.message || "CRITICAL_FAILURE: Falha na persistência de dados binários.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-black/60 border border-eng-border p-5 text-white text-base outline-none focus:border-eng-cyan focus:bg-black/80 transition-all font-mono placeholder:text-slate-800 rounded-sm";
  const labelClass = "text-[11px] text-slate-500 uppercase tracking-[0.3em] font-bold block mb-3 flex items-center gap-2";
  const fileLabelClass = "flex flex-col items-center justify-center gap-4 w-full h-40 border-2 border-eng-border border-dashed bg-white/5 hover:border-eng-cyan hover:bg-eng-cyan/5 transition-all cursor-pointer rounded-sm text-slate-500 hover:text-eng-cyan p-6";

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-12 pb-24 font-mono text-base">
      
      {/* HEADER DE OPERAÇÃO */}
      <header className="flex justify-between items-end border-b border-eng-border pb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            Create_<span className="text-eng-cyan">New_Entry</span>
          </h2>
          <p className="text-sm text-slate-500 uppercase mt-2 tracking-widest">Módulo de Ingestão de Ativos Técnicos</p>
        </div>
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin')}
            className="border border-slate-700 text-slate-500 px-8 py-3 text-sm font-bold uppercase hover:bg-white/5 transition-all flex items-center gap-3"
          >
            <XCircle size={18} /> Abort_Mission
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-eng-cyan text-black px-10 py-3 text-sm font-bold uppercase hover:bg-white transition-all flex items-center gap-3 shadow-glow-cyan disabled:bg-slate-700 disabled:cursor-wait"
          >
            {loading ? <Layers3 className='animate-spin'/> : <Save size={18} />} Commit_Data_to_Core
          </button>
        </div>
      </header>

      {error && (
        <div className="text-sm text-red-400 border border-red-500/20 bg-red-500/5 p-5 flex items-center gap-4 animate-pulse uppercase font-bold tracking-tight">
          <Zap size={20} className='text-red-500' /> {error}
        </div>
      )}

      {/* SEÇÃO 1: METADADOS ESSENCIAIS (16px) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-eng-border bg-slate-900/10">
        <div className="md:col-span-2 space-y-2">
          <label className={labelClass}><PlusCircle size={14}/> Project_Identifier (Title)</label>
          <input type="text" placeholder="e.g. Inspeções Equatorial Energia" className={`${inputClass} text-lg font-bold`} required onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Technical_Category</label>
          <select className={inputClass} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="BE">Backend & Scalability</option>
            <option value="CV">Computer Vision (YOLO/IA)</option>
            <option value="IOT">Internet of Things</option>
            <option value="AT">Automation & Data</option>
          </select>
        </div>
        <div className="md:col-span-3 space-y-2">
          <label className={labelClass}>Solution_Architecture (Resumo Técnico)</label>
          <textarea placeholder="Backend Django Ninja com pipeline de Visão Computacional..." className={`${inputClass} h-32 resize-none`} required onChange={e => setFormData({...formData, solution_architecture: e.target.value})}></textarea>
        </div>
      </section>

      {/* SEÇÃO 2: MÍDIA CRÍTICA (CAPA E VÍDEO) */}
      <section className="space-y-6">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight border-l-4 border-eng-cyan pl-4">Media_Dossier</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upload de Capa */}
              <div className="space-y-3">
                  <label className={labelClass}>Project_Cover (16:9 Image)</label>
                  {coverPreview ? (
                    <div className="relative group border border-eng-border">
                       <img src={coverPreview} alt="Preview" className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all"/>
                       <button onClick={() => setCoverPreview(null)} className='absolute top-2 right-2 p-2 bg-black/80 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors'><XCircle size={18}/></button>
                    </div>
                  ) : (
                    <label className={fileLabelClass}>
                        <FileImage size={32} />
                        <span className='text-sm uppercase font-bold tracking-widest'>Select Cover</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'cover')} />
                    </label>
                  )}
              </div>

              {/* Upload de Vídeo Opcional */}
              <div className="space-y-3">
                  <label className={labelClass}>video_demonstration (Optional MP4/MOV)</label>
                  {videoDemo ? (
                    <div className="flex items-center gap-4 p-5 bg-white/5 border border-eng-border rounded-sm">
                        <FileVideo size={24} className='text-eng-cyan'/>
                        <div className='flex-1'>
                            <p className='text-sm text-white font-bold'>{videoDemo.name}</p>
                            <p className='text-[10px] text-slate-600'>{(videoDemo.size / (1024*1024)).toFixed(2)} MB</p>
                        </div>
                        <button onClick={() => setVideoDemo(null)} className='text-slate-600 hover:text-red-500'><Trash2 size={18}/></button>
                    </div>
                  ) : (
                    <label className={fileLabelClass}>
                        <FileVideo size={32} />
                        <span className='text-sm uppercase font-bold tracking-widest'>Select Demo Video</span>
                        <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, 'video')} />
                    </label>
                  )}
              </div>
          </div>
      </section>

      {/* SEÇÃO 3: GALERIA MÚLTIPLA (EQUATORIAL FOTOS) */}
      <section className="space-y-6 p-8 border border-eng-border bg-slate-900/20">
          <h3 className="text-xl font-bold text-white uppercase tracking-tight border-l-4 border-eng-green pl-4">Inspection_Gallery</h3>
          
          {/* Grid de Previews da Galeria */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {galleryPreviews.map((src, index) => (
                  <div key={index} className="relative border border-eng-border group aspect-square overflow-hidden rounded-sm bg-black/60">
                      <img src={src} alt={`Galeria ${index}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"/>
                      <button 
                        type='button'
                        onClick={() => removeGalleryItem(index)}
                        className='absolute -top-10 -right-10 p-2 bg-red-500/80 rounded-full text-white group-hover:top-2 group-hover:right-2 transition-all hover:bg-red-500'
                        title="Remove Image"
                      >
                        <Trash2 size={16}/>
                      </button>
                  </div>
              ))}
              
              {/* Botão de Adicionar mais à Galeria */}
              <label className="flex flex-col items-center justify-center gap-3 aspect-square border-2 border-eng-border border-dashed bg-white/5 hover:border-eng-cyan hover:bg-eng-cyan/5 transition-all cursor-pointer rounded-sm text-slate-600 hover:text-eng-cyan">
                <PlusCircle size={28} />
                <span className='text-[10px] uppercase font-bold tracking-widest'>Add_Images</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
              </label>
          </div>
      </section>

    </form>
  );
}