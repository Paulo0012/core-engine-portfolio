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

  // Divide as tecnologias em duas linhas
  const row1Tech = technologies.slice(0, 4);
  const row2Tech = technologies.slice(4, 8);

  // Componente interno para renderizar um conjunto de itens
  const TechSet = ({ items, suffix }: { items: typeof technologies, suffix: string }) => (
    <div className="flex gap-6 pr-6">
      {items.map(({ name, icon: Icon }) => (
        <div 
          key={`${name}-${suffix}`} 
          className="w-40 p-6 border border-gn-surface bg-gn-bg rounded-xl flex flex-col items-center justify-center gap-3 shrink-0 hover:-translate-y-1 hover:shadow-lg hover:shadow-gn-surface/20 hover:bg-gn-surface/10 transition-all duration-300 group cursor-pointer"
        >
          <Icon className="text-3xl text-gn-accent group-hover:text-gn-highlight transition-colors duration-300" />
          <span className="font-mono text-sm text-gn-accent group-hover:text-gn-highlight transition-colors duration-300">{name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="linguagens" className="scroll-mt-32 border-t border-gn-surface pt-16 overflow-hidden">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Stack & Tecnologias
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      {/* Container com máscara de gradiente e track animada */}
      <div className="ticker-wrapper relative w-full overflow-hidden py-4 flex flex-col gap-6">
        
        {/* Linha 1 - Move para a Esquerda */}
        <div className="ticker-track flex w-max">
          {/* Multiplicado 8 vezes para cobrir telas ultra-wide (50% do total = 4 sets) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <TechSet key={`r1-${i}`} suffix={`r1-${i}`} items={row1Tech} />
          ))}
        </div>

        {/* Linha 2 - Move para a Direita (animation-direction: reverse) */}
        <div className="ticker-track flex w-max" style={{ animationDirection: 'reverse' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <TechSet key={`r2-${i}`} suffix={`r2-${i}`} items={row2Tech} />
          ))}
        </div>

      </div>
    </section>
  );
}
