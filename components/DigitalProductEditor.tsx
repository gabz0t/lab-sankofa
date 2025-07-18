
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, PlusIcon, SankofaBirdIcon, EyeIcon, ArchiveIcon, CrystalIcon, BookOpenIcon } from './icons';

interface DigitalProduct {
    id: number;
    name: string;
    imageUrl: string;
    mediaType: 'E-book' | 'Áudio' | 'Vídeo' | 'Guia PDF';
    category: 'Hermetismo' | 'Intuição' | 'Palavra';
    description: string;
    accessPhrase: string;
    status: 'Ativo' | 'Arquivado';
    fileUrl: string;
}

const initialProducts: DigitalProduct[] = [
    { id: 101, name: 'Guia do Verbo Ancestral', imageUrl: 'https://picsum.photos/seed/guia_verbo/400/400', mediaType: 'E-book', category: 'Palavra', description: 'Meditações escritas para reconexão interior.', accessPhrase: 'Desbloqueie com sabedoria', status: 'Ativo', fileUrl: '#' },
    { id: 102, name: 'A Voz Antes do Pensamento', imageUrl: 'https://picsum.photos/seed/voz_antes/400/400', mediaType: 'Áudio', category: 'Intuição', description: 'Trilha guiada para silenciar a mente e ouvir a alma.', accessPhrase: 'Ouça o silêncio', status: 'Ativo', fileUrl: '#' },
    { id: 103, name: 'As Sete Leis Herméticas', imageUrl: 'https://picsum.photos/seed/leis_hermeticas/400/400', mediaType: 'Guia PDF', category: 'Hermetismo', description: 'Rituais práticos para treinar a visão sutil.', accessPhrase: 'Veja além do véu', status: 'Arquivado', fileUrl: '#' },
];

const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

const DigitalProductEditor: React.FC<{ onBackClick: () => void }> = ({ onBackClick }) => {
    const [products, setProducts] = useState<DigitalProduct[]>(() => getInitialState('sankofa_digital_products', initialProducts));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<DigitalProduct | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMediaType, setFilterMediaType] = useState('Todos');
    const [filterStatus, setFilterStatus] = useState('Todos');

    useEffect(() => {
        try {
            window.localStorage.setItem('sankofa_digital_products', JSON.stringify(products));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.accessPhrase.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMediaType = filterMediaType === 'Todos' || p.mediaType === filterMediaType;
            const matchesStatus = filterStatus === 'Todos' || p.status === filterStatus;
            return matchesSearch && matchesMediaType && matchesStatus;
        });
    }, [products, searchTerm, filterMediaType, filterStatus]);
    
    const openModal = (product: DigitalProduct | null = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = (productData: Omit<DigitalProduct, 'id' | 'status'>, id?: number) => {
        if (id) {
            setProducts(products.map(p => p.id === id ? { ...p, ...productData } : p));
        } else {
            const newProduct: DigitalProduct = {
                id: Date.now(),
                ...productData,
                status: 'Ativo',
            };
            setProducts([newProduct, ...products]);
        }
        closeModal();
    };
    
    const toggleArchiveStatus = (id: number) => {
        setProducts(products.map(p => 
            p.id === id ? { ...p, status: p.status === 'Ativo' ? 'Arquivado' : 'Ativo' } : p
        ));
    };

    return (
        <div className="page-container editor-page digital-editor-page min-h-screen">
            <div className="container mx-auto">
                <div className="mb-8">
                    <button onClick={onBackClick} className="back-button inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Voltar ao Portal
                    </button>
                </div>
                <header className="text-center mb-12">
                    <h1 className="page-title text-4xl md:text-5xl !font-['Cormorant_Unicase']">Santuário Digital</h1>
                    <p className="page-subtitle">Semeie seus saberes no plano sutil.</p>
                </header>

                <div className="ritual-search-bar p-4 rounded-lg mb-8 flex flex-wrap gap-4 items-center veil-reveal" style={{animationDelay: '100ms'}}>
                    <input
                        type="text"
                        placeholder="Revelar pelo nome ou verbo…"
                        className="ritual-form-field flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={filterMediaType} onChange={e => setFilterMediaType(e.target.value)} className="ritual-form-field w-full sm:w-auto">
                        <option>Todos os Tipos</option>
                        <option>E-book</option>
                        <option>Áudio</option>
                        <option>Vídeo</option>
                        <option>Guia PDF</option>
                    </select>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="ritual-form-field w-full sm:w-auto">
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Arquivado</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} onEdit={openModal} onArchive={toggleArchiveStatus} index={index} />
                    ))}
                </div>

                <button onClick={() => openModal()} className="editor-fab" aria-label="Adicionar Produto Digital">
                    <PlusIcon className="h-7 w-7" />
                </button>

                {isModalOpen && (
                    <ProductModal 
                        product={editingProduct} 
                        onClose={closeModal} 
                        onSave={handleSaveProduct} 
                    />
                )}
            </div>
             <footer className="editor-footer !text-purple-300/70">
                <p>“O verbo se torna som, imagem, código. E volta ao coração.”</p>
                <SankofaBirdIcon className="h-8 w-8 mx-auto mt-4 opacity-30" />
            </footer>
        </div>
    );
};

const ProductCard: React.FC<{ product: DigitalProduct; onEdit: (p: DigitalProduct) => void; onArchive: (id: number) => void; index: number }> = ({ product, onEdit, onArchive, index }) => (
    <div className="product-admin-card flex flex-col veil-reveal group" style={{animationDelay: `${200 + index * 50}ms`}}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="p-4 flex-grow flex flex-col">
            <div className="flex justify-between items-start">
                 <div className="flex items-center gap-2 mb-2">
                    {product.mediaType === 'E-book' ? <BookOpenIcon className="h-5 w-5 text-purple-300" /> : <CrystalIcon className="h-5 w-5 text-purple-300" />}
                    <h3 className="text-xl font-bold text-purple-300 font-['Cormorant_Unicase']">{product.name}</h3>
                 </div>
                 <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${product.status === 'Ativo' ? 'bg-green-500/20 text-green-300' : 'bg-stone-500/20 text-stone-300'}`}>
                    {product.status}
                </span>
            </div>
            <p className="text-sm text-stone-400 mb-2">{product.mediaType} • {product.category}</p>
            <p className="text-sm text-stone-300 flex-grow">{product.description}</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-end justify-between gap-2">
                 <button onClick={() => onEdit(product)} className="admin-action-button text-sm !px-4">Editar</button>
                 <div className="flex gap-2">
                    <button className="admin-action-button" aria-label="Visualizar"><EyeIcon className="h-4 w-4" /></button>
                    <button onClick={() => onArchive(product.id)} className="admin-action-button" aria-label="Arquivar"><ArchiveIcon className="h-4 w-4" /></button>
                </div>
            </div>
        </div>
    </div>
);

const ProductModal: React.FC<{ product: DigitalProduct | null; onClose: () => void; onSave: (data: any, id?: number) => void; }> = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        imageUrl: product?.imageUrl || 'https://picsum.photos/seed/novo_saber/400/400',
        mediaType: product?.mediaType || 'E-book',
        category: product?.category || 'Intuição',
        description: product?.description || '',
        accessPhrase: product?.accessPhrase || '',
        fileUrl: product?.fileUrl || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData, product?.id);
    };

    return (
        <div className="ritual-modal-overlay visible" onClick={onClose}>
            <div className="ritual-modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold text-white font-['Cormorant_Unicase'] text-center">
                        {product ? 'Expandir Fragmento do Verbo' : 'Selar no Plano Digital'}
                    </h2>
                    
                    <input type="text" name="name" placeholder="Nome do Conteúdo" value={formData.name} onChange={handleChange} className="ritual-form-field" required />
                    
                    <div>
                        <label className="block text-sm font-medium text-amber-200/70 mb-2">Imagem de Capa</label>
                        <div className="flex items-center gap-4">
                            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-md border border-white/10" />}
                            <label htmlFor="imageUpload" className="ritual-button cursor-pointer w-full text-center py-3">
                                Carregar Capa
                            </label>
                            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select name="mediaType" value={formData.mediaType} onChange={handleChange} className="ritual-form-field">
                            <option>E-book</option>
                            <option>Áudio</option>
                            <option>Vídeo</option>
                            <option>Guia PDF</option>
                        </select>
                         <select name="category" value={formData.category} onChange={handleChange} className="ritual-form-field">
                            <option>Hermetismo</option>
                            <option>Intuição</option>
                            <option>Palavra</option>
                        </select>
                    </div>
                    
                    <textarea name="description" placeholder="Descrição Simbólica" value={formData.description} onChange={handleChange} className="ritual-form-field" rows={3}></textarea>
                    <input type="text" name="accessPhrase" placeholder="Frase de Acesso" value={formData.accessPhrase} onChange={handleChange} className="ritual-form-field" />
                    <input type="text" name="fileUrl" placeholder="URL do Arquivo ou Link" value={formData.fileUrl} onChange={handleChange} className="ritual-form-field" />

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="ritual-button !border-stone-500 !text-stone-300">Cancelar</button>
                        <button type="submit" className="ritual-button !bg-purple-400/20 !border-purple-300 !text-purple-200">🔓 {product ? 'Atualizar' : 'Selar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DigitalProductEditor;