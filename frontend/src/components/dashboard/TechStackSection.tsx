export default function TechStackSection() {
  const languages = ['Python', 'Django', 'React', 'PHP', 'TypeScript', 'SQL', 'C++', 'OpenCV'];

  return (
    <section id="linguagens" className="scroll-mt-32 border-t border-white/5 pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-white tracking-tight">
          Stack & Tecnologias
        </h2>
        <div className="flex-1 h-px bg-white/5"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
        {languages.map(item => (
          <div 
            key={item} 
            className="p-6 border border-white/5 bg-white/[0.01] rounded-xl flex items-center justify-center hover:bg-white/[0.03] hover:border-neutral-500 transition-all group"
          >
            <span className="font-mono text-sm text-neutral-400 group-hover:text-white transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
