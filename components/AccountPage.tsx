
import React, { useState } from 'react';
import { UserIcon, PackageIcon, DownloadIcon, KeyIcon, LogoutIcon } from './icons';
import type { Guardian } from '../types';

type AccountTab = 'pedidos' | 'downloads' | 'dados' | 'cupons';
type AuthMode = 'login' | 'register';

interface AccountPageProps {
    guardian: Guardian | null;
    onLogin: (user: Guardian) => void;
    onRegister: (user: Guardian) => void;
    onLogout: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ guardian, onLogin, onRegister, onLogout }) => {
    const [activeTab, setActiveTab] = useState<AccountTab>('pedidos');
    const [authMode, setAuthMode] = useState<AuthMode>('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ritualWord, setRitualWord] = useState('');
    const [feedback, setFeedback] = useState<{type: 'error' | 'success', message: string} | null>(null);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        if (email && password) {
            const mockName = name || email.split('@')[0];
            onLogin({ name: mockName, email });
        } else {
            setFeedback({ type: 'error', message: 'Algo não está alinhado. Revise sua energia.' });
        }
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        if (password !== confirmPassword) {
            setFeedback({ type: 'error', message: 'As senhas não coincidem.' });
            return;
        }
        if (name && email && password) {
            onRegister({ name, email });
            // The feedback for success can be shown by the parent or here, but since App component handles redirection, let's keep it simple.
        } else {
             setFeedback({ type: 'error', message: 'Por favor, preencha todos os campos obrigatórios.' });
        }
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 'pedidos':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-4">Meus Rituais</h3>
                        <div className="space-y-4">
                            <div className="ritual-card p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-amber-300">Pedido #SANKOFA-2024-01</p>
                                    <p className="text-sm text-stone-400">Data: 15/07/2024 - Status: A Caminho</p>
                                </div>
                                <button className="ritual-button text-sm py-1 px-3">Ver Detalhes</button>
                            </div>
                            {/* more orders */}
                        </div>
                    </div>
                );
            case 'downloads':
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-4">Saberes Desbloqueados</h3>
                        <div className="space-y-4">
                             <div className="ritual-card p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-amber-300">E-book: Verbo Ancestral</p>
                                    <p className="text-sm text-stone-400">Adquirido em: 10/06/2024</p>
                                </div>
                                <button className="ritual-button text-sm py-1 px-3 inline-flex items-center gap-2"><DownloadIcon className="h-4 w-4" /> Baixar</button>
                            </div>
                        </div>
                    </div>
                );
            case 'dados':
                 return (
                    <div>
                        <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-4">Dados Pessoais</h3>
                        <p>Informações do portal em breve...</p>
                    </div>
                );
            case 'cupons':
                 return (
                    <div>
                        <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-4">Chaves e Recompensas</h3>
                         <div className="ritual-card p-4 rounded-lg text-center">
                            <p className="font-bold text-amber-300 text-lg">DESPERTAR</p>
                            <p className="text-sm text-stone-400">Sua chave para a primeira jornada. Frete gratuito.</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!guardian) {
        return (
            <div className="page-container min-h-screen flex items-center justify-center animate-fadeIn">
                <div className="w-full max-w-md glass-card p-8 rounded-lg">
                    <div className="auth-tabs">
                        <button onClick={() => { setAuthMode('login'); setFeedback(null); }} className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}>
                            Atravessar o Véu
                        </button>
                        <button onClick={() => { setAuthMode('register'); setFeedback(null); }} className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}>
                            Iniciar Caminho
                        </button>
                    </div>

                    {authMode === 'login' ? (
                        <form onSubmit={handleLoginSubmit}>
                            <h1 className="page-title text-3xl mb-4 text-center">Portal da Jornada</h1>
                            {feedback && <p className={`auth-feedback ${feedback.type}`}>{feedback.message}</p>}
                            <div className="space-y-4">
                                <input type="email" placeholder="Seu e-mail portal" className="w-full ritual-form-field" value={email} onChange={e => setEmail(e.target.value)} required />
                                <input type="password" placeholder="Sua senha secreta" className="w-full ritual-form-field" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="ritual-button w-full mt-6 py-3">
                                Atravessar
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit}>
                             <h1 className="page-title text-3xl mb-4 text-center">Registrar Nova Presença</h1>
                             {feedback && <p className={`auth-feedback ${feedback.type}`}>{feedback.message}</p>}
                             <div className="space-y-4 text-left">
                                <input type="text" placeholder="Nome completo" className="w-full ritual-form-field" value={name} onChange={e => setName(e.target.value)} required />
                                <input type="email" placeholder="E-mail sagrado" className="w-full ritual-form-field" value={email} onChange={e => setEmail(e.target.value)} required />
                                <input type="password" placeholder="Criar senha" className="w-full ritual-form-field" value={password} onChange={e => setPassword(e.target.value)} required />
                                <input type="password" placeholder="Confirmar senha" className="w-full ritual-form-field" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                                <input type="text" placeholder="Palavra ritual (opcional)" className="w-full ritual-form-field" value={ritualWord} onChange={e => setRitualWord(e.target.value)} />
                            </div>
                            <button type="submit" className="ritual-button w-full mt-6 py-3">
                                ✨ Despertar Acesso
                            </button>
                        </form>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="account-page page-container min-h-screen animate-fadeIn">
            <div className="container mx-auto">
                <header className="text-center mb-16">
                    <h1 className="page-title text-4xl md:text-5xl mb-2">Minha Jornada</h1>
                    <p className="page-subtitle">Bem-vinde de volta, {guardian.name}.</p>
                </header>

                <div className="grid md:grid-cols-4 gap-8">
                    <aside className="md:col-span-1">
                        <nav className="tab-menu flex flex-col space-y-2 sticky top-24">
                            <button onClick={() => setActiveTab('pedidos')} className={`p-4 text-left inline-flex items-center gap-3 ${activeTab === 'pedidos' ? 'active' : ''}`}>
                                <PackageIcon className="h-5 w-5"/> Meus Rituais
                            </button>
                            <button onClick={() => setActiveTab('downloads')} className={`p-4 text-left inline-flex items-center gap-3 ${activeTab === 'downloads' ? 'active' : ''}`}>
                                <DownloadIcon className="h-5 w-5"/> Saberes Desbloqueados
                            </button>
                             <button onClick={() => setActiveTab('dados')} className={`p-4 text-left inline-flex items-center gap-3 ${activeTab === 'dados' ? 'active' : ''}`}>
                                <UserIcon className="h-5 w-5"/> Dados Pessoais
                            </button>
                            <button onClick={() => setActiveTab('cupons')} className={`p-4 text-left inline-flex items-center gap-3 ${activeTab === 'cupons' ? 'active' : ''}`}>
                                <KeyIcon className="h-5 w-5"/> Chaves e Recompensas
                            </button>
                             <button onClick={onLogout} className="logout-button p-4 text-left inline-flex items-center gap-3 text-stone-400 hover:text-red-400">
                                <LogoutIcon className="h-5 w-5" /> Encerrar Jornada
                            </button>
                        </nav>
                    </aside>
                    <main className="md:col-span-3 tab-content">
                        {renderTabContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
