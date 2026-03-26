import { useEffect, useState } from 'react';
import api from '../api';

export default function SystemLogs() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/cases/logs/system');
        setLogs(res.data);
      } catch (err) {
        setLogs(["[ERROR] Unable to fetch system logs. Link down."]);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-black/80 border-t border-eng-border h-32 p-4 font-mono text-[10px] overflow-y-auto">
      <div className="flex flex-col gap-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.includes('ERROR') ? 'text-red-500' : log.includes('SUCCESS') ? 'text-eng-green' : 'text-slate-400'}>
              {log}
            </span>
          </div>
        ))}
        <div className="animate-pulse text-eng-cyan">_ SYSTEM_LISTENING...</div>
      </div>
    </div>
  );
}