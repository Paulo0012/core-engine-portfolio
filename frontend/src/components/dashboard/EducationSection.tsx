import { useEffect, useState } from 'react';
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
    <section id="formacoes" className="scroll-mt-32 border-t border-gn-surface pt-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          Formação Acadêmica & Certificações
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Academic Journey */}
        <div className="space-y-6">
          <h3 className="text-lg font-mono text-gn-accent uppercase tracking-widest mb-6">Jornada Acadêmica</h3>
          <div className="space-y-4">
            {academics.map(acad => (
              <div key={acad.id} className="group p-6 border border-gn-surface bg-gn-bg hover:bg-gn-surface/10 transition-colors rounded-xl flex flex-col justify-between relative overflow-hidden h-44">
                {acad.status === 'Cursando' && (
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gn-text to-transparent opacity-20"></div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-gn-accent uppercase">{acad.period} / {acad.status}</h4>
                    <div className={`w-2 h-2 rounded-full ${acad.status === 'Cursando' ? 'bg-gn-highlight animate-pulse' : 'bg-gn-accent group-hover:bg-gn-highlight transition-colors'}`}></div>
                  </div>
                  <h3 className="text-lg font-medium text-gn-highlight line-clamp-2">{acad.course}</h3>
                </div>
                <p className="text-xs text-gn-text truncate">{acad.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <h3 className="text-lg font-mono text-gn-accent uppercase tracking-widest mb-6">Certificações</h3>
          <div className="space-y-4">
            {certs.map(cert => (
              <div key={cert.id} className="group p-6 border border-gn-surface bg-gn-bg hover:bg-gn-surface/10 transition-colors rounded-xl flex flex-col justify-between h-44">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-gn-accent uppercase">{cert.date_info}</h4>
                  </div>
                  <h3 className="text-lg font-medium text-gn-highlight line-clamp-2">{cert.name}</h3>
                </div>
                <p className="text-xs text-gn-text truncate">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
