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
    <div className="max-w-7xl mx-auto space-y-12 pb-24 pt-10 px-6 font-mono text-base text-gn-text">
      
      {/* HEADER DE OPERAÇÃO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gn-surface pb-10 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gn-accent text-xs uppercase tracking-[0.4em] font-bold">
            <ShieldCheck size={18} /> System_Root_Authorized
          </div>
          <h2 className="text-4xl font-black text-gn-highlight uppercase tracking-tighter italic">
            Admin_<span className="text-gn-accent">Vault</span>
          </h2>
        </div>

        <button 
          onClick={() => navigate('/admin/new')}
          className="bg-gn-highlight text-gn-bg px-10 py-4 text-sm font-black uppercase hover:bg-gn-accent transition-all flex items-center gap-3 rounded-lg shadow-lg"
        >
          <Plus size={20} /> Deploy_New_Project
        </button>
      </header>

      {/* PAINEL DE MONITORAMENTO (Cards Rápidos) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gn-surface/10 border border-gn-surface/50 rounded-xl">
          <p className="text-xs text-gn-text uppercase tracking-widest mb-2">Total_Nodes</p>
          <p className="text-3xl font-bold text-gn-highlight">{projects.length}</p>
        </div>
        <div className="p-6 bg-gn-surface/10 border border-gn-surface/50 rounded-xl">
          <p className="text-xs text-gn-text uppercase tracking-widest mb-2">System_Uptime</p>
          <p className="text-3xl font-bold text-gn-accent">99.9%</p>
        </div>
        <div className="p-6 bg-gn-surface/10 border border-gn-surface/50 rounded-xl">
          <p className="text-xs text-gn-text uppercase tracking-widest mb-2">Database_Type</p>
          <p className="text-3xl font-bold text-gn-accent italic">SQLite_V3</p>
        </div>
      </div>

      {/* INTEGRAÇÃO CMS (DJANGO ADMIN) */}
      <div className="border border-gn-surface/50 bg-gn-surface/10 rounded-xl p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Database size={24} className="text-gn-accent" />
          <h3 className="text-xl font-bold text-gn-highlight uppercase tracking-widest">Master CMS Access</h3>
        </div>
        <p className="text-sm text-gn-text">
          Para realizar o CRUD avançado (com suporte a upload de certificados, ordenação e metadados) nas demais entidades do sistema, utilize o Master CMS (Django Admin).
        </p>
        <div className="flex flex-wrap gap-4">
          <a href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v1', '') : 'http://localhost:8000'}/admin/engine/academicjourney/`} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gn-surface/50 hover:border-gn-accent bg-gn-surface/20 hover:bg-gn-surface/40 text-gn-highlight text-sm font-bold uppercase transition-all rounded-lg flex items-center gap-2">
            <LayoutGrid size={16}/> Jornada Acadêmica
          </a>
          <a href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v1', '') : 'http://localhost:8000'}/admin/engine/certification/`} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gn-surface/50 hover:border-gn-accent bg-gn-surface/20 hover:bg-gn-surface/40 text-gn-highlight text-sm font-bold uppercase transition-all rounded-lg flex items-center gap-2">
            <LayoutGrid size={16}/> Certificações
          </a>
          <a href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v1', '') : 'http://localhost:8000'}/admin/engine/professionalexperience/`} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gn-surface/50 hover:border-gn-accent bg-gn-surface/20 hover:bg-gn-surface/40 text-gn-highlight text-sm font-bold uppercase transition-all rounded-lg flex items-center gap-2">
            <LayoutGrid size={16}/> Experiências
          </a>
          <a href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v1', '') : 'http://localhost:8000'}/admin/engine/skill/`} target="_blank" rel="noreferrer" className="px-6 py-3 border border-gn-surface/50 hover:border-gn-accent bg-gn-surface/20 hover:bg-gn-surface/40 text-gn-highlight text-sm font-bold uppercase transition-all rounded-lg flex items-center gap-2">
            <LayoutGrid size={16}/> Habilidades
          </a>
        </div>
      </div>

      {/* TABELA DE ATIVOS */}
      <div className="border border-gn-surface/50 bg-white/50 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base uppercase tracking-tight">
            <thead className="bg-gn-surface/20 text-gn-text border-b border-gn-surface/50">
              <tr>
                <th className="p-6 font-bold"># ID</th>
                <th className="p-6 font-bold">Project_Name</th>
                <th className="p-6 font-bold text-center">Category</th>
                <th className="p-6 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gn-surface/30">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gn-surface/10 transition-colors group">
                  <td className="p-6 text-gn-text italic font-bold">#{p.id}</td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-gn-highlight font-bold group-hover:text-gn-accent transition-colors">{p.title}</span>
                      <span className="text-[10px] text-gn-text lowercase tracking-normal">{p.impact_metrics}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-3 py-1 bg-gn-surface/20 border border-gn-surface/30 rounded-full text-xs text-gn-accent font-bold">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-8">
                      <button 
                        onClick={() => navigate(`/admin/edit/${p.id}`)}
                        className="text-gn-text hover:text-gn-accent transition-all transform hover:scale-125"
                        title="EDIT_NODE"
                      >
                        <Edit size={20}/>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id, p.title)} 
                        className="text-gn-text hover:text-red-500 transition-all transform hover:scale-125"
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
            <RefreshCw className="animate-spin text-gn-accent" size={40} />
            <span className="text-gn-accent text-sm animate-pulse tracking-[0.3em]">SYNCHRONIZING_CORES...</span>
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
          <div className="p-24 text-center text-gn-text italic text-sm">
            --- NO_TECHNICAL_NODES_REGISTERED ---
          </div>
        )}
      </div>

      {/* BARRA DE STATUS INFERIOR */}
      <footer className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gn-text uppercase tracking-[0.5em] border-t border-gn-surface/50 pt-10">
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-gn-accent" /> 
          Server_Status: <span className="text-gn-accent font-bold tracking-normal">Optimal_200_OK</span>
        </div>
        <div className="flex items-center gap-3">
          <Database size={14} /> 
          Storage: <span className="text-gn-text font-bold tracking-normal italic">Local_SQLite_Provider</span>
        </div>
      </footer>
    </div>
  );
}