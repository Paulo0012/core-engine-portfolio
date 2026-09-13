import { Terminal } from 'lucide-react';
import HeroMedia from './HeroMedia';

export default function HeroSection() {
  return (
    <section id="sobre" className="min-h-[90vh] flex items-center pt-20 border-b border-gn-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* TEXT CONTENT */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gn-surface/20 border border-gn-surface rounded-full">
            <Terminal size={14} className="text-gn-accent" />
            <span className="text-xs font-mono tracking-widest text-gn-text uppercase">Paulo Gomes</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-gn-highlight leading-[1.1] tracking-tighter">
            Engenheiro de <br />
            <span className="text-gn-accent font-medium tracking-tight">Sistemas Embarcados & IoT</span>
          </h1>
          
          <p className="text-lg text-gn-text max-w-lg leading-relaxed font-light">
            Especialista em C/C++, Python e desenvolvimento de hardware (FPGA, ESP32). Focado em automação, IoT, visão computacional e arquiteturas escaláveis.
          </p>
          
          <div className="flex gap-4">
             <div className="flex flex-col p-5 bg-gn-surface/10 rounded-xl border border-gn-surface w-32">
                <span className="text-3xl font-light text-gn-highlight tracking-tighter">2+</span>
                <span className="text-[10px] text-gn-accent uppercase tracking-widest mt-1">Anos Exp.</span>
             </div>
             <div className="flex flex-col p-5 bg-gn-surface/10 rounded-xl border border-gn-surface w-32">
                <span className="text-3xl font-light text-gn-highlight tracking-tighter">10+</span>
                <span className="text-[10px] text-gn-accent uppercase tracking-widest mt-1">Projetos</span>
             </div>
          </div>
        </div>

        {/* INTERACTIVE HERO MEDIA */}
        <div className="flex justify-center lg:justify-end">
          <HeroMedia />
        </div>

      </div>
    </section>
  );
}
