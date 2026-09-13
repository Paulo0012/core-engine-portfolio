import { useEffect, useState } from 'react';
import { ExternalLink, GraduationCap } from 'lucide-react';
import api from '../../services/api';

interface Academic {
  id: number;
  course: string;
  institution: string;
  period: string;
  status: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date_info: string;
}

export default function EducationSection() {
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    api.get('/cms/academic/')
      .then(res => setAcademics(res.data))
      .catch(err => console.error(err));

    api.get('/cms/certifications/')
      .then(res => setCerts(res.data))
      .catch(err => console.error(err));
  }, []);

  if (academics.length === 0 && certs.length === 0) return null;

  return (
    <section id="formacoes" className="scroll-mt-32  pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight flex items-center gap-3">
          <GraduationCap className="text-gn-highlight" size={28} />
          Formação Acadêmica & Certificações
        </h2>
        
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Academic Journey */}
        <div className="space-y-6">
          <h3 className="text-lg font-mono text-gn-accent uppercase tracking-widest mb-6">Jornada Acadêmica</h3>
          <div className="space-y-4">
            {academics.map(acad => (
              <div key={acad.id} className="group p-6 border border-gn-surface bg-gn-bg hover:bg-gn-surface/10 rounded-xl flex flex-col justify-between relative overflow-hidden h-44 hover:-translate-y-1 hover:shadow-lg hover:shadow-gn-surface/20 transition-all duration-300 cursor-pointer">
                {acad.status === 'Cursando' && (
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gn-text to-transparent opacity-20"></div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-gn-accent uppercase group-hover:text-gn-highlight transition-colors duration-300">{acad.period} / {acad.status}</h4>
                    <div className={`w-2 h-2 rounded-full ${acad.status === 'Cursando' ? 'bg-gn-highlight animate-pulse' : 'bg-gn-accent group-hover:bg-gn-highlight transition-colors duration-300'}`}></div>
                  </div>
                  <h3 className="text-lg font-medium text-gn-highlight line-clamp-2">{acad.course}</h3>
                </div>
                <p className="text-xs text-gn-text truncate opacity-80 group-hover:opacity-100 transition-opacity duration-300">{acad.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <h3 className="text-lg font-mono text-gn-accent uppercase tracking-widest mb-6">Certificações</h3>
          <div className="space-y-4">
            {certs.map(cert => (
              <div key={cert.id} className="group p-6 border border-gn-surface bg-gn-bg hover:bg-gn-surface/10 rounded-xl flex flex-col justify-between h-44 hover:-translate-y-1 hover:shadow-lg hover:shadow-gn-surface/20 transition-all duration-300 cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-gn-accent uppercase group-hover:text-gn-highlight transition-colors duration-300">{cert.date_info}</h4>
                  </div>
                  <h3 className="text-lg font-medium text-gn-highlight line-clamp-2">{cert.name}</h3>
                </div>
                <p className="text-xs text-gn-text truncate opacity-80 group-hover:opacity-100 transition-opacity duration-300">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
