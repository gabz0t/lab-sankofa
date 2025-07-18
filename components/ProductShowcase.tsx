
import React, { useEffect, useRef } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductShowcaseProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onProductClick: (product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, isLoading, error, onProductClick }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const renderSkeleton = () => (
    <div className="bg-white rounded-lg p-4 shadow-md animate-pulse">
        <div className="bg-stone-200 h-56 rounded-t-lg"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-stone-200 rounded w-3/4"></div>
          <div className="h-4 bg-stone-200 rounded"></div>
          <div className="h-4 bg-stone-200 rounded w-5/6"></div>
          <div className="h-10 bg-stone-200 rounded w-1/3 mt-4"></div>
        </div>
    </div>
  )

  return (
    <section className="py-16 sm:py-24 bg-stone-100/50">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-12 scroll-animate">
          <h2 className="text-4xl font-bold text-stone-800">Nossos Tesouros</h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Produtos criados com a sabedoria da terra e a inspiração dos nossos ancestrais.
          </p>
        </div>
        
        {error && <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-8">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {isLoading 
            ? Array.from({ length: 3 }).map((_, index) => <div key={index}>{renderSkeleton()}</div>)
            : products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} onProductClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
