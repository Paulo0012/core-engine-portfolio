export default function TechStackSection() {
  const languages = ['Python', 'Django', 'React', 'PHP', 'TypeScript', 'SQL', 'C++', 'OpenCV'];

  return (
    <section id="linguagens" className="scroll-mt-32 border-t border-gn-surface pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Stack & Tecnologias
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
        {languages.map(item => (
          <div 
            key={item} 
            className="p-6 border border-gn-surface bg-gn-bg rounded-xl flex items-center justify-center hover:bg-gn-surface/20 transition-all group"
          >
            <span className="font-mono text-sm text-gn-accent group-hover:text-gn-highlight transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
