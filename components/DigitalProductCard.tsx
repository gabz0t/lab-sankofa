
import React from 'react';
import type { Product } from '../types';
import { SankofaBirdIcon } from './icons';

interface DigitalProductCardProps {
  product: Product;
  index: number;
  onProductClick: (product: Product) => void;
}

const DigitalProductCard: React.FC<DigitalProductCardProps> = ({ product, index, onProductClick }) => {
  return (
    <div 
        className="digital-product-card flex flex-col group text-left"
        style={{ animation: `fadeIn 0.5s ease-out ${index * 100}ms forwards`, opacity: 0 }}
    >
        <div className="relative overflow-hidden image-container">
            <img
                src={product.imageUrl}
                alt={`Capa de ${product.name}`}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
            <SankofaBirdIcon className="sankofa-seal absolute top-1/2 left-1/2 w-1/2 h-auto -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            {product.mediaType && (
                 <span className="digital-card-media-type absolute top-3 right-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {product.mediaType}
                </span>
            )}
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="digital-card-title text-2xl font-bold mb-2">{product.name}</h3>
            <p className="digital-card-description flex-grow mb-6 text-sm font-light">{product.description}</p>
            <button 
                onClick={() => onProductClick(product)}
                className="digital-card-button mt-auto self-start font-bold py-2 px-6 rounded-full"
            >
                Desbloquear Sabedoria
            </button>
        </div>
    </div>
  );
};

export default DigitalProductCard;