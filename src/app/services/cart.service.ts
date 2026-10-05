import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Centralized state using Angular Signals
  private cartItems = signal<CartItem[]>([]);

  // Computed signals for derived state
  public readonly items = this.cartItems.asReadonly();
  
  public readonly totalItems = computed(() => 
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  public readonly totalPrice = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  constructor() { }

  addToCart(product: Product, quantity: number = 1) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this.cartItems.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
