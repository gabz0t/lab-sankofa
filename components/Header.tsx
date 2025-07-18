import React, { useState, useEffect } from 'react';
import { CartIcon, MenuIcon, XIcon, UserIcon, SankofaBirdIcon } from './icons';
import type { Guardian } from '../types';

interface HeaderProps {
  guardian: Guardian | null;
  onLogoClick?: () => void;
  onProductsClick?: () => void;
  onUniverseClick?: () => void;
  onInvisibleCallsClick?: () => void;
  onAccountClick?: () => void;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ guardian, onLogoClick, onProductsClick, onUniverseClick, onInvisibleCallsClick, onAccountClick, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: '☥ Produtos', href: '#', id: 'products' },
    { name: '✦ Chamados do Invisível', href: '#', id: 'invisible' },
    { name: '✦ Universo Sankofa', href: '#', id: 'universe' },
  ];
  
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${isScrolled 
      ? 'bg-[rgba(10,8,20,0.8)] shadow-md backdrop-blur-lg border-b border-amber-500/20' 
      : 'bg-transparent'}
  `;
  
  const linkClasses = `
    relative font-['Spectral'] font-semibold uppercase tracking-[0.05em] text-[1.05rem] transition-all duration-300
    ${isScrolled ? 'text-stone-200 hover:text-white' : 'text-white drop-shadow-sm hover:text-stone-100'}
    hover:text-shadow-[0_0_8px_rgba(255,222,139,0.7)]
    [text-shadow:0_0_6px_rgba(255,255,255,0.1)]
  `;
  
  const iconColorClass = isScrolled ? 'text-stone-200' : 'text-white drop-shadow-sm';

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogoClick?.();
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCartClick?.();
  };

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onAccountClick?.();
  };

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    if (link.id === 'products' && onProductsClick) {
      onProductsClick();
    } else if (link.id === 'universe' && onUniverseClick) {
      onUniverseClick();
    } else if (link.id === 'invisible' && onInvisibleCallsClick) {
      onInvisibleCallsClick();
    }
  };

  return (
    <>
      <header className={headerClasses}>
        <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          <div className="flex items-center justify-between">
            <a href="/" onClick={handleLogoClick} className={`logo text-2xl font-bold transition-colors duration-300 flex items-center gap-2 ${isScrolled ? 'text-amber-400' : 'text-white drop-shadow-md'}`}>
              <SankofaBirdIcon className="h-7 w-7" />
              <span>Sankofa Lab</span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link)}
                  className={linkClasses}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-6">
              <a href="#" onClick={handleAccountClick} className={`hidden md:flex items-center gap-2 ${linkClasses}`} aria-label="Minha Conta">
                <UserIcon className="h-5 w-5" />
                <span>{guardian ? 'Minha Jornada' : 'Login'}</span>
              </a>
              <a href="#" onClick={handleCartClick} className={`hidden md:flex items-center ${linkClasses}`} aria-label="Carrinho">
                <CartIcon className="h-6 w-6" />
              </a>
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`md:hidden transition-colors duration-300 ${iconColorClass} hover:text-amber-400 focus:outline-none`}
                aria-label="Abrir menu"
                aria-expanded={isMenuOpen}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-stone-50 z-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-stone-200">
           <h2 id="mobile-menu-title" className="logo text-xl font-bold text-amber-900 flex items-center gap-2">
            <SankofaBirdIcon className="h-6 w-6" />
            <span>Sankofa Lab</span>
          </h2>
          <button onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-amber-800" aria-label="Fechar menu">
            <XIcon />
          </button>
        </div>
        <nav className="flex flex-col space-y-1 p-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => {
                handleLinkClick(e, link);
                setIsMenuOpen(false); // Close menu on click
              }}
              className="text-stone-700 font-medium text-lg hover:text-amber-800 transition-colors duration-300 p-4"
            >
              {link.name}
            </a>
          ))}
          <div className='pt-5 mt-4 border-t border-stone-200'>
            <a href="#" onClick={(e) => { handleAccountClick(e); setIsMenuOpen(false); }} className="flex items-center text-stone-700 font-medium text-lg hover:text-amber-800 transition-colors duration-300 p-4">
              <UserIcon />
              <span className="ml-3">{guardian ? 'Minha Jornada' : 'Login / Cadastro'}</span>
            </a>
            <a href="#" onClick={(e) => { handleCartClick(e); setIsMenuOpen(false); }} className="flex items-center text-stone-700 font-medium text-lg hover:text-amber-800 transition-colors duration-300 p-4">
              <CartIcon />
              <span className="ml-3">Carrinho</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;