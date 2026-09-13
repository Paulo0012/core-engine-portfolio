import { Terminal } from 'lucide-react';
import HeroMedia from './HeroMedia';

export default function HeroSection() {
  return (
    <section id="sobre" className="min-h-[90vh] flex items-center pt-20 border-b border-gn-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* TEXT CONTENT - Text Ticker */}
        <div className="w-full flex flex-col gap-4 py-4 z-10">

          {/* Linha 1 Estática */}
          <h1 className="text-4xl lg:text-6xl font-black text-gn-highlight tracking-tighter">
            Olá, Meu nome é Paulo Gabriel.
          </h1>

          <div className="relative overflow-hidden w-[100vw] -ml-6 lg:ml-0 px-6 lg:px-0 lg:w-[140%] max-w-none [mask-image:linear-gradient(to_right,transparent,black_5%,black_100%)] mt-2">


            {/* Linha 2 - Reverse */}
            <div className="ticker-track flex w-max gap-8 group hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <h2 key={`l2-${i}`} className="text-4xl lg:text-6xl font-black text-gn-surface whitespace-nowrap tracking-tighter">
                  Sou engenheiro da computação <span className="text-gn-accent/50 mx-4">•</span>
                </h2>
              ))}
            </div>

            {/* Linha 3 */}
            <div className="ticker-track flex w-max gap-8 group hover:[animation-play-state:paused] mt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <h2 key={`l3-${i}`} className="text-4xl lg:text-6xl font-black text-gn-accent whitespace-nowrap tracking-tighter">
                  Te ajudo a criar e automatizar sistemas. <span className="text-gn-surface/50 mx-4">•</span>
                </h2>
              ))}
            </div>

          </div> {/* FIM DO WRAPPER DO CARROSSEL */}

          {/* Info Cards Extras */}
          <div className="flex gap-4 mt-8 px-4">
            <div className="flex flex-col p-5 bg-gn-surface/10 rounded-xl border border-gn-surface w-32 hover:bg-gn-surface/20 transition-colors">
              <span className="text-3xl font-light text-gn-highlight tracking-tighter">2+</span>
              <span className="text-[10px] text-gn-accent uppercase tracking-widest mt-1">Anos Exp.</span>
            </div>
            <div className="flex flex-col p-5 bg-gn-surface/10 rounded-xl border border-gn-surface w-32 hover:bg-gn-surface/20 transition-colors">
              <span className="text-3xl font-light text-gn-highlight tracking-tighter">10+</span>
              <span className="text-[10px] text-gn-accent uppercase tracking-widest mt-1">Projetos</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HERO MEDIA */}
        <div className="flex justify-center lg:justify-end z-10">
          <HeroMedia />
        </div>

      </div>
    </section>
  );
}
