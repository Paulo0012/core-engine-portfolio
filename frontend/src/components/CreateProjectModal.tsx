import { useState } from 'react';
import { X, Cpu, Code2, Microscope, Save, AlertTriangle } from 'lucide-react';
import api from '../services/api';

export default function CreateProjectModal({ isOpen, onClose, onRefresh }: any) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'BE',
    technologies: '', // Vamos converter string para lista no envio
    problem_statement: '',
    solution_architecture: '',
    impact_metrics: '',
    github_link: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Processamento de dados: Converte "Django, React" em ["Django", "React"]
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
      };

      await api.post('/cases/', payload);
      onRefresh(); // Recarrega a lista de projetos no Dashboard
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "ERRO CRÍTICO: Falha na persistência de dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl border border-eng-border bg-eng-black p-8 relative shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-eng-border pb-4">
          <h2 className="text-xl font-mono font-bold text-eng-cyan uppercase tracking-widest flex items-center gap-3">
            <PlusIcon size={20} /> New_Project_Entry
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Título e Categoria */}
          <div className="col-span-1">
            <label className="label-style">Project_Title</label>
            <input 
              required
              className="input-style"
              placeholder="Ex: NeoControlLab"
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="col-span-1">
            <label className="label-style">System_Category</label>
            <select 
              className="input-style"
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="BE">Backend / SaaS</option>
              <option value="IOT">Hardware / IoT</option>
              <option value="CV">Computer Vision</option>
              <option value="AT">Automation</option>
            </select>
          </div>

          {/* Tecnologias */}
          <div className="col-span-2">
            <label className="label-style">Stack_Array (Separe por vírgula)</label>
            <input 
              className="input-style font-mono text-xs"
              placeholder="Python, Django, MQTT, C++"
              onChange={e => setFormData({...formData, technologies: e.target.value})}
            />
          </div>

          {/* Problema e Arquitetura */}
          <div className="col-span-1">
            <label className="label-style">Problem_Statement</label>
            <textarea 
              rows={3}
              className="input-style text-xs"
              onChange={e => setFormData({...formData, problem_statement: e.target.value})}
            />
          </div>
          <div className="col-span-1">
            <label className="label-style">Solution_Architecture</label>
            <textarea 
              rows={3}
              className="input-style text-xs"
              onChange={e => setFormData({...formData, solution_architecture: e.target.value})}
            />
          </div>

          {/* Métricas de Impacto */}
          <div className="col-span-2">
            <label className="label-style text-eng-green">Impact_Result_Metric</label>
            <input 
              className="input-style border-eng-green/30 text-eng-green"
              placeholder="Ex: Redução de 40% na latência de rede"
              onChange={e => setFormData({...formData, impact_metrics: e.target.value})}
            />
          </div>

          {error && (
            <div className="col-span-2 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-mono flex items-center gap-2">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <div className="col-span-2 pt-4">
            <button 
              disabled={loading}
              className="w-full bg-eng-cyan/10 border border-eng-cyan text-eng-cyan py-4 font-mono text-sm uppercase tracking-[0.3em] hover:bg-eng-cyan hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? "COMMITTING_DATA..." : <><Save size={18}/> Commit_to_Engine</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Estilos Reutilizáveis (Tailwind)
const PlusIcon = ({size}: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;