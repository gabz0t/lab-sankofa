import React, { useState, useMemo, useEffect } from 'react';
import type { Product } from '../types';
import { VisionIcon, CandleIcon, StarIcon, EyeIcon, SankofaBirdIcon, ChatIcon } from './icons';

// Re-using data from the old component for the prototype
const DIGITAL_PRODUCTS_DATA: Product[] = [
  { id: 101, name: 'Verbo Ancestral', description: 'E-book de frases canalizadas e meditações escritas para reconexão interior.', imageUrl: 'https://picsum.photos/seed/verbo/400/500', category: 'Verbo', mediaType: 'E-book', pages: 32, excerpt: 'Nem toda luz brilha. Algumas guiam em silêncio.', content: ['Frases canalizadas para rituais matinais', 'Meditações escritas para conexão com o corpo', 'Textos de invocação e retorno à presença'], ritualSuggestion: { title: 'Sugestão de Ritual de Leitura', steps: ['Acenda uma vela branca', 'Respire profundamente por 3 minutos', 'Leia o conteúdo com as mãos sobre o coração', 'Anote o que emergir como lembrança'] }, subtitle: 'E-book de frases canalizadas e meditações escritas para reconectar com sua voz interior.' },
  { id: 102, name: 'A Voz Antes do Pensamento', description: 'Trilha guiada de intuição e respiração para silenciar a mente e ouvir a alma.', imageUrl: 'https://picsum.photos/seed/voz/400/500', category: 'Intuição', mediaType: 'Áudio Ritual' },
  { id: 103, name: 'O Véu e a Visão', description: 'PDF com rituais práticos para treinar a visão sutil e ver além do visível.', imageUrl: 'https://picsum.photos/seed/veu/400/500', category: 'Véu', mediaType: 'PDF' },
  { id: 104, name: 'Cartografia da Expansão', description: 'E-book com práticas energéticas para ampliação de consciência.', imageUrl: 'https://picsum.photos/seed/expansao/400/500', category: 'Expansão', mediaType: 'E-book' },
  { id: 105, name: 'Presença é Poder', description: 'Manual ritualístico de retorno ao corpo e ao momento presente.', imageUrl: 'https://picsum.photos/seed/presenca/400/500', category: 'Presença', mediaType: 'Ritual Guiado' },
  { id: 106, name: 'Oráculo do Silêncio', description: 'Meditações em áudio para decodificar as mensagens da sua intuição.', imageUrl: 'https://picsum.photos/seed/oraculo2/400/500', category: 'Intuição', mediaType: 'Áudio Ritual' },
];

const FILTERS = [
    { id: 'Todos', name: 'Todos', icon: <SankofaBirdIcon className="h-5 w-5" /> },
    { id: 'Intuição', name: 'Intuição', icon: <VisionIcon className="h-5 w-5" /> },
    { id: 'Verbo', name: 'Verbo', icon: <ChatIcon className="h-5 w-5" /> },
    { id: 'Véu', name: 'Véu', icon: <CandleIcon className="h-5 w-5" /> },
    { id: 'Expansão', name: 'Expansão', icon: <StarIcon className="h-5 w-5" /> },
    { id: 'Presença', name: 'Presença', icon: <EyeIcon className="h-5 w-5" /> },
];

interface InvisibleCallsPageProps {
  onProductClick: (product: Product) => void;
}

const WisdomCard: React.FC<{ product: Product; onProductClick: (p: Product) => void; delay: number }> = ({ product, onProductClick, delay }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                element.classList.add('is-visible');
                observer.unobserve(element);
            }
        }, { threshold: 0.1 });

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return (
        <div ref={cardRef} className="wisdom-card-container scroll-animate" style={{ transitionDelay: `${delay}ms`}}>
            <div className="wisdom-card">
                <div className="wisdom-card-image-wrapper">
                    <img src={product.imageUrl} alt={`Capa de ${product.name}`} className="wisdom-card-image" />
                    <div className="wisdom-card-image-overlay"></div>
                </div>
                <div className="wisdom-card-content">
                    <span className="wisdom-card-seal">{product.mediaType}</span>
                    <h3 className="wisdom-card-title">{product.name}</h3>
                    <p className="wisdom-card-description">{product.description}</p>
                    <button onClick={() => onProductClick(product)} className="wisdom-card-button group">
                        🔓 Desbloquear Sabedoria
                        <span className="wisdom-tooltip">Este saber pulsa no invisível. Toque para sentir.</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const InvisibleCallsPage: React.FC<InvisibleCallsPageProps> = ({ onProductClick }) => {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filteredProducts = useMemo(() => {
        if (activeFilter === 'Todos') return DIGITAL_PRODUCTS_DATA;
        return DIGITAL_PRODUCTS_DATA.filter(p => p.category === activeFilter);
    }, [activeFilter]);
    
    return (
        <div className="invisible-calls-page min-h-screen">
            <div className="portal-opening text-center">
                <h1 className="portal-title">📖 Chamados do Invisível</h1>
                <p className="portal-subtitle">Palavras sagradas que atravessam o véu para te alcançar.</p>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rune-filters">
                    {FILTERS.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`rune-filter ${activeFilter === filter.id ? 'active' : ''}`}
                            title={filter.name}
                        >
                            {filter.icon}
                            <span className="sr-only">{filter.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 py-8">
                     {filteredProducts.map((product, index) => (
                        <WisdomCard 
                            key={product.id} 
                            product={product} 
                            onProductClick={onProductClick} 
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InvisibleCallsPage;