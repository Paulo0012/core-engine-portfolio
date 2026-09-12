import { useEffect, useState } from 'react';
import api from '../services/api';
import HeroSection from '../components/dashboard/HeroSection';
import EducationSection from '../components/dashboard/EducationSection';
import ExperienceSection from '../components/dashboard/ExperienceSection';
import TechStackSection from '../components/dashboard/TechStackSection';
import ProjectsSection from '../components/dashboard/ProjectsSection';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/cases/')
      .then(res => setProjects(res.data))
      .catch(e => console.error("Erro na API ao carregar casos:", e));
  }, []);

  return (
    <div className="space-y-32 pb-32 px-6 lg:px-20 max-w-6xl mx-auto bg-[#0a0a0a] min-h-screen text-neutral-200">
      <HeroSection />
      <EducationSection />
      <ExperienceSection />
      <TechStackSection />
      <ProjectsSection projects={projects} />
    </div>
  );
}