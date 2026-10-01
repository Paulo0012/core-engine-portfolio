import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function TypewriterBio() {
  const text1 = "Vindo do interior e de origem humilde, mudei-me para São Luís movido pelo sonho de me tornar engenheiro. Minha jornada na tecnologia começou com o Bacharelado em Ciências e Tecnologia e, hoje, estou no último período de Engenharia da Computação.";
  const text2 = "Mais do que criar infraestruturas escaláveis e escrever bons códigos, meu grande objetivo de vida é usar meu conhecimento para inspirar, incentivar e ensinar jovens da minha cidade natal. Quero provar que, com dedicação, é possível transformar a própria realidade e criar oportunidades mesmo onde as chances parecem escassas.";

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
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
    const speed = 15; // Velocidade de digitação rápida
    
    let interval2: NodeJS.Timeout | undefined;
    
    const interval1 = setInterval(() => {
      i++;
      setIndex1(i);
      if (i >= text1.length) {
        clearInterval(interval1);
        setIsTyping1(false);
        setIsTyping2(true);
        
        let j = 0;
        interval2 = setInterval(() => {
          j++;
          setIndex2(j);
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
      if (interval2) clearInterval(interval2);
    };
  }, [isInView, text1.length, text2.length]);

  const Cursor = ({ visible }: { visible: boolean }) => {
    if (!visible) return null;
    return (
      <span className="relative">
        <span className="absolute animate-pulse inline-block w-2 h-5 bg-gn-highlight ml-1 align-middle translate-y-[-2px]"></span>
      </span>
    );
  };

  return (
    <div ref={ref} className="text-lg text-gn-text font-light leading-relaxed">
      <p>
        <span>{text1.substring(0, index1)}</span>
        <Cursor visible={isTyping1} />
        <span className="opacity-0 select-none">{text1.substring(index1)}</span>
      </p>
      <p className="mt-6">
        <span>{text2.substring(0, index2)}</span>
        <Cursor visible={isTyping2 || finished} />
        <span className="opacity-0 select-none">{text2.substring(index2)}</span>
      </p>
    </div>
  );
}
