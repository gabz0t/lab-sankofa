
import React, { useState } from 'react';
import { CouponIcon, EyeIcon, FireIcon, FlowerIcon, KeyIcon, RewardIcon, VeilIcon, LeafIcon, SpiralIcon } from './icons';
import type { Guardian } from '../types';

const RuneChart = ({ percentage }: { percentage: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="rune-chart-container relative flex items-center justify-center">
            <svg className="rune-chart" width="120" height="120" viewBox="0 0 120 120">
                <circle className="rune-chart-bg" cx="60" cy="60" r={radius} />
                <circle
                    className="rune-chart-progress"
                    cx="60"
                    cy="60"
                    r={radius}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <span className="rune-chart-text absolute text-2xl font-bold">{percentage}%</span>
        </div>
    );
};

interface OverviewTabProps {
    onEditPhysical: () => void;
    onEditDigital: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ onEditPhysical, onEditDigital }) => (
    <div className="space-y-8 animate-fadeIn">
        <div className="grid md:grid-cols-3 gap-6">
            <div className="admin-metric-card">
                <h4 className="text-lg font-bold">Cupons Ativos</h4>
                <p className="text-4xl font-bold text-amber-300">12</p>
            </div>
            <div className="admin-metric-card">
                <h4 className="text-lg font-bold">Recompensas em Andamento</h4>
                <p className="text-4xl font-bold text-amber-300">3</p>
            </div>
             <div className="admin-metric-card">
                <h4 className="text-lg font-bold">Últimas Chaves Criadas</h4>
                <p className="text-4xl font-bold text-amber-300">5</p>
            </div>
        </div>
        <div className="admin-metric-card flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
            <RuneChart percentage={75} />
            <div>
                <h4 className="text-xl font-bold">Progresso de Uso</h4>
                <p className="text-stone-400">75% das chaves criadas este mês foram utilizadas.</p>
            </div>
        </div>

        {/* Creation Sanctuary */}
        <div className="pt-8 mt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-6 text-center">Santuário de Criação</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="creation-sanctuary-card p-6 rounded-lg flex flex-col items-center justify-center text-center" onClick={onEditPhysical}>
                    <LeafIcon className="h-10 w-10 text-amber-300 mb-4" />
                    <h4 className="text-xl font-bold text-white">Editar Produtos Físicos</h4>
                    <span className="creation-tooltip">Plantar no mundo material</span>
                </div>
                 <div className="creation-sanctuary-card p-6 rounded-lg flex flex-col items-center justify-center text-center" onClick={onEditDigital}>
                    <SpiralIcon className="h-10 w-10 text-amber-300 mb-4" />
                    <h4 className="text-xl font-bold text-white">Editar Produtos Digitais</h4>
                    <span className="creation-tooltip">Semear no plano sutil</span>
                </div>
            </div>
        </div>
    </div>
);

const CreateKeyTab = () => (
    <div className="create-key-card max-w-2xl mx-auto animate-fadeIn">
        <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-6 text-center">Forjar Nova Chave</h3>
        <form className="space-y-6">
            <input type="text" placeholder="Nome do Cupom (Ex: DESPERTAR)" className="ritual-form-field" />
            <div className="grid md:grid-cols-2 gap-6">
                <select className="ritual-form-field">
                    <option>Tipo de Benefício</option>
                    <option value="percent">% Desconto</option>
                    <option value="shipping">Frete Gratuito</option>
                    <option value="product">Produto Específico</option>
                </select>
                <select className="ritual-form-field">
                    <option>Ícone Ritual</option>
                    <option value="flower">Flor</option>
                    <option value="fire">Fogo</option>
                    <option value="veil">Véu</option>
                </select>
            </div>
            <textarea rows={3} placeholder="Mensagem simbólica (máx. 120 caracteres)" className="ritual-form-field"></textarea>
            <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Validade (Ex: 31/12/2024)" className="ritual-form-field" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}/>
                <input type="number" placeholder="Limite de Uso" className="ritual-form-field" />
            </div>
             <button type="submit" className="create-key-button w-full mt-4">
                <KeyIcon className="h-5 w-5"/>
                <span>Criar nova chave</span>
            </button>
        </form>
    </div>
);

const ListKeysTab = () => (
    <div className="space-y-4 animate-fadeIn">
        {/* Mock Data */}
        {[
            { name: 'DESPERTAR', code: 'WAKEUP2024', benefit: 'Frete Gratuito', date: '01/01/2024', status: 'ativo' },
            { name: 'JORNADAFIEL', code: 'LOYALTY15', benefit: '15% Desconto', date: '15/03/2024', status: 'ativo' },
            { name: 'ECLIPSELUNAR', code: 'MOONVEIL', benefit: 'Produto Grátis', date: '05/02/2024', status: 'inativo' },
        ].map(coupon => (
             <div key={coupon.code} className="coupon-list-card">
                <div className="flex-grow flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <div className="w-full md:w-1/4">
                        <p className="font-bold text-amber-300">{coupon.name}</p>
                        <p className="text-sm text-stone-500">{coupon.code}</p>
                    </div>
                    <div className="w-full md:w-1/4"><p>{coupon.benefit}</p></div>
                    <div className="w-full md:w-1/4"><p>{coupon.date}</p></div>
                    <div className="w-full md:w-1/4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${coupon.status === 'ativo' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {coupon.status}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="admin-action-button">Editar</button>
                    <button className="admin-action-button">Desativar</button>
                </div>
            </div>
        ))}
    </div>
);

const RewardsTab = () => (
    <div className="reward-flow-panel animate-fadeIn">
         <h3 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] mb-6 text-center">Fluxos de Recompensa</h3>
         <div className="space-y-8">
            <div className="reward-flow">
                <div className="reward-flow-item">Após 3 pedidos</div>
                <div className="reward-flow-connector"></div>
                <div className="reward-flow-item">Liberar cupom: CHAVE-003</div>
            </div>
             <div className="reward-flow">
                <div className="reward-flow-item">Gasto total &gt; R$500</div>
                <div className="reward-flow-connector"></div>
                <div className="reward-flow-item">Liberar E-book: "A Voz"</div>
            </div>
         </div>
         <button className="ritual-button mt-8 mx-auto block">Criar Novo Fluxo</button>
    </div>
);


type AdminTabId = 'overview' | 'create' | 'list' | 'rewards';

interface AdminTabInfo {
    id: AdminTabId;
    name: string;
    icon: React.ReactNode;
}

const TABS: AdminTabInfo[] = [
    { id: 'overview', name: 'Visão Geral', icon: <EyeIcon className="h-5 w-5" /> },
    { id: 'create', name: 'Criar Chave', icon: <KeyIcon className="h-5 w-5" /> },
    { id: 'list', name: 'Lista de Chaves', icon: <CouponIcon className="h-5 w-5" /> },
    { id: 'rewards', name: 'Recompensas', icon: <RewardIcon className="h-5 w-5" /> },
];

interface AdminRitualPageProps {
  guardian: Guardian | null;
  onEditPhysical: () => void;
  onEditDigital: () => void;
}

const AdminRitualPage: React.FC<AdminRitualPageProps> = ({ guardian, onEditPhysical, onEditDigital }) => {
    const [activeTab, setActiveTab] = useState<AdminTabId>('overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'create': return <CreateKeyTab />;
            case 'list': return <ListKeysTab />;
            case 'rewards': return <RewardsTab />;
            case 'overview':
            default:
                return <OverviewTab onEditPhysical={onEditPhysical} onEditDigital={onEditDigital} />;
        }
    };

    return (
        <div className="admin-ritual-page page-container min-h-screen">
            <div className="container mx-auto">
                <header className="text-center mb-12">
                    <h1 className="page-title text-4xl md:text-5xl mb-2">Portal do Guardião</h1>
                    <p className="page-subtitle">Bem-vinde, {guardian?.name || 'guardião do verbo'}.</p>
                </header>

                 <div className="grid md:grid-cols-4 gap-8">
                    <aside className="md:col-span-1">
                        <nav className="admin-tab-menu flex flex-col space-y-2 sticky top-24">
                            {TABS.map(tab => (
                                 <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-4 text-left inline-flex items-center gap-3 ${activeTab === tab.id ? 'active' : ''}`}>
                                    {tab.icon} {tab.name}
                                </button>
                            ))}
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

export default AdminRitualPage;
