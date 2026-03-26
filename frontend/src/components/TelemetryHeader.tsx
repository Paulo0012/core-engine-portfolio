import { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Server } from 'lucide-react';
import api from '../services/api'; // Caminho atualizado para a pasta services

export default function TelemetryHeader() {
  const [data, setData] = useState({ 
    cpu_usage: 0, 
    memory_usage: 0, 
    is_online: false,
    device_name: "OFFLINE_NODE"
  });

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await api.get('/telemetry/live');
        setData({ ...res.data, is_online: true });
      } catch (err) {
        setData(prev => ({ ...prev, is_online: false }));
        console.warn("[TELEMETRY] Node handshake failed.");
      }
    };
    
    // Polling de telemetria a cada 3 segundos (Simula RTOS)
    const interval = setInterval(fetchTelemetry, 3000); 
    fetchTelemetry(); // Chamada inicial
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900/40 border-b border-eng-border p-3 flex justify-between items-center font-mono text-[10px] backdrop-blur-sm z-10">
      <div className="flex gap-8">
        {/* STATUS UNIT */}
        <div className="flex items-center gap-2">
          <Activity size={14} className={data.is_online ? "text-eng-green" : "text-red-500"} />
          <span className="text-slate-500 uppercase">Status:</span>
          <span className={data.is_online ? "text-eng-green animate-pulse" : "text-red-500"}>
            {data.is_online ? "SYSTEM_ACTIVE" : "LINK_DOWN"}
          </span>
        </div>
        
        {/* CPU LOAD UNIT */}
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-eng-cyan" />
          <span className="text-slate-500 uppercase">CPU:</span>
          <span className="text-eng-cyan">[{data.cpu_usage.toString().padStart(2, '0')}%]</span>
        </div>

        {/* MEMORY UNIT */}
        <div className="flex items-center gap-2 text-slate-400">
          <Database size={14} className="text-amber-500" />
          <span className="text-slate-500 uppercase">Mem:</span>
          <span className="text-amber-400">{data.memory_usage}MB</span>
        </div>
      </div>

      {/* VERSION INFO */}
      <div className="flex items-center gap-3 text-slate-600">
        <span className="hidden md:inline">NODE_ID: {data.device_name}</span>
        <div className="h-3 w-[1px] bg-slate-800" />
        <Server size={12} />
        <span className="tracking-tighter uppercase font-bold">Soares-Gomes OS v1.0</span>
      </div>
    </div>
  );
}