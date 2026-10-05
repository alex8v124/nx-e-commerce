import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container container">
      <div class="checkout-header animate-slide-in">
        <h2>Complete Your Order</h2>
        <p>Please provide your details below to finalize your purchase.</p>
      </div>
      
      <div class="checkout-layout">
        <!-- Form Section -->
        <div class="checkout-form-section surface animate-fade-in" style="animation-delay: 0.1s">
          <form (ngSubmit)="onSubmit()" #checkoutForm="ngForm">
            <h3>Datos de Facturación (Empresa)</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" ngModel required placeholder="John" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" ngModel required placeholder="Doe" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" name="email" ngModel required placeholder="john.doe@example.com" />
            </div>
            
            <div class="form-group">
              <label>Company Name (Optional)</label>
              <input type="text" name="company" ngModel placeholder="Nodux B2B Consulting" />
            </div>
            
            <div class="form-group">
              <label>Address</label>
              <input type="text" name="address" ngModel required placeholder="123 Corporate Blvd" />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <input type="text" name="city" ngModel required />
              </div>
              <div class="form-group">
                <label>Zip Code</label>
                <input type="text" name="zip" ngModel required />
              </div>
            </div>
            
            <h3 class="payment-heading">Payment Information</h3>
            <div class="payment-methods">
              <label class="payment-option">
                <input type="radio" name="payment" value="card" checked />
                <span>Credit / Debit Card</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment" value="transfer" />
                <span>Bank Transfer (B2B)</span>
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary submit-btn" [disabled]="!checkoutForm.valid || cartService.items().length === 0">
              Confirmar Solicitud B2B
            </button>
          </form>
        </div>
        
        <!-- Order Summary Section -->
        <div class="order-summary-section surface animate-fade-in" style="animation-delay: 0.2s">
          <h3>Resumen de Equipos</h3>
          
          <div class="summary-items">
            <div class="summary-item" *ngFor="let item of cartService.items()">
              <img [src]="item.product.image" [alt]="item.product.name" />
              <div class="item-info">
                <h4>{{ item.product.name }}</h4>
                <span>Qty: {{ item.quantity }}</span>
              </div>
              <div class="item-price">
                {{ (item.product.price * item.quantity) | currency:'USD' }}
              </div>
            </div>
          </div>
          
          <div class="summary-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ cartService.totalPrice() | currency:'USD' }}</span>
            </div>
            <div class="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="total-row grand-total">
              <span>Total Estimado</span>
              <span class="text-brand">{{ cartService.totalPrice() | currency:'USD' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 3rem 1.5rem;
    }
    
    .checkout-header {
      margin-bottom: 3rem;
      text-align: center;
    }
    
    .checkout-header h2 {
      font-size: 2.5rem;
      color: var(--text-dark);
      margin-bottom: 1rem;
    }
    
    .checkout-header p {
      color: var(--text-body);
    }
    
    .checkout-layout {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 2rem;
    }
    
    .checkout-form-section, .order-summary-section {
      padding: 2rem;
      border-radius: var(--radius-lg);
    }
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .payment-heading {
      margin-top: 2rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-dark);
    }
    
    input {
      width: 100%;
    }
    
    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .payment-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: var(--transition);
      background: var(--bg-primary);
    }
    
    .payment-option:hover {
      border-color: var(--brand-blue);
      background: rgba(37, 99, 235, 0.05);
    }
    
    .submit-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1.125rem;
    }
    
    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .summary-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
      max-height: 400px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }
    
    .summary-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .summary-item img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }
    
    .item-info {
      flex: 1;
    }
    
    .item-info h4 {
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .item-info span {
      font-size: 0.75rem;
      color: var(--text-body);
    }
    
    .item-price {
      font-weight: 600;
      color: var(--text-dark);
    }
    
    .summary-totals {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      color: var(--text-body);
    }
    
    .grand-total {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-dark);
      border-top: 1px solid var(--border-color);
      padding-top: 1rem;
      margin-top: 0.5rem;
    }
    
    .text-brand {
      color: var(--brand-blue);
    }
    
    @media (max-width: 992px) {
      .checkout-layout {
        grid-template-columns: 1fr;
      }
      .order-summary-section {
        order: -1; /* Show summary first on mobile */
      }
    }
    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutPageComponent {
  cartService = inject(CartService);

  onSubmit() {
    if (this.cartService.items().length === 0) return;
    
    alert('Order placed successfully! In a real app this would call the Spring Boot backend.');
    this.cartService.clearCart();
    // Redirect to home...
  }
}
