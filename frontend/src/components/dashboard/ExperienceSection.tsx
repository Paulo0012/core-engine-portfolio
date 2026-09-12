export default function ExperienceSection() {
  return (
    <section id="sobre-detalhe" className="scroll-mt-32 border-t border-gn-surface pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Experiência Profissional
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 p-8 bg-gn-bg hover:bg-gn-surface/10 border border-gn-surface rounded-2xl transition-colors">
          <div className="md:w-1/4 shrink-0">
             <p className="text-xs font-mono tracking-widest text-gn-accent uppercase mt-1">2024 - Atual</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-gn-highlight">Data Analyst <span className="text-gn-accent font-light">@ SEAP-MA</span></h3>
            <p className="text-sm text-gn-text mt-4 leading-relaxed font-light">
              Atuação estratégica em análise de dados operacionais, desenvolvimento de automações para processos táticos e estruturação de arquiteturas de gestão de escalas utilizando Django e engenharia de software escalável.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 p-8 bg-gn-bg hover:bg-gn-surface/10 border border-gn-surface rounded-2xl transition-colors">
          <div className="md:w-1/4 shrink-0">
             <p className="text-xs font-mono tracking-widest text-gn-accent uppercase mt-1">2022 - 2024</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-gn-highlight">Assistente Técnico <span className="text-gn-accent font-light">@ Infogames</span></h3>
            <p className="text-sm text-gn-text mt-4 leading-relaxed font-light">
              Manutenção avançada, suporte técnico de nível II e desenvolvimento de soluções customizadas para automação comercial. Gestão de incidentes e otimização de infraestrutura local.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
