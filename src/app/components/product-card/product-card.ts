import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card surface animate-fade-in">
      <div class="product-image-container">
        <img [src]="product.image" [alt]="product.name" class="product-image" loading="lazy" />
        <div class="product-badge" *ngIf="product.stock < 10 && product.stock > 0">
          Últimas unidades
        </div>
        <div class="product-badge out-of-stock" *ngIf="product.stock === 0">
          Agotado
        </div>
        <button class="wishlist-btn" aria-label="Add to wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>
      
      <div class="product-info">
        <span class="product-category">{{ product.category }}</span>
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-desc">{{ product.description }}</p>
        
        <div class="product-footer">
          <span class="product-price">{{ product.price | currency:'USD' }}</span>
          <button 
            class="btn btn-primary add-to-cart-btn" 
            [disabled]="product.stock === 0"
            (click)="addToCart()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            {{ product.stock === 0 ? 'No Disp.' : 'Agregar' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }
    
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: #CBD5E1;
    }
    
    .product-image-container {
      position: relative;
      height: 220px;
      overflow: hidden;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }
    
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    
    .product-card:hover .product-image {
      transform: scale(1.05);
    }
    
    .product-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: #F59E0B;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .product-badge.out-of-stock {
      background: #EF4444;
    }
    
    .wishlist-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--surface-bg);
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-body);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }
    
    .product-card:hover .wishlist-btn {
      opacity: 1;
      transform: translateY(0);
    }
    
    .wishlist-btn:hover {
      color: #EF4444;
    }
    
    .product-info {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background: var(--surface-bg);
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }
    
    .product-category {
      color: var(--brand-blue);
      font-size: 0.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .product-title {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
      line-height: 1.4;
    }
    
    .product-desc {
      font-size: 0.875rem;
      color: var(--text-body);
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .product-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px dashed var(--border-color);
    }
    
    .product-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
    }
    
    .add-to-cart-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    
    .add-to-cart-btn:disabled {
      background: var(--bg-secondary);
      color: var(--text-body);
      box-shadow: none;
      cursor: not-allowed;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  cartService = inject(CartService);

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
