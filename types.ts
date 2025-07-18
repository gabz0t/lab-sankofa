

export interface Product {
  id: number;
  name: string;
  description: string;
  price?: number; // Optional price for digital goods
  imageUrl: string;
  category: 'Limpeza' | 'Ativação' | 'Cura' | 'Proteção' | 'Expansão' | 'Intuição' | 'Verbo' | 'Véu' | 'Presença' | string;
  mediaType?: 'E-book' | 'Áudio Ritual' | 'Ritual Guiado' | 'PDF';
  
  // Optional fields for DigitalProductPage
  pages?: number;
  content?: string[];
  ritualSuggestion?: { title: string, steps: string[] };
  excerpt?: string;
  subtitle?: string;
}

export interface Guardian {
  name: string;
  email: string;
}
