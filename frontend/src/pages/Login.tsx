import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, Terminal } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/token/', credentials); // Endpoint JWT do Django
      localStorage.setItem('token', res.data.access);
      navigate('/admin');
    } catch (err) {
      setError("ACESSO_NEGADO: Credenciais Inválidas ou Expiradas.");
    }
  };

  return (
    <div className="h-full flex items-center justify-center font-mono">
      <div className="w-96 border border-eng-border bg-slate-900/40 p-10 glow-cyan relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-eng-cyan animate-pulse" />
        
        <div className="flex flex-col items-center mb-10">
          <div className="p-4 bg-eng-cyan/10 rounded-full mb-4 border border-eng-cyan/20">
            <Lock className="text-eng-cyan" size={32} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-[0.3em] uppercase">Auth_Gateway</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest">User_ID</label>
            <input 
              type="text"
              required
              className="w-full bg-black/40 border border-eng-border p-3 text-white outline-none focus:border-eng-cyan transition-all"
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest">Access_Key</label>
            <input 
              type="password"
              required
              className="w-full bg-black/40 border border-eng-border p-3 text-white outline-none focus:border-eng-cyan transition-all"
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {error && (
            <div className="text-[9px] text-red-500 flex items-center gap-2 animate-bounce">
              <ShieldAlert size={12} /> {error}
            </div>
          )}

          <button className="w-full bg-eng-cyan/10 border border-eng-cyan text-eng-cyan py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-eng-cyan hover:text-black transition-all">
            Execute_Handshake
          </button>
        </form>
      </div>
    </div>
  );
}