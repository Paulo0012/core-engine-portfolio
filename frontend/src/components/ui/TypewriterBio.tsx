import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function TypewriterBio() {
  const text1 = "Vindo do interior e de origem humilde, mudei-me para São Luís movido pelo sonho de me tornar engenheiro. Minha jornada na tecnologia começou com o Bacharelado em Ciências e Tecnologia e, hoje, estou no último período de Engenharia da Computação.";
  const text2 = "Mais do que criar infraestruturas escaláveis e escrever bons códigos, meu grande objetivo de vida é usar meu conhecimento para inspirar, incentivar e ensinar jovens da minha cidade natal. Quero provar que, com dedicação, é possível transformar a própria realidade e criar oportunidades mesmo onde as chances parecem escassas.";

  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);
  const [finished, setFinished] = useState(false);
  const hasStarted = useRef(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    
    hasStarted.current = true;
    setIsTyping1(true);
    let i = 0;
    const speed = 15; // Velocidade de digitação (rápida)
    
    const interval1 = setInterval(() => {
      setDisplayed1(text1.substring(0, i + 1));
      i++;
      if (i >= text1.length) {
        clearInterval(interval1);
        setIsTyping1(false);
        setIsTyping2(true);
        
        let j = 0;
        const interval2 = setInterval(() => {
          setDisplayed2(text2.substring(0, j + 1));
          j++;
          if (j >= text2.length) {
            clearInterval(interval2);
            setIsTyping2(false);
            setFinished(true);
          }
        }, speed);
      }
    }, speed);
    
    return () => {
      clearInterval(interval1);
    };
  }, [isInView]);

  return (
    <div ref={ref} className="text-lg text-gn-text font-light leading-relaxed relative">
       {/* Texto invisível para manter a altura do layout e evitar pulos na tela */}
       <div className="opacity-0 pointer-events-none select-none" aria-hidden="true">
         <p>{text1}</p>
         <p className="mt-6">{text2}</p>
       </div>
       
       {/* Texto sendo digitado */}
       <div className="absolute top-0 left-0 w-full h-full">
         <p>
           {displayed1}
           {isTyping1 && <span className="animate-pulse inline-block w-2 h-5 bg-gn-highlight ml-1 align-middle translate-y-[-2px]"></span>}
         </p>
         <p className="mt-6">
           {displayed2}
           {(isTyping2 || finished) && <span className="animate-pulse inline-block w-2 h-5 bg-gn-highlight ml-1 align-middle translate-y-[-2px]"></span>}
         </p>
       </div>
    </div>
  );
}
