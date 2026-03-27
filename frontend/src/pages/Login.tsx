import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, Terminal, ChevronRight } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // O seu NinjaAPI no backend define @api.post("/login")
      // Certifique-se que o baseURL no services/api.ts termina em /api/v1
      const res = await api.post('/login', credentials);

      // O seu TokenSchema no Django Ninja retorna { "token": "..." }
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        
        // Log de auditoria no console do navegador
        console.log("AUTH_SUCCESS: Handshake de segurança concluído.");
        
        // Redireciona para o Dashboard de Administração
        navigate('/admin');
      }
    } catch (err: any) {
      // Captura a mensagem de erro customizada do seu MessageSchema no Ninja
      const msg = err.response?.data?.message || "ACESSO_NEGADO: Credenciais de engenheiro inválidas.";
      setError(msg);
      console.error("AUTH_FAILURE:", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center font-mono bg-eng-black">
      <div className="w-full max-w-md border border-eng-border bg-slate-900/40 p-10 relative overflow-hidden backdrop-blur-sm group hover:border-eng-cyan/50 transition-all duration-500">
        
        {/* Barra de Progresso/Status Superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-eng-border overflow-hidden">
          <div className={`h-full bg-eng-cyan transition-all duration-1000 ${loading ? 'w-full animate-pulse' : 'w-0'}`} />
        </div>
        
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 bg-eng-cyan/10 rounded-full mb-4 border border-eng-cyan/20 glow-cyan">
            <Lock className="text-eng-cyan" size={32} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-[0.4em] uppercase flex items-center gap-2">
            <Terminal size={18} className="text-eng-cyan" /> Auth_Gateway
          </h2>
          <p className="text-[9px] text-slate-600 mt-2 uppercase tracking-widest font-mono italic">
            Secure_Shell_V1_Active
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <ChevronRight size={10} className="text-eng-cyan" /> User_Identifier
            </label>
            <input 
              type="text"
              required
              disabled={loading}
              autoComplete="username"
              placeholder="e.g. paulo_admin"
              className="w-full bg-black/60 border border-eng-border p-4 text-white text-sm outline-none focus:border-eng-cyan focus:bg-black/80 transition-all font-mono placeholder:text-slate-800"
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <ChevronRight size={10} className="text-eng-cyan" /> Access_Credential
            </label>
            <input 
              type="password"
              required
              disabled={loading}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-black/60 border border-eng-border p-4 text-white text-sm outline-none focus:border-eng-cyan focus:bg-black/80 transition-all font-mono placeholder:text-slate-800"
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {error && (
            <div className="text-[9px] text-red-500 border border-red-500/20 bg-red-500/5 p-3 flex items-center gap-3 animate-pulse uppercase font-bold tracking-tighter">
              <ShieldAlert size={14} /> {error}
            </div>
          )}

          <button 
            disabled={loading}
            className={`w-full py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3
              ${loading 
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-wait' 
                : 'bg-eng-cyan/10 border border-eng-cyan text-eng-cyan hover:bg-eng-cyan hover:text-black shadow-glow-cyan'
              }`}
          >
            {loading ? "Authenticating..." : "Execute_Handshake"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-eng-border text-center">
          <p className="text-[8px] text-slate-700 font-mono uppercase tracking-[0.5em]">
            Restricted_Area // Unauthorized_Access_Logged
          </p>
        </div>
      </div>
    </div>
  );
}