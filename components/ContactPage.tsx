
import React, { useState } from 'react';
import { WhatsappIcon, InstagramIcon, GrowthIcon, ProtectionIcon, VisionIcon } from './icons';

type Intention = 'crescimento' | 'protecao' | 'visao' | 'none';

const INTENTIONS = [
    { id: 'crescimento', name: 'Crescimento', icon: <GrowthIcon className="h-5 w-5" /> },
    { id: 'protecao', name: 'Proteção', icon: <ProtectionIcon className="h-5 w-5" /> },
    { id: 'visao', name: 'Visão', icon: <VisionIcon className="h-5 w-5" /> },
];

const ContactPage: React.FC = () => {
    const [selectedIntention, setSelectedIntention] = useState<Intention>('none');

    const intentionBgClasses: Record<Intention, string> = {
        none: '',
        crescimento: 'intention-bg-growth',
        protecao: 'intention-bg-protection',
        visao: 'intention-bg-vision'
    };

    return (
        <div className="contact-page page-container min-h-screen animate-fadeIn">
            <div className="container mx-auto">
                <header className="text-center mb-12">
                    <h1 className="page-title text-4xl md:text-5xl mb-2">Enviar um Sinal</h1>
                    <p className="page-subtitle max-w-2xl mx-auto">Sua voz ecoa no invisível. Estamos aqui para ouvir.</p>
                </header>
                
                <div className="max-w-xl mx-auto">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-amber-200/70 mb-2">Seu Nome</label>
                            <input type="text" id="name" className="w-full ritual-form-field px-4 py-3 rounded-md" placeholder="Quem envia o sinal?" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-amber-200/70 mb-2">Seu Email</label>
                            <input type="email" id="email" className="w-full ritual-form-field px-4 py-3 rounded-md" placeholder="Onde o retorno deve chegar?" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-200/70 mb-2">Intenção do Contato</label>
                            <div className="intention-selector grid grid-cols-3 gap-3">
                                {INTENTIONS.map(intention => (
                                    <div key={intention.id}>
                                        <input
                                            type="radio"
                                            id={intention.id}
                                            name="intention"
                                            value={intention.id}
                                            className="sr-only"
                                            onChange={() => setSelectedIntention(intention.id as Intention)}
                                        />
                                        <label htmlFor={intention.id} className="cursor-pointer p-3 rounded-md flex flex-col items-center justify-center text-center">
                                            {intention.icon}
                                            <span className="text-sm mt-1">{intention.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-amber-200/70 mb-2">Sua Mensagem</label>
                            <textarea id="message" rows={6} className={`w-full ritual-form-field px-4 py-3 rounded-md ${intentionBgClasses[selectedIntention]}`} placeholder="Deixe sua mensagem atravessar o véu..."></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="ritual-button py-3 px-10 rounded-full">
                                Enviar Sinal para o Invisível
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="text-center mt-20 pt-10 border-t border-white/10">
                     <h2 className="text-xl font-bold text-white font-['Cormorant_Unicase'] mb-6">Canais Diretos</h2>
                     <div className="flex justify-center items-center space-x-6">
                         <a href="#" className="text-amber-300 hover:text-white transition-colors direct-contact-icon" aria-label="WhatsApp" style={{animationDelay: '0s'}}>
                            <WhatsappIcon className="h-8 w-8" />
                         </a>
                         <a href="https://www.instagram.com/sankofalab_/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-white transition-colors direct-contact-icon" aria-label="Instagram" style={{animationDelay: '0.2s'}}>
                            <InstagramIcon />
                         </a>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;