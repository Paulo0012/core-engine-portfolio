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
        <div className="relative group mt-8 w-full sm:w-auto">
          <div className="absolute -inset-1 bg-[#25D366] rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <a 
            href="https://wa.me/5598987131757?text=Ol%C3%A1%20Paulo!%20Vim%20pelo%20seu%20portf%C3%B3lio." 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-5 bg-[#25D366] text-black text-sm font-black uppercase tracking-widest rounded-full hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#25D366]/20"
          >
            Vamos Conversar <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
