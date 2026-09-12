import { Terminal } from 'lucide-react';
import React, { useState } from 'react';

export default function HeroSection() {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -1 to 1
    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;
    
    // Calculate rotation angles (max 10 degrees)
    const rotateX = -yNorm * 10;
    const rotateY = xNorm * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section id="sobre" className="min-h-[90vh] flex items-center pt-20 border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* TEXT CONTENT */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Terminal size={14} className="text-neutral-400" />
            <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">Paulo Gomes</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
            Software Developer <br />
            <span className="text-neutral-500 font-medium tracking-tight">Backend Engineer</span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-lg leading-relaxed font-light">
            Especialista em automação e infraestrutura escalável. Focado na interseção entre 
            arquiteturas resilientes e interfaces de alto desempenho.
          </p>
          
          <div className="flex gap-4">
             <div className="flex flex-col p-5 bg-white/[0.02] rounded-xl border border-white/5 w-32">
                <span className="text-3xl font-light text-white tracking-tighter">2+</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Anos Exp.</span>
             </div>
             <div className="flex flex-col p-5 bg-white/[0.02] rounded-xl border border-white/5 w-32">
                <span className="text-3xl font-light text-white tracking-tighter">10+</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Projetos</span>
             </div>
          </div>
        </div>

        {/* INTERACTIVE HERO IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <div 
            className="relative group w-80 h-80 lg:w-[480px] lg:h-[480px] transition-transform duration-200 ease-out"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
          >
            {/* Subtle glow underneath */}
            <div className="absolute inset-0 rounded-2xl bg-neutral-100 blur-[100px] opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
              <img 
                src="/profile.jpg" 
                alt="Paulo Gomes" 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 opacity-100 pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
