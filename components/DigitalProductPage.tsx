
import React from 'react';
import type { Product } from '../types';
import { ArrowLeftIcon, BookOpenIcon, CandleIcon, CheckmarkIcon, SankofaBirdIcon } from './icons';

interface DigitalProductPageProps {
  product: Product;
  onBackClick: () => void;
}

const DigitalProductPage: React.FC<DigitalProductPageProps> = ({ product, onBackClick }) => {
  // Mock related products for demonstration
  const relatedProducts: Product[] = [
      { id: 201, name: 'Sal das Águas Curativas', description: 'Sais de banho com lavanda e camomila para purificar o corpo e a alma.', imageUrl: 'https://picsum.photos/seed/aguas/400/400', category: 'Cura', price: 49.90 },
      { id: 202, name: 'Essência do Vento Guardião', description: 'Bruma protetora com sálvia e cedro para limpar o campo energético.', imageUrl: 'https://picsum.photos/seed/vento/400/400', category: 'Proteção', price: 79.90 },
  ];

  return (
    <div className="digital-product-page min-h-screen animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <button onClick={onBackClick} className="back-button inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold">
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar aos Rituais
          </button>
        </div>

        <header className="text-center mb-12 md:mb-16">
          <h1 className="product-page-title text-4xl md:text-6xl font-bold mb-4">
            {product.mediaType && <span className='mr-4'>{product.mediaType === 'E-book' ? '📘' : '🎧'}</span>}
            {product.name}
          </h1>
          {product.subtitle && <p className="product-page-subtitle text-lg md:text-xl max-w-3xl mx-auto">{product.subtitle}</p>}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column: Cover & Main Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <img 
                src={product.imageUrl} 
                alt={`Capa de ${product.name}`} 
                className="product-page-cover w-full rounded-lg shadow-2xl mb-8"
              />
              <div className="flex flex-wrap gap-2">
                {product.mediaType && <span className="info-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"><BookOpenIcon /> {product.mediaType}</span>}
                {product.pages && <span className="info-badge inline-flex items-center px-3 py-1 rounded-full text-sm">{product.pages} páginas</span>}
                <span className="info-badge inline-flex items-center px-3 py-1 rounded-full text-sm">Intenção: {product.category}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-3">
            {product.content && (
              <div className="access-box p-6 sm:p-8 rounded-lg mb-8">
                <h2 className="text-2xl font-bold font-['Cormorant_Garamond'] text-white mb-4">O que você vai acessar?</h2>
                <ul className="space-y-3">
                  {product.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckmarkIcon className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.excerpt && (
                <div className="excerpt-box relative p-8 rounded-lg my-12">
                     <SankofaBirdIcon className="sankofa-seal absolute top-4 right-4 w-16 h-16 pointer-events-none" />
                    <p className="text-2xl md:text-3xl italic leading-relaxed text-stone-200">
                        "{product.excerpt}"
                    </p>
                </div>
            )}
            
            <div className="text-center my-12">
              <button className="cta-button font-bold text-lg uppercase tracking-wider py-4 px-12 rounded-full">
                {product.price ? `Adicionar ao Rito (R$${product.price.toFixed(2).replace('.',',')})` : '🧿 Desbloquear Sabedoria'}
              </button>
            </div>
            
            {product.ritualSuggestion && (
              <div className="ritual-suggestion-box p-6 sm:p-8 rounded-lg mt-8 text-center">
                <h3 className="text-xl font-bold font-['Cormorant_Garamond'] text-white mb-4 inline-flex items-center gap-3"><CandleIcon /> {product.ritualSuggestion.title}</h3>
                <ul className="space-y-2 text-stone-300">
                  {product.ritualSuggestion.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-white/10 mt-24 pt-16">
            <h2 className="related-products-title text-3xl font-bold text-center mb-12">Outros Saberes Chamados por Você</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {relatedProducts.map((related, index) => (
                    <div key={related.id} className="ritual-product-card flex flex-col group scroll-animate is-visible" style={{transitionDelay: `${index * 100}ms`}}>
                         <div className="relative overflow-hidden image-container">
                            <img src={related.imageUrl} alt={related.name} className="w-full h-56 object-cover"/>
                         </div>
                         <div className='p-4'>
                             <h3 className="ritual-card-title text-xl font-bold mb-1">{related.name}</h3>
                             <button className="ritual-card-button text-sm font-bold py-1 px-4 rounded-full mt-2">
                                Iniciar Ritual
                            </button>
                         </div>
                    </div>
                ))}
            </div>
        </div>


        <footer className="page-footer text-center mt-24 pt-8 border-t border-white/10">
            <p className="text-lg uppercase tracking-widest inline-flex items-center gap-4">
                Sinta <SankofaBirdIcon className="sankofa-seal h-5 w-5 inline-block"/> Acesse <SankofaBirdIcon className="sankofa-seal h-5 w-5 inline-block"/> Retorne
            </p>
        </footer>

      </div>
    </div>
  );
};

export default DigitalProductPage;