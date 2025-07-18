
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, PlusIcon, LeafIcon, JarIcon, StarIcon, SankofaBirdIcon, EyeIcon, ArchiveIcon } from './icons';

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    category: 'Autocuidado' | 'Suplementos' | 'Rituais';
    price: number;
    description: string;
    stock: number;
    symbolicKey: string;
    status: 'Ativo' | 'Arquivado';
}

const initialProducts: Product[] = [
    { id: 1, name: 'Óleo Essencial "Raízes"', imageUrl: 'https://picsum.photos/seed/oleo_raizes/400/400', category: 'Autocuidado', price: 89.9, stock: 50, symbolicKey: 'CONEXÃO TERRENA', description: 'Um óleo que aterra e conecta, com notas de vetiver e patchouli.', status: 'Ativo' },
    { id: 2, name: 'Elixir "Fogo Interior"', imageUrl: 'https://picsum.photos/seed/elixir_fogo/400/400', category: 'Suplementos', price: 129.9, stock: 30, symbolicKey: 'VITALIDADE E AÇÃO', description: 'Suplemento adaptógeno para energia e foco.', status: 'Ativo' },
    { id: 3, name: 'Kit "Lua Cheia"', imageUrl: 'https://picsum.photos/seed/kit_lua/400/400', category: 'Rituais', price: 159.9, stock: 20, symbolicKey: 'PLENITUDE E INTUIÇÃO', description: 'Caixa com ervas, cristais e velas para rituais de lua cheia.', status: 'Arquivado' },
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

const PhysicalProductEditor: React.FC<{ onBackClick: () => void }> = ({ onBackClick }) => {
    const [products, setProducts] = useState<Product[]>(() => getInitialState('sankofa_physical_products', initialProducts));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Todos');
    const [filterStatus, setFilterStatus] = useState('Todos');

    useEffect(() => {
        try {
            window.localStorage.setItem('sankofa_physical_products', JSON.stringify(products));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.symbolicKey.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'Todos' || p.category === filterCategory;
            const matchesStatus = filterStatus === 'Todos' || p.status === filterStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, searchTerm, filterCategory, filterStatus]);
    
    const openModal = (product: Product | null = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = (productData: Omit<Product, 'id' | 'status'>, id?: number) => {
        if (id) {
            setProducts(products.map(p => p.id === id ? { ...p, ...productData } : p));
        } else {
            const newProduct: Product = {
                id: Date.now(),
                ...productData,
                status: 'Ativo', // Default status for new products
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
        <div className="page-container editor-page min-h-screen">
            <div className="container mx-auto">
                <div className="mb-8">
                    <button onClick={onBackClick} className="back-button inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Voltar ao Portal
                    </button>
                </div>
                <header className="text-center mb-12">
                    <h1 className="page-title text-4xl md:text-5xl !font-['Cormorant_Garamond']">Santuário Físico</h1>
                    <p className="page-subtitle">Plante suas criações no mundo material.</p>
                </header>

                <div className="ritual-search-bar p-4 rounded-lg mb-8 flex flex-wrap gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Buscar por nome ou símbolo…"
                        className="ritual-form-field flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="ritual-form-field w-full sm:w-auto">
                        <option>Todos</option>
                        <option>Autocuidado</option>
                        <option>Suplementos</option>
                        <option>Rituais</option>
                    </select>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="ritual-form-field w-full sm:w-auto">
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Arquivado</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onEdit={openModal} onArchive={toggleArchiveStatus} />
                    ))}
                </div>

                <button onClick={() => openModal()} className="editor-fab" aria-label="Adicionar Novo Produto">
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
            <footer className="editor-footer">
                <p>“Tudo que nasce no físico já vibrou no invisível.”</p>
                <SankofaBirdIcon className="h-8 w-8 mx-auto mt-4 opacity-30" />
            </footer>
        </div>
    );
};

const ProductCard: React.FC<{ product: Product; onEdit: (p: Product) => void; onArchive: (id: number) => void; }> = ({ product, onEdit, onArchive }) => (
    <div className="product-admin-card flex flex-col">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4 flex-grow flex flex-col">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-amber-300 font-['Cormorant_Garamond']">{product.name}</h3>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${product.status === 'Ativo' ? 'bg-green-500/20 text-green-300' : 'bg-stone-500/20 text-stone-300'}`}>
                    {product.status}
                </span>
            </div>
            <p className="text-sm text-stone-400 mb-2">{product.category}</p>
            <p className="text-lg font-bold text-white">R$ {product.price.toFixed(2).replace('.', ',')}</p>
            <p className="text-sm text-stone-400">Estoque: {product.stock}</p>
            <div className="mt-4 pt-4 border-t border-white/10 flex-grow flex items-end justify-between gap-2">
                 <button onClick={() => onEdit(product)} className="admin-action-button text-sm !px-4">Editar</button>
                 <div className="flex gap-2">
                    <button className="admin-action-button" aria-label="Visualizar"><EyeIcon className="h-4 w-4" /></button>
                    <button onClick={() => onArchive(product.id)} className="admin-action-button" aria-label="Arquivar"><ArchiveIcon className="h-4 w-4" /></button>
                </div>
            </div>
        </div>
    </div>
);

const ProductModal: React.FC<{ product: Product | null; onClose: () => void; onSave: (data: any, id?: number) => void; }> = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        imageUrl: product?.imageUrl || 'https://picsum.photos/seed/novo_produto/400/400',
        category: product?.category || 'Autocuidado',
        price: product?.price || 0,
        description: product?.description || '',
        stock: product?.stock || 0,
        symbolicKey: product?.symbolicKey || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) || 0 : value }));
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
                    <h2 className="text-2xl font-bold text-white font-['Cormorant_Garamond'] text-center">
                        {product ? 'Alinhar Forma e Função' : 'Semear Item no Plano Físico'}
                    </h2>
                    
                    <input type="text" name="name" placeholder="Nome do Produto" value={formData.name} onChange={handleChange} className="ritual-form-field" required />
                    
                    <div>
                        <label className="block text-sm font-medium text-amber-200/70 mb-2">Imagem do Artefato</label>
                        <div className="flex items-center gap-4">
                            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-md border border-white/10" />}
                            <label htmlFor="imageUpload" className="ritual-button cursor-pointer w-full text-center py-3">
                                Carregar Imagem
                            </label>
                            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select name="category" value={formData.category} onChange={handleChange} className="ritual-form-field">
                            <option>Autocuidado</option>
                            <option>Suplementos</option>
                            <option>Rituais</option>
                        </select>
                        <input type="number" name="price" placeholder="Preço" value={formData.price} onChange={handleChange} className="ritual-form-field" step="0.01" />
                    </div>
                    
                    <textarea name="description" placeholder="Descrição Simbólica" value={formData.description} onChange={handleChange} className="ritual-form-field" rows={3}></textarea>
                    
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="number" name="stock" placeholder="Estoque" value={formData.stock} onChange={handleChange} className="ritual-form-field" />
                        <input type="text" name="symbolicKey" placeholder="Chave Simbólica" value={formData.symbolicKey} onChange={handleChange} className="ritual-form-field" />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="ritual-button !border-stone-500 !text-stone-300">Cancelar</button>
                        <button type="submit" className="ritual-button">🌱 {product ? 'Atualizar' : 'Semear'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PhysicalProductEditor;