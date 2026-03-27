import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/cases/');
        setProjects(res.data);
      } catch (err) {
        console.error("ERRO_AO_SINCRONIZAR_NODES");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="animate-pulse font-mono text-eng-cyan uppercase">Scanning_Nodes...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12 border-b border-eng-border pb-6">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
          Projetos <span className="text-eng-cyan">Lançados</span>
        </h2>
        <p className="text-slate-500 font-mono text-[10px] mt-2 uppercase tracking-widest">
          Soluções de Engenharia Fullstack & Sistemas Embarcados
        </p>
      </header>

      {/* Grid com apenas 2 colunas para os cards ficarem GRANDES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        <AnimatePresence>
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}