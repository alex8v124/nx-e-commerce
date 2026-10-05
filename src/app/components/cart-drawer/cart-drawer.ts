import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { LayoutService } from '../../services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay -->
    <div 
      class="cart-overlay animate-fade-in" 
      *ngIf="layout.isCartOpen()" 
      (click)="layout.closeCart()"
    ></div>

    <!-- Drawer -->
    <div class="cart-drawer surface" [class.open]="layout.isCartOpen()">
      <div class="cart-header">
        <h2>Tu Cotización</h2>
        <button class="close-btn" (click)="layout.closeCart()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="cart-content">
        <div class="empty-cart" *ngIf="cartService.items().length === 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>Aún no has agregado equipos.</p>
          <button class="btn btn-outline" (click)="layout.closeCart()">Ver Catálogo</button>
        </div>

        <div class="cart-items" *ngIf="cartService.items().length > 0">
          <div class="cart-item" *ngFor="let item of cartService.items(); let i = index" [style.animation-delay]="(i * 0.1) + 's'">
            <img [src]="item.product.image" [alt]="item.product.name" class="item-image" />
            
            <div class="item-details">
              <h4>{{ item.product.name }}</h4>
              <p class="item-price">{{ item.product.price | currency:'USD' }}</p>
              
              <div class="quantity-controls">
                <button class="qty-btn" (click)="updateQty(item.product.id, item.quantity - 1)">-</button>
                <span class="qty-display">{{ item.quantity }}</span>
                <button class="qty-btn" (click)="updateQty(item.product.id, item.quantity + 1)">+</button>
              </div>
            </div>
            
            <button class="remove-btn" (click)="removeItem(item.product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="cart-footer" *ngIf="cartService.items().length > 0">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ cartService.totalPrice() | currency:'USD' }}</span>
        </div>
        <p class="taxes-note">Taxes and shipping calculated at checkout</p>
        <button class="btn btn-primary checkout-btn" (click)="goToCheckout()">
          Proceed to Checkout
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
    }

    .cart-drawer {
      position: fixed;
      top: 0;
      right: -400px; /* Hidden by default */
      width: 100%;
      max-width: 400px;
      height: 100vh;
      border-left: 1px solid var(--border-color);
      border-radius: 0;
      border-top: none;
      border-bottom: none;
      border-right: none;
      z-index: 1001;
      display: flex;
      flex-direction: column;
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: -10px 0 30px rgba(15,23,42,0.1);
    }

    .cart-drawer.open {
      right: 0;
    }

    .cart-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cart-header h2 {
      font-size: 1.25rem;
      margin: 0;
    }

    .close-btn {
      color: var(--text-body);
      transition: var(--transition);
      padding: 0.5rem;
    }

    .close-btn:hover {
      color: var(--text-dark);
      transform: rotate(90deg);
    }

    .cart-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      background: var(--bg-primary);
    }

    .empty-cart {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--text-body);
      gap: 1rem;
    }

    .empty-icon {
      color: var(--border-color);
      margin-bottom: 1rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cart-item {
      display: flex;
      gap: 1rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      animation: slideIn 0.3s ease-out forwards;
      opacity: 0;
      transform: translateX(20px);
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }

    .item-details {
      flex: 1;
    }

    .item-details h4 {
      font-size: 1rem;
      margin-bottom: 0.25rem;
      color: var(--text-dark);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .item-price {
      font-weight: 600;
      color: var(--brand-blue);
      margin-bottom: 0.75rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #FFFFFF;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      padding: 0.25rem;
      width: fit-content;
    }

    .qty-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-dark);
      transition: var(--transition);
    }

    .qty-btn:hover {
      background: var(--bg-secondary);
    }

    .qty-display {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-dark);
      min-width: 16px;
      text-align: center;
    }

    .remove-btn {
      color: var(--text-body);
      align-self: flex-start;
      padding: 0.25rem;
      transition: var(--transition);
    }

    .remove-btn:hover {
      color: #ef4444;
    }

    .cart-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
      background: #FFFFFF;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      font-size: 1.25rem;
      color: var(--text-dark);
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .taxes-note {
      font-size: 0.875rem;
      color: var(--text-body);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .checkout-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
    }
  `]
})
export class CartDrawerComponent {
  cartService = inject(CartService);
  layout = inject(LayoutService);
  router = inject(Router);

  updateQty(productId: number, qty: number) {
    this.cartService.updateQuantity(productId, qty);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  goToCheckout() {
    this.layout.closeCart();
    this.router.navigate(['/checkout']);
  }
}
