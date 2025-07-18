import { GoogleGenAI, Type } from "@google/genai";
import type { Product } from '../types';

const productSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'Nome evocativo e curto do produto em português. Ex: "Bruma Ancestral"',
      },
      description: {
        type: Type.STRING,
        description: 'Descrição curta e poética do produto em português (2-3 frases).',
      },
      price: {
        type: Type.NUMBER,
        description: 'Preço do produto como um número, ex: 89.90',
      },
      category: {
        type: Type.STRING,
        description: 'A categoria do ritual para o produto. Deve ser uma das seguintes: "Limpeza", "Ativação", "Cura", "Proteção", "Expansão".',
      },
    },
    required: ["name", "description", "price", "category"],
  },
};

export const generateProductDescriptions = async (): Promise<Product[]> => {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        console.warn("API_KEY environment variable not set. Using fallback data.");
        throw new Error("A chave da API do Google não está configurada.");
    }
    
    const ai = new GoogleGenAI({ apiKey });

    try {
        const prompt = `Gere 3 ideias de produtos únicos para a "Sankofa Lab", uma marca que conecta ancestralidade e inovação com produtos naturais. Para cada produto, forneça nome, descrição, preço e uma categoria de ritual correspondente. As categorias devem ser uma das seguintes: "Limpeza", "Ativação", "Cura", "Proteção", "Expansão". Os produtos devem ser cosméticos, de aromaterapia ou de cuidado pessoal, com um tema ancestral, natural ou místico. Os nomes devem ser em português e poéticos.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: productSchema,
            }
        });

        let generatedProducts: any[] = [];
        try {
            const jsonText = (response && typeof response.text === 'string') ? response.text.trim() : '';
            generatedProducts = JSON.parse(jsonText);
        } catch {
            throw new Error("A resposta da API não está no formato esperado.");
        }

        if (!Array.isArray(generatedProducts)) {
            throw new Error("A resposta da API não está no formato esperado.");
        }
        
        return generatedProducts.map((p, index) => ({
            ...p,
            id: Date.now() + index,
            imageUrl: `https://picsum.photos/seed/${(p.name || 'produto').replace(/\s/g, '')}/${400 + index}`,
        }));

    } catch (error) {
        console.error("Erro ao chamar a API Gemini:", error);
        throw new Error("Não foi possível gerar as descrições dos produtos.");
    }
};