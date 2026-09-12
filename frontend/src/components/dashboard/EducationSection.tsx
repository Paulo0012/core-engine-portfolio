export default function EducationSection() {
  return (
    <section id="formacoes" className="scroll-mt-32 border-t border-white/5 pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-white tracking-tight">
          Formação Acadêmica
        </h2>
        <div className="flex-1 h-px bg-white/5"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase">2024 / Concluído</h4>
            <div className="w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-neutral-400 transition-colors"></div>
          </div>
          <h3 className="text-xl font-medium text-neutral-200">Bacharel em Ciência e Tecnologia</h3>
          <p className="text-sm text-neutral-500">UFMA - Universidade Federal do Maranhão</p>
        </div>
        
        <div className="group p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors rounded-2xl space-y-3 relative overflow-hidden">
          {/* Subtle active indicator */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-20"></div>
          
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Em andamento</h4>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-medium text-neutral-200">Engenharia de Computação</h3>
          <p className="text-sm text-neutral-500">UFMA / Residência em Sistemas Embarcados IFMA</p>
        </div>
      </div>
    </section>
  );
}
