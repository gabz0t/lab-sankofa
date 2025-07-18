
import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Product } from '../types';
import DigitalProductCard from './DigitalProductCard';

interface DigitalProductsProps {
  onProductClick: (product: Product) => void;
}

const DIGITAL_PRODUCTS_DATA: Product[] = [
  { id: 101, name: 'Verbo Ancestral', description: 'E-book de frases canalizadas e meditações escritas para reconexão interior.', imageUrl: 'https://picsum.photos/seed/verbo/400/400', category: 'Verbo', mediaType: 'E-book', pages: 32, excerpt: 'Nem toda luz brilha. Algumas guiam em silêncio.', content: ['Frases canalizadas para rituais matinais', 'Meditações escritas para conexão com o corpo', 'Textos de invocação e retorno à presença'], ritualSuggestion: { title: 'Sugestão de Ritual de Leitura', steps: ['Acenda uma vela branca', 'Respire profundamente por 3 minutos', 'Leia o conteúdo com as mãos sobre o coração', 'Anote o que emergir como lembrança'] }, subtitle: 'E-book de frases canalizadas e meditações escritas para reconectar com sua voz interior.' },
  { id: 102, name: 'A Voz Antes do Pensamento', description: 'Trilha guiada de intuição e respiração para silenciar a mente e ouvir a alma.', imageUrl: 'https://picsum.photos/seed/voz/400/400', category: 'Intuição', mediaType: 'Áudio Ritual' },
  { id: 103, name: 'O Véu e a Visão', description: 'PDF com rituais práticos para treinar a visão sutil e ver além do visível.', imageUrl: 'https://picsum.photos/seed/veu/400/400', category: 'Véu', mediaType: 'PDF' },
  { id: 104, name: 'Cartografia da Expansão', description: 'E-book com práticas energéticas para ampliação de consciência.', imageUrl: 'https://picsum.photos/seed/expansao/400/400', category: 'Expansão', mediaType: 'E-book' },
  { id: 105, name: 'Presença é Poder', description: 'Manual ritualístico de retorno ao corpo e ao momento presente.', imageUrl: 'https://picsum.photos/seed/presenca/400/400', category: 'Presença', mediaType: 'Ritual Guiado' },
  { id: 106, name: 'Oráculo do Silêncio', description: 'Meditações em áudio para decodificar as mensagens da sua intuição.', imageUrl: 'https://picsum.photos/seed/oraculo2/400/400', category: 'Intuição', mediaType: 'Áudio Ritual' },
];

const DIGITAL_CATEGORIES = ["Todos", "Intuição", "Verbo", "Véu", "Expansão", "Presença"];
const CATEGORY_EMOJIS: { [key: string]: string } = {
    Todos: '✨',
    Intuição: '🔮',
    Verbo: '📖',
    Véu: '🕊️',
    Expansão: '🌌',
    Presença: '👁️',
};

const DigitalProducts: React.FC<DigitalProductsProps> = ({ onProductClick }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => { if(element) observer.unobserve(element) };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Todos') return DIGITAL_PRODUCTS_DATA;
    return DIGITAL_PRODUCTS_DATA.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="digital-products-section" className="digital-products-section relative overflow-hidden scroll-animate">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="digital-products-title text-4xl md:text-5xl font-bold mb-4">
          📖 Chamados do Invisível
        </h2>
        <p className="digital-products-quote text-lg italic mb-6 mx-auto">
          “Toda sabedoria é uma semente. Ao tocar essas palavras, você ativa lembranças ancestrais.”
        </p>
        <p className="digital-products-description text-base md:text-lg mb-12 mx-auto">
            Saberes canalizados em forma de palavra, som e presença.
            <br className="hidden sm:block" />
            Acesse conteúdos digitais que ativam sua intuição e expandem sua consciência.
        </p>

        <div className="ritual-filters digital-filters mb-12">
            {DIGITAL_CATEGORIES.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`flex items-center justify-center ${activeFilter === category ? 'active' : ''}`}
                >
                    <span>{CATEGORY_EMOJIS[category]}</span>
                    <span>{category}</span>
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProducts.map((product, index) => (
                <DigitalProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                    onProductClick={onProductClick} 
                />
            ))}
        </div>
        
        <div className="mt-16">
            <p className="digital-products-final-quote text-base">
                “Nem toda luz brilha. Algumas guiam em silêncio.”
            </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalProducts;