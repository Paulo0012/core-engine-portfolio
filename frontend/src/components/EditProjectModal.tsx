import { useState, useEffect } from 'react';
import { X, Save, AlertTriangle, RefreshCw } from 'lucide-react';
import api from '../services/api';

export default function EditProjectModal({ isOpen, onClose, project, onRefresh }: any) {
  const [formData, setFormData] = useState({ ...project });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sincroniza o formulário sempre que o projeto selecionado mudar
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        technologies: project.technologies.join(', ') // Converte array para string para o input
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        technologies: typeof formData.technologies === 'string' 
          ? formData.technologies.split(',').map((t: string) => t.trim()) 
          : formData.technologies
      };

      await api.patch(`/cases/${project.id}/`, payload);
      onRefresh();
      onClose();
    } catch (err: any) {
      setError("ERRO DE SINCRONIZAÇÃO: Falha ao atualizar o núcleo do projeto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl border border-eng-cyan/30 bg-eng-black p-8 relative glow-cyan">
        
        <div className="flex justify-between items-center mb-8 border-b border-eng-border pb-4">
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest flex items-center gap-3">
            <RefreshCw size={20} className="text-eng-cyan animate-spin-slow" /> Edit_Node: {project.id}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={24} /></button>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="label-style">Title</label>
            <input 
              value={formData.title}
              className="input-style"
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="col-span-1">
            <label className="label-style">Category</label>
            <select 
              value={formData.category}
              className="input-style"
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="BE">Backend / SaaS</option>
              <option value="IOT">Hardware / IoT</option>
              <option value="CV">Computer Vision</option>
              <option value="AT">Automation</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="label-style">Stack (Array)</label>
            <input 
              value={formData.technologies}
              className="input-style font-mono text-xs"
              onChange={e => setFormData({...formData, technologies: e.target.value})}
            />
          </div>

          <div className="col-span-2">
            <label className="label-style text-eng-green">Impact_Metric</label>
            <input 
              value={formData.impact_metrics}
              className="input-style border-eng-green/30 text-eng-green"
              onChange={e => setFormData({...formData, impact_metrics: e.target.value})}
            />
          </div>

          {error && <div className="col-span-2 text-red-500 text-[10px] font-mono">{error}</div>}

          <div className="col-span-2 pt-4">
            <button 
              disabled={loading}
              className="w-full bg-eng-cyan/20 border border-eng-cyan text-eng-cyan py-4 font-mono text-sm uppercase tracking-[0.3em] hover:bg-eng-cyan hover:text-black transition-all"
            >
              {loading ? "PATCHING..." : "Update_Database_Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}