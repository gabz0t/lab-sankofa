
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Footer from './components/Footer';
import EnergyField from './components/EnergyField';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <EnergyField />
      {/* The isolate property creates a new stacking context, ensuring the z-indexed children inside 
          don't compete with elements outside, like the fixed-position canvas. */}
      <div className="relative z-10 isolate">
        <Header />
        <main>
          <Hero />
          <ProductShowcase />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;