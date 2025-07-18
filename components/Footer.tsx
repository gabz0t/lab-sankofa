
import React, { useEffect, useRef } from 'react';
import { InstagramIcon, EyeIcon } from './icons';

interface FooterProps {
  onProductsClick?: () => void;
  onUniverseClick?: () => void;
  onAccountClick?: () => void;
  onContactClick?: () => void;
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onProductsClick, onUniverseClick, onAccountClick, onContactClick, onAdminClick }) => {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elementsToObserve = [col1Ref.current, col2Ref.current, col3Ref.current].filter(Boolean);

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

  const handleLinkClick = (e: React.MouseEvent, action?: () => void) => {
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
    <footer className="bg-stone-900 text-stone-300 relative">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div ref={col1Ref} className="flex flex-col items-center md:items-start scroll-animate" style={{ transitionDelay: '0ms' }}>
            <h3 className="logo text-2xl font-bold text-amber-500 mb-4">Sankofa Lab</h3>
            <p className="text-stone-400">Conectando ancestralidade e inovação.</p>
            <div className="mt-6">
              <a href="https://www.instagram.com/sankofalab_/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>
          
          <div ref={col2Ref} className="scroll-animate" style={{ transitionDelay: '150ms' }}>
            <h4 className="font-bold text-lg text-white mb-4 uppercase tracking-wider">Navegação</h4>
            <nav className="flex flex-col space-y-3">
              <a href="#" onClick={(e) => handleLinkClick(e, onProductsClick)} className="hover:text-amber-400 transition-colors">Produtos</a>
              <a href="#" onClick={(e) => handleLinkClick(e, onAccountClick)} className="hover:text-amber-400 transition-colors">Minha conta</a>
              <a href="#" onClick={(e) => handleLinkClick(e, onUniverseClick)} className="hover:text-amber-400 transition-colors">Universo Sankofa</a>
              <a href="#" onClick={(e) => handleLinkClick(e, onContactClick)} className="hover:text-amber-400 transition-colors">Contato</a>
            </nav>
          </div>
          
          <div ref={col3Ref} className="scroll-animate" style={{ transitionDelay: '300ms' }}>
            <h4 className="font-bold text-lg text-white mb-4 uppercase tracking-wider">Fique por dentro</h4>
            <p className="mb-4 text-stone-400">Receba notícias sobre novos produtos e descontos exclusivos.</p>
            <form className="flex shadow-md rounded-md">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full bg-stone-800 border border-transparent text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                aria-label="Email para newsletter"
              />
              <button type="submit" aria-label="Inscrever-se na newsletter" className="bg-amber-800 text-white font-bold px-5 py-2 rounded-r-md hover:bg-amber-700 transition-colors">
                ›
              </button>
            </form>
          </div>

        </div>
        <div className="border-t border-stone-700 mt-16 pt-8 text-center text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sankofa Lab. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
    {onAdminClick && (
        <button id="admin-secret-button" onClick={onAdminClick} aria-label="Acesso do Guardião">
            <EyeIcon className="h-6 w-6" />
            <span className="admin-tooltip">Acesso do Guardião</span>
        </button>
      )}
    </>
  );
};

export default Footer;