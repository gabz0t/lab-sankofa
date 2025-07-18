
import React, { useRef, useEffect } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onProductClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
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


  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 scroll-animate"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={`Imagem do produto ${product.name}`}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h3>
        <p className="text-stone-600 flex-grow mb-4">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-stone-800">
            {product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : ''}
          </span>
          <button 
            onClick={() => onProductClick(product)}
            className="bg-amber-800 text-white font-bold py-2 px-6 rounded-md hover:bg-amber-700 transition-colors duration-300 transform hover:scale-105">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;