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

const icons = [
  { icon: <Eye size={22} strokeWidth={2.5} />, name: 'YOLOv11' },
  { icon: <Activity size={22} strokeWidth={2.5} />, name: 'OpenCV' },
  { icon: <Brain size={22} strokeWidth={2.5} />, name: 'MediaPipe' },
  { icon: <Cpu size={22} strokeWidth={2.5} />, name: 'FreeRTOS' },
  { icon: <Code size={22} strokeWidth={2.5} />, name: 'C/C++' },
  { icon: <Network size={22} strokeWidth={2.5} />, name: 'MQTT' },
  { icon: <Terminal size={22} strokeWidth={2.5} />, name: 'Python' },
  { icon: <Server size={22} strokeWidth={2.5} />, name: 'Django' },
  { icon: <Database size={22} strokeWidth={2.5} />, name: 'PostgreSQL' }
];

const calculateItemStyle = ({ index, radius, totalItems }: { radius: number, index: number, totalItems: number }) => {
  const angle = (index / totalItems) * 360;
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);
  return { 
    left: `${50 + x}%`, 
    top: `${50 + y}%`, 
    transform: "translate(-50%, -50%)" 
  };
};

export const SkillsRadar: React.FC = () => {
  const radius = 50; 
  
  return (
    <div className="w-full bg-gn-bg border border-gn-surface/30 rounded-3xl p-6 lg:p-10 flex items-center justify-center min-h-[450px] overflow-hidden hover:bg-gn-surface/5 transition-colors group cursor-default hover:border-gn-surface/60 hover:shadow-xl hover:shadow-gn-surface/5">
      
      {/* Container do Efeito de Órbita */}
      <div className="relative flex h-64 w-64 md:h-80 md:w-80 items-center justify-center group/orbit">
        
        {/* Linhas de Órbita (Design Alinhado) */}
        <div className="absolute h-full w-full rounded-full border border-gn-surface/40 bg-gn-surface/5" />
        <div className="absolute h-[50%] w-[50%] rounded-full border border-gn-surface/20 bg-gn-surface/5" />
        
        {/* Centro do Radar */}
        <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gn-bg border border-gn-surface/40 shadow-sm text-gn-highlight transition-transform duration-500 hover:scale-110">
          <Cpu size={28} strokeWidth={2.5} />
        </div>

        {/* Wrapper que realiza a rotação contínua */}
        <div className="absolute inset-0 animate-rotate-full group-hover/orbit:[animation-play-state:paused]">
          
          {icons.map((item, index) => {
            const style = calculateItemStyle({ index, radius, totalItems: icons.length });
            
            return (
              <div 
                key={index} 
                className="absolute flex flex-col items-center justify-center"
                style={style}
              >
                {/* Elemento que faz a rotação reversa para manter os ícones em pé */}
                <div className="group/item relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gn-bg border border-gn-surface/40 shadow-sm text-gn-accent hover:text-gn-highlight hover:bg-gn-surface/10 hover:border-gn-surface hover:scale-110 transition-all duration-300 animate-rotate-full [animation-direction:reverse] group-hover/orbit:[animation-play-state:paused] cursor-pointer">
                  {item.icon}
                  
                  {/* Tooltip com o nome da Habilidade */}
                  <span className="absolute -bottom-8 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 text-[11px] font-bold tracking-widest uppercase text-gn-highlight bg-gn-bg border border-gn-surface/30 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap pointer-events-none z-20">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
      
    </div>
  );
};

export default SkillsRadar;
