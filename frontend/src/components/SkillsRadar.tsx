import React from 'react';
import { 
  Brain, 
  Eye, 
  Activity, 
  Cpu, 
  Code, 
  Network, 
  Terminal, 
  Server, 
  Database 
} from 'lucide-react';

const skillsData = [
  {
    category: 'Edge AI',
    items: [
      { name: 'YOLOv11', icon: Eye },
      { name: 'OpenCV', icon: Activity },
      { name: 'MediaPipe', icon: Brain },
    ]
  },
  {
    category: 'Embarcados',
    items: [
      { name: 'FreeRTOS', icon: Cpu },
      { name: 'C/C++', icon: Code },
      { name: 'MQTT', icon: Network },
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', icon: Terminal },
      { name: 'Django', icon: Server },
      { name: 'PostgreSQL', icon: Database },
    ]
  }
];

export const SkillsRadar: React.FC = () => {
  return (
    <div className="w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-2xl p-6 md:p-8 transition-all hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-6">
        {skillsData.map((section, idx) => (
          <div key={idx} className="flex-1 flex flex-col">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-5 border-b border-slate-200/50 pb-2">
              {section.category}
            </h3>
            <ul className="flex flex-col space-y-4">
              {section.items.map((skill, skillIdx) => {
                const Icon = skill.icon;
                return (
                  <li key={skillIdx} className="flex items-center gap-3 text-slate-700 font-medium group cursor-default">
                    <div className="p-2 bg-white/50 rounded-xl shadow-sm border border-white/80 text-indigo-500 transition-all duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:scale-105">
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm md:text-base tracking-tight transition-colors duration-300 group-hover:text-indigo-900">
                      {skill.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadar;
