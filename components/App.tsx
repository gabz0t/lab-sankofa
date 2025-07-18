import React, { useState, useEffect, useRef } from 'react';
import Header from './components/header.tsx';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Footer from './components/Footer';
import EnergyField from './components/EnergyField';
import RitualCatalogPage from './components/RitualCatalogPage';
import DigitalProductPage from './components/DigitalProductPage';
import SankofaUniverse from './components/SankofaUniverse';
import AccountPage from './components/AccountPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import AdminRitualPage from './components/AdminRitualPage';
import PhysicalProductEditor from './components/PhysicalProductEditor';
import DigitalProductEditor from './components/DigitalProductEditor';
import InvisibleCallsPage from './components/InvisibleCallsPage';
import { generateProductDescriptions } from './services/geminiService';
import type { Product, Guardian } from './types';

type Page = 'home' | 'catalog' | 'product' | 'universe' | 'account' | 'contact' | 'cart' | 'admin-ritual' | 'editor-fisicos' | 'editor-digitais' | 'invisible-calls';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pageHistory, setPageHistory] = useState<Page[]>(['home']);
  const [guardian, setGuardian] = useState<Guardian | null>(null);

  // Centralized state for products fetched from API
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const fetchInitiated = useRef(false);


  useEffect(() => {
    try {
      const storedGuardian = localStorage.getItem('guardiao_ativo');
      if (storedGuardian) {
        setGuardian(JSON.parse(storedGuardian));
      }
    } catch (error) {
      console.error("Failed to parse guardian data from localStorage", error);
      localStorage.removeItem('guardiao_ativo');
    }
  }, []);
  
  // Fetch products once when the app loads
  useEffect(() => {
    if (fetchInitiated.current) {
        return;
    }
    fetchInitiated.current = true;
    
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const fetchedProducts = await generateProductDescriptions();
        setProducts(fetchedProducts);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setProductsError(`Falha ao carregar produtos: ${errorMessage}. Exibindo itens de amostra.`);
        // Fallback to sample data on error
        setProducts([
            { id: 1, name: "Óleo Essencial 'Raízes'", description: "Um óleo que aterra e conecta, com notas de vetiver e patchouli. Ideal para meditação e momentos de introspecção.", price: 89.90, imageUrl: 'https://picsum.photos/seed/raizes/400/400', category: 'Cura' },
            { id: 2, name: "Sabonete 'Canto da Mata'", description: "Limpeza profunda com argila verde e extrato de alecrim. Renova as energias e protege o campo áurico.", price: 34.90, imageUrl: 'https://picsum.photos/seed/mata/400/400', category: 'Limpeza' },
            { id: 3, name: "Bruma 'Orvalho da Manhã'", description: "Uma bruma facial refrescante com hidrolato de gerânio e aloe vera. Desperta a pele e eleva o espírito.", price: 69.90, imageUrl: 'https://picsum.photos/seed/orvalho/400/400', category: 'Ativação' },
        ]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const navigateTo = (newPage: Page) => {
    if (newPage !== page) {
      setPageHistory(prev => [...prev, page]);
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  const goBack = () => {
    const lastPage = pageHistory.pop() || 'home';
    setPageHistory([...pageHistory]);
    setPage(lastPage);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: Guardian) => {
    setGuardian(user);
    localStorage.setItem('guardiao_ativo', JSON.stringify(user));
  };

  const handleRegister = (user: Guardian) => {
    handleLogin(user); // In this prototype, registering also logs the user in
  };

  const handleLogout = () => {
    setGuardian(null);
    localStorage.removeItem('guardiao_ativo');
    navigateTo('account');
  };

  const goToCatalog = () => navigateTo('catalog');
  const goToHome = () => navigateTo('home');
  const goToUniverse = () => navigateTo('universe');
  const goToAccount = () => navigateTo('account');
  const goToContact = () => navigateTo('contact');
  const goToCart = () => navigateTo('cart');
  const goToAdmin = () => navigateTo('admin-ritual');
  const goToEditorFisicos = () => navigateTo('editor-fisicos');
  const goToEditorDigitais = () => navigateTo('editor-digitais');
  const goToInvisibleCalls = () => navigateTo('invisible-calls');

  const goToProductPage = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product');
  };

  const renderPage = () => {
    switch (page) {
      case 'catalog':
        return <RitualCatalogPage 
                  products={products}
                  isLoading={productsLoading}
                  error={productsError}
                  onProductClick={goToProductPage} 
                />;
      case 'invisible-calls':
        return <InvisibleCallsPage onProductClick={goToProductPage} />;
      case 'product':
        return selectedProduct ? <DigitalProductPage product={selectedProduct} onBackClick={goBack} /> : <RitualCatalogPage products={products} isLoading={productsLoading} error={productsError} onProductClick={goToProductPage} />;
      case 'universe':
        return <SankofaUniverse onExploreClick={goToCatalog} />;
      case 'account':
        return <AccountPage guardian={guardian} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage onContinueShopping={goToCatalog} />;
      case 'admin-ritual':
        if (!guardian) {
          navigateTo('account');
          return <AccountPage guardian={guardian} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} />;
        }
        return <AdminRitualPage guardian={guardian} onEditPhysical={goToEditorFisicos} onEditDigital={goToEditorDigitais} />;
      case 'editor-fisicos':
         if (!guardian) {
          navigateTo('account');
          return <AccountPage guardian={guardian} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} />;
        }
        return <PhysicalProductEditor onBackClick={goBack} />;
      case 'editor-digitais':
         if (!guardian) {
          navigateTo('account');
          return <AccountPage guardian={guardian} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} />;
        }
        return <DigitalProductEditor onBackClick={goBack} />;
      case 'home':
      default:
        return (
          <>
            <Hero onAwakenClick={goToCatalog} />
            <ProductShowcase 
              products={products}
              isLoading={productsLoading}
              error={productsError}
              onProductClick={goToProductPage} 
            />
          </>
        );
    }
  };


  return (
    <div className="min-h-screen">
      <EnergyField />
      <div className="relative z-10 isolate">
        <Header 
          guardian={guardian}
          onLogoClick={goToHome} 
          onProductsClick={goToCatalog} 
          onUniverseClick={goToUniverse}
          onInvisibleCallsClick={goToInvisibleCalls}
          onAccountClick={goToAccount}
          onCartClick={goToCart}
        />
        <main>
           {renderPage()}
        </main>
        <Footer 
            onProductsClick={goToCatalog} 
            onUniverseClick={goToUniverse}
            onAccountClick={goToAccount}
            onContactClick={goToContact}
            onAdminClick={goToAdmin}
        />
      </div>
    </div>
  );
};

export default App;