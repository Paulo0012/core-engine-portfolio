import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cases/');
      setProjects(res.data);
    } catch (err) {
      alert("ERRO_DE_CONEXÃO_COM_MOTOR_DATABASE");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("CONFIRMAR_DELEÇÃO_PERMANENTE_DO_NÓ?")) {
      await api.delete(`/cases/${id}/`);
      loadProjects();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 font-mono">
      <header className="flex justify-between items-end border-b border-eng-border pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">System_Admin_Panel</h2>
          <p className="text-[10px] text-eng-cyan">Gestão de Ativos e Casos Técnicos</p>
        </div>
        <button className="bg-eng-cyan text-black px-6 py-2 text-xs font-bold uppercase hover:bg-white transition-all flex items-center gap-2">
          <Plus size={16} /> New_Entry
        </button>
      </header>

      <div className="overflow-x-auto border border-eng-border">
        <table className="w-full text-left text-[11px] uppercase tracking-wider">
          <thead className="bg-white/5 text-slate-500 border-b border-eng-border">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Project_Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Impact</th>
              <th className="p-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-eng-border">
            {projects.map((p: any) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-slate-600">{p.id}</td>
                <td className="p-4 text-white font-bold">{p.title}</td>
                <td className="p-4 text-eng-cyan">{p.category}</td>
                <td className="p-4 text-eng-green">{p.impact_metrics}</td>
                <td className="p-4 text-right space-x-4">
                  <button className="text-slate-500 hover:text-white"><Edit size={14}/></button>
                  <button onClick={() => handleDelete(p.id)} className="text-slate-500 hover:text-red-500"><Trash2 size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-10 text-center animate-pulse">Syncing_Database...</div>}
      </div>
    </div>
  );
}