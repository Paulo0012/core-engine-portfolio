export default function EducationSection() {
  return (
    <section id="formacoes" className="scroll-mt-32 border-t border-gn-surface pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Formação Acadêmica
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group p-8 border border-gn-surface bg-gn-bg hover:bg-gn-surface/10 transition-colors rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono tracking-widest text-gn-accent uppercase">2024 / Concluído</h4>
            <div className="w-2 h-2 rounded-full bg-gn-accent group-hover:bg-gn-highlight transition-colors"></div>
          </div>
          <h3 className="text-xl font-medium text-gn-highlight">Bacharel em Ciência e Tecnologia</h3>
          <p className="text-sm text-gn-text">UFMA - Universidade Federal do Maranhão</p>
        </div>
        
        <div className="group p-8 border border-gn-surface bg-gn-bg hover:bg-gn-surface/10 transition-colors rounded-2xl space-y-3 relative overflow-hidden">
          {/* Subtle active indicator */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gn-text to-transparent opacity-20"></div>
          
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono tracking-widest text-gn-accent uppercase">Em andamento</h4>
            <div className="w-2 h-2 rounded-full bg-gn-highlight animate-pulse"></div>
          </div>
          <h3 className="text-xl font-medium text-gn-highlight">Engenharia de Computação</h3>
          <p className="text-sm text-gn-text">UFMA / Residência em Sistemas Embarcados IFMA</p>
        </div>
      </div>
    </section>
  );
}
