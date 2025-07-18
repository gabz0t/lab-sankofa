
import React, { useRef, useEffect } from 'react';
import type { Product } from '../types';
import { SankofaBirdIcon } from './icons';

interface RitualProductCardProps {
  product: Product;
  index: number;
  onProductClick: (product: Product) => void;
}

const RitualProductCard: React.FC<RitualProductCardProps> = ({ product, index, onProductClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(entry.target);
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
      className="ritual-product-card flex flex-col group scroll-animate"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden image-container">
        <img
          src={product.imageUrl}
          alt={`Imagem do produto ${product.name}`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
        <SankofaBirdIcon className="sankofa-seal" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="ritual-card-title text-2xl font-bold mb-2">{product.name}</h3>
        <p className="text-stone-300 flex-grow mb-4 text-base font-light">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-stone-200">
            {product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : ''}
          </span>
          <button 
            onClick={() => onProductClick(product)}
            className="ritual-card-button font-bold py-2 px-6 rounded-full">
            Iniciar Ritual
          </button>
        </div>
      </div>
    </div>
  );
};

export default RitualProductCard;