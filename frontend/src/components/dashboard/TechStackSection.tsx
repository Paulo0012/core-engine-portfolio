import { FaPython, FaReact, FaPhp, FaDatabase } from 'react-icons/fa';
import { SiDjango, SiTypescript, SiCplusplus, SiOpencv } from 'react-icons/si';

export default function TechStackSection() {
  const technologies = [
    { name: 'Python', icon: FaPython },
    { name: 'Django', icon: SiDjango },
    { name: 'React', icon: FaReact },
    { name: 'PHP', icon: FaPhp },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'SQL', icon: FaDatabase },
    { name: 'C++', icon: SiCplusplus },
    { name: 'OpenCV', icon: SiOpencv },
  ];

  return (
    <section id="linguagens" className="scroll-mt-32 border-t border-gn-surface pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Stack & Tecnologias
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
        {technologies.map(({ name, icon: Icon }) => (
          <div 
            key={name} 
            className="p-6 border border-gn-surface bg-gn-bg rounded-xl flex flex-col items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-lg hover:shadow-gn-surface/20 hover:bg-gn-surface/10 transition-all duration-300 group cursor-pointer"
          >
            <Icon className="text-3xl text-gn-accent group-hover:text-gn-highlight transition-colors duration-300" />
            <span className="font-mono text-sm text-gn-accent group-hover:text-gn-highlight transition-colors duration-300">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
