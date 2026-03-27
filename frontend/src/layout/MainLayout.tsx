import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SystemLogs from '../components/SystemLogs';
import TelemetryHeader from '../components/TelemetryHeader';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-eng-black text-slate-300 font-sans">
      {/* Sidebar Fixa à Esquerda */}
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,_#1e293b_0%,_transparent_1px)] bg-[size:40px_40px]">
        <TelemetryHeader />
        
        {/* Aqui é onde as páginas (Dashboard, Bio) serão renderizadas */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <Outlet /> 
        </div>

        <SystemLogs />
      </main>
    </div>
  );
}