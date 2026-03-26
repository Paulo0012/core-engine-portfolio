import { Terminal, Cpu, Database, LayoutDashboard, Settings, User } from 'lucide-react';
import TelemetryHeader from './components/TelemetryHeader';

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-eng-black select-none">
      {/* SIDEBAR INDUSTRIAL */}
      <aside className="w-64 border-r border-eng-border bg-slate-900/20 flex flex-col">
        <div className="p-6 border-b border-eng-border">
          <h1 className="font-mono font-bold text-eng-cyan tracking-tighter flex items-center gap-2">
            <Terminal size={20} /> SOARES-GOMES_OS
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">System Architect v1.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
          <NavItem icon={<Cpu size={18}/>} label="Hardware Cases" />
          <NavItem icon={<Database size={18}/>} label="SaaS & Backend" />
          <NavItem icon={<User size={18}/>} label="Profile_Bio" />
        </nav>

        <div className="p-4 border-t border-eng-border bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-eng-green animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-mono text-slate-400">ENCRYPTION_ACTIVE</span>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col">
        <TelemetryHeader />
        
        <div className="flex-1 p-8 overflow-y-auto">
          <header className="mb-12">
            <h2 className="text-4xl font-bold text-white tracking-tight">System_Overview</h2>
            <div className="h-1 w-24 bg-eng-cyan mt-2" />
          </header>

          {/* GRID DE CASES (Placeholder por enquanto) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-eng-border p-6 bg-slate-900/30 rounded-sm hover:border-eng-cyan transition-all group">
              <span className="text-xs text-eng-cyan font-mono uppercase tracking-widest">Project_01</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-eng-cyan transition-colors">AutoFlow SaaS</h3>
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                Sistema de automação multi-unidade para autoescolas integrando Django e React.
              </p>
            </div>
            {/* Adicionaremos a integração com a API aqui em breve */}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-xs uppercase tracking-wider
      ${active ? 'bg-eng-cyan/10 text-eng-cyan border-l-2 border-eng-cyan' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
      {icon}
      {label}
    </button>
  );
}

export default App;