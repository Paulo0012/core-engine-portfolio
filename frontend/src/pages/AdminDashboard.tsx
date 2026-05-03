import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, RefreshCw, 
  Database, ShieldCheck, AlertTriangle,
  LayoutGrid, Activity
} from 'lucide-react';
import api from '../services/api';

interface Project {
  id: number;
  title: string;
  category: string;
  impact_metrics: string;
}

/**
 * ADMIN_COMMAND_CENTER
 * Painel de controle de 16px para gestão de ativos técnicos.
 */
export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Protocolo de Sincronização
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

  // Operação de Exclusão Permanente
  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`SISTEMA: Confirmar deleção permanente do nó [${title}]?`)) {
      try {
        await api.delete(`/cases/${id}/`);
        loadProjects(); 
      } catch (err) {
        alert("ERRO: O sistema impediu a exclusão. Verifique o token JWT.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 pt-10 px-6 font-mono text-base">
      
      {/* HEADER DE OPERAÇÃO (Escala 20px+) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-10 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-purple-500 text-xs uppercase tracking-[0.4em] font-bold">
            <ShieldCheck size={18} /> System_Root_Authorized
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Admin_<span className="text-purple-500">Vault</span>
          </h2>
        </div>

        <button 
          onClick={() => navigate('/admin/new')}
          className="bg-purple-600 text-white px-10 py-4 text-sm font-black uppercase hover:bg-white hover:text-black transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-sm"
        >
          <Plus size={20} /> Deploy_New_Project
        </button>
      </header>

      {/* PAINEL DE MONITORAMENTO (Cards Rápidos) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Total_Nodes</p>
          <p className="text-3xl font-bold text-white">{projects.length}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">System_Uptime</p>
          <p className="text-3xl font-bold text-eng-green text-green-500">99.9%</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Database_Type</p>
          <p className="text-3xl font-bold text-purple-500 italic">SQLite_V3</p>
        </div>
      </div>

      {/* TABELA DE ATIVOS (Escala 16px) */}
      <div className="border border-white/10 bg-[#0a0a0a] rounded-sm overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base uppercase tracking-tight">
            <thead className="bg-white/5 text-slate-500 border-b border-white/10">
              <tr>
                <th className="p-6 font-bold"># ID</th>
                <th className="p-6 font-bold">Project_Name</th>
                <th className="p-6 font-bold text-center">Category</th>
                <th className="p-6 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-purple-500/5 transition-colors group">
                  <td className="p-6 text-slate-600 italic font-bold">#{p.id}</td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-white font-bold group-hover:text-purple-400 transition-colors">{p.title}</span>
                      <span className="text-[10px] text-slate-600 lowercase tracking-normal">{p.impact_metrics}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-purple-400 font-bold">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-8">
                      <button 
                        onClick={() => navigate(`/admin/edit/${p.id}`)}
                        className="text-slate-500 hover:text-white transition-all transform hover:scale-125"
                        title="EDIT_NODE"
                      >
                        <Edit size={20}/>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id, p.title)} 
                        className="text-slate-500 hover:text-red-500 transition-all transform hover:scale-125"
                        title="TERMINATE_NODE"
                      >
                        <Trash2 size={20}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FEEDBACK DE ESTADO */}
        {loading && (
          <div className="p-24 text-center flex flex-col items-center gap-6">
            <RefreshCw className="animate-spin text-purple-500" size={40} />
            <span className="text-purple-500 text-sm animate-pulse tracking-[0.3em]">SYNCHRONIZING_CORES...</span>
          </div>
        )}

        {error && (
          <div className="p-24 text-center text-red-500 flex flex-col items-center gap-6">
            <AlertTriangle size={48} />
            <span className="text-sm font-bold">{error}</span>
            <button onClick={loadProjects} className="text-xs underline">RETRY_CONNECTION</button>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="p-24 text-center text-slate-700 italic text-sm">
            --- NO_TECHNICAL_NODES_REGISTERED ---
          </div>
        )}
      </div>

      {/* BARRA DE STATUS INFERIOR */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-700 uppercase tracking-[0.5em] border-t border-white/5 pt-10">
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-green-500" /> 
          Server_Status: <span className="text-green-500 font-bold tracking-normal">Optimal_200_OK</span>
        </div>
        <div className="flex items-center gap-3">
          <Database size={14} /> 
          Storage: <span className="text-slate-500 font-bold tracking-normal italic">Local_SQLite_Provider</span>
        </div>
      </footer>
    </div>
  );
}