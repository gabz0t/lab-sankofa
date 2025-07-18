
import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import RitualProductCard from './RitualProductCard';

interface RitualCatalogPageProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onProductClick: (product: Product) => void;
}

const RITUAL_CATEGORIES = ["Todos", "Limpeza", "Ativação", "Cura", "Proteção", "Expansão"];

const RitualCatalogPage: React.FC<RitualCatalogPageProps> = ({ products, isLoading, error, onProductClick }) => {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Todos') {
      return products;
    }
    return products.filter(p => p.category === activeFilter);
  }, [products, activeFilter]);

  const renderSkeleton = () => (
    <div className="ritual-product-card p-4 animate-pulse">
        <div className="bg-stone-800/50 h-56 rounded-t-lg"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-stone-800/50 rounded w-3/4"></div>
          <div className="h-4 bg-stone-800/50 rounded"></div>
          <div className="h-4 bg-stone-800/50 rounded w-5/6"></div>
          <div className="h-10 bg-stone-800/50 rounded-full w-1/2 mt-4"></div>
        </div>
    </div>
  )

  return (
    <div className="ritual-catalog-page min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-animate is-visible">
          <h1 className="ritual-catalog-title mb-4">🌌 Sua Travessia Começa Aqui</h1>
          <p className="ritual-catalog-subtitle text-lg text-stone-300 mx-auto">
            Explore os rituais vivos da Sankofa Lab.
            <br />
            Cada produto carrega a força de uma memória. Cada escolha é um passo no seu retorno.
          </p>
        </div>

        <div className="ritual-filters scroll-animate is-visible" style={{ transitionDelay: '200ms' }}>
          {RITUAL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={activeFilter === category ? 'active' : ''}
            >
              {category}
            </button>
          ))}
        </div>

        {error && <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg my-8">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 py-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => <div key={index}>{renderSkeleton()}</div>)
            : filteredProducts.map((product, index) => (
                <RitualProductCard key={product.id} product={product} index={index} onProductClick={onProductClick} />
              ))}
        </div>
        
        <div className="text-center mt-16 scroll-animate is-visible" style={{ transitionDelay: '400ms' }}>
            <p className="ritual-final-phrase text-lg">
                “Cada escolha é uma lembrança viva da tua essência.”
            </p>
        </div>

      </div>
    </div>
  );
};

export default RitualCatalogPage;
