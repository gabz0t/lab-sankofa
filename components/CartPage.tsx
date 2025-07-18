
import React, { useState } from 'react';
import type { Product } from '../types';
import { TrashIcon, KeyIcon } from './icons';

interface CartPageProps {
    onContinueShopping: () => void;
}

const mockCartItems: (Product & { quantity: number })[] = [
    { id: 1, name: "Elixir da Aurora", description: "Um óleo que desperta a energia vital com notas de gerânio e bergamota.", price: 99.90, imageUrl: 'https://picsum.photos/seed/aurora/400/400', category: 'Ativação', quantity: 1 },
    { id: 101, name: 'Verbo Ancestral', description: 'E-book de frases canalizadas e meditações escritas.', price: 47.00, imageUrl: 'https://picsum.photos/seed/verbo/400/400', category: 'Verbo', mediaType: 'E-book', quantity: 1 },
];

const CheckoutRitualEffect: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
            <div
                key={i}
                className="ritual-particle"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 1.5 + 1}s`,
                    animationDelay: `${Math.random() * 0.5}s`,
                }}
            />
        ))}
    </div>
);


const CartPage: React.FC<CartPageProps> = ({ onContinueShopping }) => {
    const [cartItems, setCartItems] = useState(mockCartItems);
    const [showRitual, setShowRitual] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

    const handleCheckout = () => {
        setShowRitual(true);
        setTimeout(() => {
            setShowRitual(false);
            setCartItems([]);
            // maybe navigate to a success page
        }, 3000);
    };

    return (
        <div className="cart-page page-container min-h-screen animate-fadeIn">
            <div className="container mx-auto">
                <header className="text-center mb-12">
                    <h1 className="page-title text-4xl md:text-5xl mb-2">Rituais Escolhidos</h1>
                    <p className="page-subtitle">Os artefatos que acompanharão sua jornada.</p>
                </header>

                {cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="glass-card p-4 rounded-lg flex items-center gap-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-white">{item.name}</h3>
                                        <p className="text-sm text-stone-300">R$ {item.price?.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {/* Quantity changer can be added here */}
                                        <p className="font-bold text-white">x{item.quantity}</p>
                                        <button className="text-stone-400 hover:text-red-400 transition-colors">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="lg:col-span-1">
                            <div className="glass-card p-6 rounded-lg sticky top-24">
                                <h2 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-6">Resumo do Rito</h2>
                                <div className="space-y-3 text-stone-200">
                                    <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
                                    <div className="flex justify-between"><span>Frete</span><span>Calculado na próxima etapa</span></div>
                                    <div className="flex justify-between font-bold text-white text-lg pt-3 border-t border-white/10"><span>Total</span><span>R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
                                </div>

                                <div className="mt-6">
                                    <label className="text-sm font-medium text-amber-200/70 mb-2 block">Usar Chave de Desbloqueio</label>
                                    <div className="flex">
                                        <input type="text" placeholder="Sua chave" className="key-input w-full px-3 py-2 rounded-l-md focus:outline-none" />
                                        <button className="key-button p-3 rounded-r-md"><KeyIcon className="h-5 w-5"/></button>
                                    </div>
                                </div>
                                
                                <div className="relative mt-6">
                                    <button onClick={handleCheckout} className="ritual-button w-full py-3 rounded-md" disabled={showRitual}>
                                        {showRitual ? 'Finalizando...' : 'Finalizar Rito'}
                                    </button>
                                    {showRitual && <CheckoutRitualEffect />}
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="text-center py-16 glass-card rounded-lg">
                        <h2 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-4">Seu caldeirão está vazio.</h2>
                        <p className="page-subtitle mb-6">Nenhum ritual foi escolhido ainda.</p>
                        <button onClick={onContinueShopping} className="ritual-button py-3 px-10 rounded-full">
                            Explorar Rituais
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;