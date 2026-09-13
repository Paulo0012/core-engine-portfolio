import { useEffect, useState } from 'react';
import api from '../services/api';
import HeroSection from '../components/dashboard/HeroSection';
import EducationSection from '../components/dashboard/EducationSection';
import ExperienceSection from '../components/dashboard/ExperienceSection';
import TechStackSection from '../components/dashboard/TechStackSection';
import ProjectsSection from '../components/dashboard/ProjectsSection';
import AboutSection from '../components/dashboard/AboutSection';
import ContactSection from '../components/dashboard/ContactSection';
import videoSrc from '../assets/transicao.mp4';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    api.get('/cases/')
      .then(res => setProjects(res.data))
      .catch(e => console.error("Erro na API ao carregar casos:", e));
  }, []);

  return (
    <div className="relative min-h-screen font-sans">
      
      {/* VÍDEO DE FUNDO DA TELA INTEIRA */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-20' : 'opacity-0'
          }`}
        />
        {/* Overlay para escurecer o vídeo levemente e dar contraste com o texto */}
        <div className="absolute inset-0 bg-gn-bg/80 mix-blend-multiply" />
      </div>

      {/* CONTEÚDO PRINCIPAL (z-index maior para ficar acima do vídeo) */}
      <div className="relative z-10 space-y-20 pb-32 px-6 lg:px-20 max-w-6xl mx-auto text-gn-text">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </div>
    </div>
  );
}