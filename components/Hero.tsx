
import React, { useEffect, useRef } from 'react';
import { GlyphOneIcon, GlyphTwoIcon } from './icons';

interface HeroProps {
  onAwakenClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAwakenClick }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const promoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elementsToObserve = [h1Ref.current, promoBoxRef.current].filter(Boolean);

    if (elementsToObserve.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsToObserve.forEach((el) => observer.observe(el));

    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden bg-black/10 py-20">
      <GlyphOneIcon className="glyph w-32 h-32" style={{ top: '15%', left: '10%', animationDuration: '30s' }} />
      <GlyphTwoIcon className="glyph w-24 h-24" style={{ top: '60%', right: '15%', animationDelay: '-10s', animationDuration: '20s' }} />
      <GlyphOneIcon className="glyph w-16 h-16" style={{ bottom: '10%', left: '30%', animationDelay: '-5s' }} />

      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1
          ref={h1Ref}
          className="scroll-animate text-4xl md:text-6xl font-bold mb-12 drop-shadow-lg leading-tight"
          style={{ transitionDelay: '200ms' }}
        >
          Na sua primeira jornada com a<br/>Sankofa Lab...
        </h1>
        
        <div
          ref={promoBoxRef}
          className="scroll-animate bg-black/20 backdrop-blur-md p-8 sm:p-10 rounded-xl border border-white/10 shadow-2xl max-w-lg"
          style={{ transitionDelay: '400ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Receba frete gratuito e uma chave de acesso para sua próxima travessia.
          </h2>
          <p className="text-lg my-6">
            Use o cupom: 
            <span className="font-bold text-[#f5b648] hover-aura cursor-pointer ml-2 p-2 rounded-md">
              DESPERTAR
            </span>
          </p>
          <button
            onClick={onAwakenClick}
            className="cta-glow inline-block bg-[#f5b648]/20 border-2 border-[#f5b648] text-[#f5b648] font-bold py-3 px-10 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:bg-[#f5b648]/30 shadow-lg"
          >
            Despertar Agora
          </button>
          <p className="mt-8 tracking-widest text-sm text-stone-300/60 font-light">
            Sinta. Acesse. Retorne.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;