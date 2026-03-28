import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, RefreshCw, 
  Database, ShieldCheck, AlertTriangle 
} from 'lucide-react';
import api from '../services/api';

interface Project {
  id: number;
  title: string;
  category: string;
  impact_metrics: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Protocolo de Sincronização com o Backend
  const loadProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/cases/');
      setProjects(res.data);
    } catch (err) {
      setError("CRITICAL_FAILURE: Falha na conexão com o Banco de Dados.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Operação de Deleção de Nó (D)
  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`SISTEMA: Confirmar deleção permanente do nó [${title}]?`)) {
      try {
        await api.delete(`/cases/${id}/`);
        loadProjects(); // Recarrega a lista após deletar
      } catch (err) {
        alert("ERRO: O sistema impediu a exclusão. Verifique permissões.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 font-mono">
      
      {/* HEADER DE COMANDO */}
      <header className="flex justify-between items-end border-b border-eng-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-eng-cyan text-[10px] uppercase tracking-[0.3em] mb-1">
            <ShieldCheck size={14} /> System_Root_Access
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            Admin_<span className="text-eng-cyan">Panel</span>
          </h2>
        </div>

        {/* GATILHO: NOVO PROJETO */}
        <button 
          onClick={() => navigate('/admin/new')}
          className="bg-eng-cyan text-black px-8 py-3 text-xs font-bold uppercase hover:bg-white transition-all flex items-center gap-3 shadow-glow-cyan"
        >
          <Plus size={18} /> New_Project_Entry
        </button>
      </header>

      {/* TABELA DE ATIVOS TÉCNICOS */}
      <div className="border border-eng-border bg-slate-900/20 backdrop-blur-sm overflow-hidden">
        <table className="w-full text-left text-[11px] uppercase tracking-wider">
          <thead className="bg-white/5 text-slate-500 border-b border-eng-border">
            <tr>
              <th className="p-5 font-bold">ID_NODE</th>
              <th className="p-5 font-bold">Project_Identifier</th>
              <th className="p-5 font-bold">Category</th>
              <th className="p-5 font-bold">Efficiency_Impact</th>
              <th className="p-5 text-right font-bold">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-eng-border">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-5 text-slate-600 font-mono italic">#{p.id}</td>
                <td className="p-5 text-white font-bold group-hover:text-eng-cyan transition-colors">
                  {p.title}
                </td>
                <td className="p-5 text-eng-cyan font-mono opacity-80">{p.category}</td>
                <td className="p-5 text-eng-green font-bold glow-green">
                  {p.impact_metrics}
                </td>
                <td className="p-5 text-right flex justify-end gap-6 items-center">
                  
                  {/* GATILHO: EDITAR PROJETO (PASSANDO O ID) */}
                  <button 
                    onClick={() => navigate(`/admin/edit/${p.id}`)}
                    className="text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-1"
                    title="EDIT_NODE"
                  >
                    <Edit size={16}/>
                  </button>
                  
                  {/* GATILHO: DELETAR PROJETO */}
                  <button 
                    onClick={() => handleDelete(p.id, p.title)} 
                    className="text-slate-500 hover:text-red-500 transition-colors"
                    title="TERMINATE_NODE"
                  >
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ESTADOS DE CARREGAMENTO E ERRO */}
        {loading && (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <RefreshCw className="animate-spin text-eng-cyan" size={24} />
            <span className="text-eng-cyan text-[10px] animate-pulse">Syncing_Database_Cores...</span>
          </div>
        )}

        {error && (
          <div className="p-20 text-center text-red-500 flex flex-col items-center gap-4">
            <AlertTriangle size={32} />
            <span className="text-[10px]">{error}</span>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="p-20 text-center text-slate-600 italic font-mono text-xs">
            NO_DATA_NODES_FOUND_IN_CORE.
          </div>
        )}
      </div>

      {/* FOOTER DE STATUS */}
      <footer className="flex items-center gap-4 text-[9px] text-slate-700 uppercase tracking-[0.4em] pt-4">
        <Database size={12} /> Database_Status: <span className="text-eng-green italic font-bold tracking-normal">Online_Stable</span>
      </footer>
    </div>
  );
}