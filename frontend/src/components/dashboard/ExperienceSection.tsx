import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    api.get('/cms/experiences/')
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Failed to load experiences", err));
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="sobre-detalhe" className="scroll-mt-32 border-t border-gn-surface pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Experiência Profissional
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      <div className="space-y-6">
        {experiences.map(exp => (
          <div key={exp.id} className="flex flex-col md:flex-row gap-6 p-8 bg-gn-bg hover:bg-gn-surface/10 border border-gn-surface rounded-2xl transition-colors">
            <div className="md:w-1/4 shrink-0">
               <p className="text-xs font-mono tracking-widest text-gn-accent uppercase mt-1">{exp.period}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gn-highlight">{exp.role} <span className="text-gn-accent font-light">@ {exp.company}</span></h3>
              <p className="text-sm text-gn-text mt-4 leading-relaxed font-light whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
