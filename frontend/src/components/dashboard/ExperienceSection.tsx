export default function ExperienceSection() {
  return (
    <section id="sobre-detalhe" className="scroll-mt-32 border-t border-white/5 pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-white tracking-tight">
          Experiência Profissional
        </h2>
        <div className="flex-1 h-px bg-white/5"></div>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-2xl transition-colors">
          <div className="md:w-1/4 shrink-0">
             <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase mt-1">2024 - Atual</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-neutral-200">Data Analyst <span className="text-neutral-500 font-light">@ SEAP-MA</span></h3>
            <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-light">
              Atuação estratégica com foco em análise de dados operacionais, desenvolvimento de automações de processos táticos e estruturação de gestão de escalas utilizando Django e engenharia de software escalável.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-2xl transition-colors">
          <div className="md:w-1/4 shrink-0">
             <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase mt-1">2022 - 2024</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-neutral-300">Assistente Técnico <span className="text-neutral-600 font-light">@ Infogames</span></h3>
            <p className="text-sm text-neutral-500 mt-4 leading-relaxed font-light">
              Manutenção avançada, suporte técnico e desenvolvimento de soluções práticas para automação comercial. Gestão direta de incidentes e otimização de sistemas de clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
