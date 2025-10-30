// In production (Vercel), use the same domain via relative '/api'.
// In development, you can set VITE_API_URL=http://localhost:3000/api
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'potato' | 'pasta';
}

export const productService = {
  // GET all products
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // GET products by category
  async getByCategory(category: 'potato' | 'pasta'): Promise<Product[]> {
    const products = await this.getAll();
    return products.filter(p => p.category === category);
  },

  // GET single product
  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  // POST create product
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  // PUT update product
  async update(id: string, product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  // DELETE product
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },
};
