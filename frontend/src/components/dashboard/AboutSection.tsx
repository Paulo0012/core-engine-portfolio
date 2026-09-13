import { BookOpen, Dumbbell, Guitar, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre-detalhe" className="scroll-mt-32 pt-16 border-t border-gn-surface">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-medium text-gn-highlight tracking-tight">
          02 — SOBRE MIM
        </h2>
        <div className="flex-1 h-px bg-gn-surface/50"></div>
      </div>

      <h3 className="text-4xl lg:text-5xl font-black text-gn-highlight tracking-tighter mb-12 max-w-2xl leading-tight">
        Código, resiliência e <br className="hidden md:block" />
        atenção aos detalhes.
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Texto sobre a trajetória */}
        <div className="lg:col-span-2 space-y-6 text-gn-text text-base leading-relaxed font-light">
          <p>
            Vindo do interior e de origem humilde, mudei-me para São Luís movido pelo sonho de me tornar engenheiro. Minha jornada na tecnologia começou com o Bacharelado em Ciências e Tecnologia e, hoje, estou no último período de Engenharia da Computação.
          </p>
          <p>
            Mais do que criar infraestruturas escaláveis e escrever bons códigos, meu grande objetivo de vida é usar meu conhecimento para inspirar, incentivar e ensinar jovens da minha cidade natal. Quero provar que, com dedicação, é possível transformar a própria realidade e criar oportunidades mesmo onde as chances parecem escassas.
          </p>
        </div>

        {/* Informações rápidas */}
        <div className="bg-gn-bg border border-gn-surface rounded-2xl p-6 divide-y divide-gn-surface/50">
          <div className="pb-4">
            <span className="text-[10px] font-black uppercase text-gn-surface tracking-widest block mb-1">Trajetória</span>
            <span className="text-gn-highlight font-medium text-sm">Graduando em Engenharia da Computação</span>
          </div>
          <div className="py-4">
            <span className="text-[10px] font-black uppercase text-gn-surface tracking-widest block mb-1">Especialidade</span>
            <span className="text-gn-highlight font-medium text-sm">Fullstack & IoT</span>
          </div>
          <div className="pt-4">
            <span className="text-[10px] font-black uppercase text-gn-surface tracking-widest block mb-1">Localização</span>
            <span className="text-gn-highlight font-medium text-sm">São Luís, MA</span>
          </div>
        </div>
      </div>

      {/* Seção de hobbies / Quando não estou programando */}
      <div className="mt-16">
        <h4 className="text-[10px] font-black uppercase text-gn-surface tracking-widest mb-6">Quando não estou programando</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gn-bg border border-gn-surface/50 rounded-2xl p-5 hover:bg-gn-surface/10 transition-colors">
            <Guitar size={24} className="text-gn-highlight mb-3" />
            <h5 className="text-gn-highlight font-bold text-sm mb-1">Música</h5>
            <p className="text-gn-text text-xs font-light">Tocar contrabaixo e violão é meu jeito favorito de desacelerar e criar.</p>
          </div>
          
          <div className="bg-gn-bg border border-gn-surface/50 rounded-2xl p-5 hover:bg-gn-surface/10 transition-colors">
            <Dumbbell size={24} className="text-gn-highlight mb-3" />
            <h5 className="text-gn-highlight font-bold text-sm mb-1">Musculação</h5>
            <p className="text-gn-text text-xs font-light">Treino diário para manter o corpo ativo e a mente focada.</p>
          </div>
          
          <div className="bg-gn-bg border border-gn-surface/50 rounded-2xl p-5 hover:bg-gn-surface/10 transition-colors">
            <Heart size={24} className="text-gn-highlight mb-3" />
            <h5 className="text-gn-highlight font-bold text-sm mb-1">Fé Cristã</h5>
            <p className="text-gn-text text-xs font-light">Base dos meus valores, propósitos e da forma como busco ajudar o próximo.</p>
          </div>
          
          <div className="bg-gn-bg border border-gn-surface/50 rounded-2xl p-5 hover:bg-gn-surface/10 transition-colors">
            <BookOpen size={24} className="text-gn-highlight mb-3" />
            <h5 className="text-gn-highlight font-bold text-sm mb-1">Ensinar</h5>
            <p className="text-gn-text text-xs font-light">Incentivar e compartilhar conhecimento com jovens da minha comunidade.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
