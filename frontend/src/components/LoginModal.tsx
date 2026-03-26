import { useState } from 'react';
import { Lock, ShieldCheck, X } from 'lucide-react';
import api from '../services/api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: any) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', credentials);
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError("ACESSO NEGADO: Credenciais Inválidas.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-96 border border-eng-border bg-eng-black p-8 relative glow-cyan">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-eng-cyan/10 rounded-full mb-4">
            <Lock className="text-eng-cyan" size={32} />
          </div>
          <h2 className="text-xl font-mono font-bold text-white tracking-widest uppercase">Admin_Auth</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">User_ID</label>
            <input 
              type="text"
              className="w-full bg-slate-900 border border-eng-border p-3 text-white font-mono text-sm focus:border-eng-cyan outline-none"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Access_Key</label>
            <input 
              type="password"
              className="w-full bg-slate-900 border border-eng-border p-3 text-white font-mono text-sm focus:border-eng-cyan outline-none"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500 text-[10px] font-mono animate-pulse">{error}</p>}

          <button className="w-full bg-eng-cyan/20 border border-eng-cyan text-eng-cyan py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-eng-cyan hover:text-black transition-all">
            Execute_Login
          </button>
        </form>
      </div>
    </div>
  );
}