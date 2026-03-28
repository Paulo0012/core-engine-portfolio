import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Database, Cpu } from 'lucide-react';
import api from '../services/api';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'BE',
    technologies: '',
    problem_statement: '',
    solution_architecture: '',
    impact_metrics: '',
    github_link: '',
    live_demo: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/cases/${id}/`).then(res => {
        setFormData({
          ...res.data,
          technologies: res.data.technologies.join(', ')
        });
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
    };

    try {
      if (id) await api.put(`/cases/${id}/`, payload);
      else await api.post('/cases/', payload);
      navigate('/admin');
    } catch (err) {
      alert("ERRO_AO_PERSISTIR_DADOS: Verifique o console do Django.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 font-mono">
      <header className="flex justify-between items-center mb-12 border-b border-eng-border pb-6">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">
          {id ? `Edit_Node_${id}` : 'Create_New_Node'}
        </h2>
        <button onClick={() => navigate('/admin')} className="text-slate-500 hover:text-white"><X /></button>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8 bg-slate-900/20 p-8 border border-eng-border">
        <div className="col-span-1 space-y-2">
          <label className="text-[10px] text-slate-500 uppercase">Project_Title</label>
          <input 
            required
            className="w-full bg-black/40 border border-eng-border p-3 text-white outline-none focus:border-eng-cyan"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="col-span-1 space-y-2">
          <label className="text-[10px] text-slate-500 uppercase">System_Category</label>
          <select 
            className="w-full bg-black/40 border border-eng-border p-3 text-white outline-none focus:border-eng-cyan"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
            <option value="BE">Backend / SaaS</option>
            <option value="IOT">Hardware / IoT</option>
            <option value="CV">Computer Vision</option>
          </select>
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-[10px] text-slate-500 uppercase">Tech_Stack (Separado por vírgula)</label>
          <input 
            className="w-full bg-black/40 border border-eng-border p-3 text-eng-cyan outline-none focus:border-eng-cyan"
            value={formData.technologies}
            onChange={e => setFormData({...formData, technologies: e.target.value})}
          />
        </div>

        <div className="col-span-1 space-y-2">
          <label className="text-[10px] text-slate-500 uppercase"><Database size={10} className="inline mr-1" /> Problem_Statement</label>
          <textarea 
            rows={4}
            className="w-full bg-black/40 border border-eng-border p-3 text-slate-300 outline-none text-xs italic"
            value={formData.problem_statement}
            onChange={e => setFormData({...formData, problem_statement: e.target.value})}
          />
        </div>

        <div className="col-span-1 space-y-2">
          <label className="text-[10px] text-slate-500 uppercase"><Cpu size={10} className="inline mr-1" /> Solution_Architecture</label>
          <textarea 
            rows={4}
            className="w-full bg-black/40 border border-eng-border p-3 text-slate-300 outline-none text-xs italic"
            value={formData.solution_architecture}
            onChange={e => setFormData({...formData, solution_architecture: e.target.value})}
          />
        </div>

        <div className="col-span-2 pt-6">
          <button className="w-full bg-eng-cyan text-black py-4 font-bold uppercase text-xs tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3">
            <Save size={18} /> Commit_Data_To_Core
          </button>
        </div>
      </form>
    </div>
  );
}