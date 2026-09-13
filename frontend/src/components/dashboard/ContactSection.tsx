import { useState } from 'react';
import { Send, User, Code2, Mail, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    
    setLoading(true);
    try {
      // Aqui integraria com a API real de contato
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação
      setStatus('success');
      setFormData({ name: '', email: '', message: '', consent: false });
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contato" className="scroll-mt-32 pt-16  pb-32">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Contato
        </h2>
        
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        
        {/* Call to Actions Principais */}
        <div className="w-full flex flex-col items-center gap-6">
          <a 
            href="https://wa.me/5598999999999" 
            target="_blank" 
            rel="noreferrer"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-4 px-12 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-[#25D366]/20"
          >
            <MessageCircle size={24} />
            Conversar no WhatsApp
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-mono text-gn-text w-full">
            <a href="https://www.linkedin.com/in/paulo-gabriel-b0511b255" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gn-highlight transition-colors">
              <User size={18} /> LinkedIn
            </a>
            <div className="hidden sm:block w-px h-4 bg-gn-surface"></div>
            <a href="https://github.com/Paulo0012" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gn-highlight transition-colors">
              <Code2 size={18} /> GitHub
            </a>
            <div className="hidden sm:block w-px h-4 bg-gn-surface"></div>
            <a href="mailto:paulo.gabriel1019@gmail.com" className="flex items-center gap-2 hover:text-gn-highlight transition-colors">
              <Mail size={18} /> paulo.gabriel1019@gmail.com
            </a>
          </div>
        </div>

        {/* CTA BLAZING BUTTON */}
        <div className="relative group mt-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-gn-accent to-gn-highlight rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <a 
            href="https://wa.me/5598987131757" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-5 bg-gn-highlight text-gn-bg text-sm font-black uppercase tracking-widest rounded-full hover:bg-gn-text hover:-translate-y-1 transition-all duration-300"
          >
            Vamos Conversar <Send size={16} />
          </a>
        </div>

        {/* Formulário de Contato */}
        <div className="w-full bg-gn-bg border border-gn-surface/50 rounded-2xl p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gn-surface/20 rounded-full">
              <Send size={18} className="text-gn-highlight" />
            </div>
            <h3 className="text-gn-highlight font-mono text-sm tracking-widest uppercase">
              Digite sua mensagem...
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold text-gn-text tracking-widest uppercase">Nome</label>
              <input 
                id="name"
                type="text" 
                required
                placeholder="Seu nome"
                className="w-full bg-black/40 border border-gn-surface/50 rounded-xl p-4 text-gn-highlight focus:border-gn-accent focus:ring-1 focus:ring-gn-accent outline-none transition-all placeholder:text-gn-surface"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-gn-text tracking-widest uppercase">Email</label>
              <input 
                id="email"
                type="email" 
                required
                placeholder="seu@email.com"
                className="w-full bg-black/40 border border-gn-surface/50 rounded-xl p-4 text-gn-highlight focus:border-gn-accent focus:ring-1 focus:ring-gn-accent outline-none transition-all placeholder:text-gn-surface"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold text-gn-text tracking-widest uppercase">Mensagem</label>
              <textarea 
                id="message"
                required
                rows={4}
                placeholder="Digite sua mensagem..."
                className="w-full bg-black/40 border border-gn-surface/50 rounded-xl p-4 text-gn-highlight focus:border-gn-accent focus:ring-1 focus:ring-gn-accent outline-none transition-all placeholder:text-gn-surface resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
              <div className="flex justify-between items-center text-[10px] text-gn-surface font-mono mt-1 px-1">
                <span>Mínimo 10 caracteres</span>
                <span>{formData.message.length}/500</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="consent"
                required
                className="mt-1 w-4 h-4 rounded border-gn-surface/50 bg-black/40 text-gn-accent focus:ring-gn-accent focus:ring-offset-0"
                checked={formData.consent}
                onChange={e => setFormData({...formData, consent: e.target.checked})}
              />
              <label htmlFor="consent" className="text-xs text-gn-text leading-relaxed font-light">
                Concordo com a <a href="#" className="text-gn-highlight underline decoration-gn-surface underline-offset-4 hover:decoration-gn-highlight transition-colors">Política de Privacidade</a> e autorizo o uso dos meus dados para contato.
              </label>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading || !formData.consent || formData.message.length < 10}
                className="w-full bg-gn-surface/10 hover:bg-gn-surface/20 border border-gn-surface/50 text-gn-highlight font-bold tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gn-highlight border-t-transparent rounded-full animate-spin"></div> Processando...</span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2 text-gn-accent"><CheckCircle2 size={18} /> Mensagem enviada</span>
                ) : status === 'error' ? (
                  <span className="flex items-center gap-2 text-red-400"><AlertCircle size={18} /> Erro ao enviar</span>
                ) : (
                  <><Send size={18} /> Enviar mensagem</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
