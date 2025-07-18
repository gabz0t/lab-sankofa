
import React, { useEffect, useRef } from 'react';
import { SankofaBirdIcon, RootIcon, AlchemyIcon, PathIcon } from './icons';

interface SankofaUniverseProps {
  onExploreClick: () => void;
}

const Pillar = ({ icon, title, children, delay }: { icon: React.ReactNode, title: string, children: React.ReactNode, delay: string }) => (
  <div className="pillar-card rounded-lg p-6 flex flex-col items-center text-center scroll-animate" style={{ transitionDelay: delay }}>
    <div className="pillar-icon mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2 font-['Cormorant_Garamond']">{title}</h3>
    <p className="text-stone-300 font-light text-base leading-relaxed">{children}</p>
  </div>
);


const SankofaUniverse: React.FC<SankofaUniverseProps> = ({ onExploreClick }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const elementsToObserve = Array.from(sectionRef.current?.querySelectorAll('.scroll-animate') || []);
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
        <div ref={sectionRef} className="sankofa-universe-page min-h-screen animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <header className="text-center mb-16 md:mb-24 scroll-animate" style={{ transitionDelay: '100ms' }}>
                    <h1 className="universe-title text-4xl md:text-6xl font-bold mb-4">Universo Sankofa</h1>
                    <p className="universe-subtitle text-lg md:text-xl max-w-3xl mx-auto">
                       A alma do nosso laboratório. Aqui, honramos o passado para criar o futuro.
                    </p>
                </header>

                <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="text-center md:text-left scroll-animate" style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Cormorant_Garamond'] mb-4">O que é Sankofa?</h2>
                        <p className="text-stone-300 text-lg leading-relaxed mb-4">
                           Sankofa é um ideograma Adinkra dos povos Akan de Gana. Traduz-se como <strong className="text-amber-300 font-semibold">"retornar e buscar"</strong> e é simbolizado por um pássaro que voa para frente enquanto olha para trás, carregando em seu bico um ovo precioso — a semente do futuro.
                        </p>
                        <p className="text-stone-300 text-lg leading-relaxed">
                            Para nós, é o princípio de que o passado não é um lugar para se viver, mas uma fonte de sabedoria para construir um presente e um futuro mais conscientes e integrados.
                        </p>
                    </div>
                    <div className="flex justify-center scroll-animate" style={{ transitionDelay: '300ms' }}>
                        <SankofaBirdIcon className="w-48 h-48 text-amber-500/30" />
                    </div>
                </section>

                <section className="text-center mb-24">
                     <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Cormorant_Garamond'] mb-4 scroll-animate" style={{ transitionDelay: '100ms' }}>Nossa Missão: A Alquimia</h2>
                        <p className="text-stone-300 text-lg leading-relaxed scroll-animate" style={{ transitionDelay: '200ms' }}>
                            Nossa missão é ser uma ponte. Uma ponte entre a sabedoria contida nas raízes, ervas e rituais de nossos ancestrais, e as ferramentas de consciência do presente. Não se trata de recriar o passado, mas de reintegrá-lo, permitindo que sua força nutra nosso florescer agora.
                        </p>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-['Cormorant_Garamond'] mb-12 text-center scroll-animate" style={{ transitionDelay: '100ms' }}>Nossos Pilares</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Pillar icon={<RootIcon />} title="Raiz Ancestral" delay="200ms">
                            Pesquisamos e honramos práticas de cura e sabedoria de diversas tradições. Cada produto é um elo com esse conhecimento profundo, um convite para lembrar o que a alma já sabe.
                        </Pillar>
                        <Pillar icon={<AlchemyIcon />} title="Alquimia Presente" delay="300ms">
                            Unimos o saber tradicional a uma abordagem moderna e intuitiva, criando fórmulas e rituais que ressoam com os desafios e as necessidades do mundo contemporâneo.
                        </Pillar>
                        <Pillar icon={<PathIcon />} title="Jornada Pessoal" delay="400ms">
                            Acreditamos que cada pessoa é um universo. Nossas criações não são receitas prontas, mas catalisadores para que você descubra sua própria magia e seu caminho de retorno a si.
                        </Pillar>
                    </div>
                </section>
                
                <section className="text-center mt-16 pt-12 border-t border-white/10 scroll-animate" style={{ transitionDelay: '200ms' }}>
                    <h2 className="text-3xl font-bold font-['Cormorant_Garamond'] text-white mb-4">Sua Jornada de Retorno Começa.</h2>
                    <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                        Agora que você conhece nossa essência, sinta o chamado. Explore os rituais que criamos para acompanhar você em seu caminho.
                    </p>
                    <button onClick={onExploreClick} className="universe-cta-button font-bold text-lg uppercase tracking-wider py-3 px-10 rounded-full">
                        Explorar Rituais Vivos
                    </button>
                </section>

            </div>
        </div>
    );
};

export default SankofaUniverse;