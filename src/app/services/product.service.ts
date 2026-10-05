import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      stock: 45
    },
    {
      id: 2,
      name: 'Minimalist Smartwatch',
      category: 'Electronics',
      price: 199.50,
      description: 'Track your health, receive notifications, and look stylish with this sleek smartwatch.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      rating: 4.6,
      stock: 20
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      category: 'Furniture',
      price: 499.00,
      description: 'Fully adjustable ergonomic chair designed for long hours of comfortable work.',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      stock: 12
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      category: 'Accessories',
      price: 129.99,
      description: 'Tactile mechanical switches with customizable RGB backlighting.',
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
      stock: 0
    },
    {
      id: 5,
      name: 'Leather Weekend Bag',
      category: 'Fashion',
      price: 189.00,
      description: 'Handcrafted genuine leather bag, perfect for short trips and weekend getaways.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      rating: 4.5,
      stock: 8
    },
    {
      id: 6,
      name: 'Ceramic Coffee Mug',
      category: 'Home',
      price: 24.99,
      description: 'Artisan-crafted ceramic mug with a beautiful matte glaze finish.',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      stock: 100
    }
  ];

  // Using signals for state management
  private categoriesSignal = signal<string[]>(['All', 'Electronics', 'Furniture', 'Accessories', 'Fashion', 'Home']);

  constructor() { }

  getProducts(): Observable<Product[]> {
    // Simulating network delay for backend call (Spring Boot)
    return of(this.mockProducts).pipe(delay(800));
  }

  getCategories(): string[] {
    return this.categoriesSignal();
  }
}
