import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="categories-container container">
      <div class="page-header">
        <h1 class="page-title">Familias de <span class="brand-text">Productos</span></h1>
        <p class="subtitle">Explora nuestras soluciones organizadas por verticales logísticas.</p>
      </div>
      
      <div class="categories-grid">
        <a *ngFor="let cat of getDisplayCategories()" 
           routerLink="/catalog" 
           [queryParams]="{ category: cat.name }"
           class="category-card surface">
           
          <div class="category-icon">
             <!-- Dynamically render an icon based on category name -->
             <svg *ngIf="cat.name === 'Electronics' || cat.name === 'All'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
             
             <svg *ngIf="cat.name === 'Accessories'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
             
             <svg *ngIf="cat.name === 'Furniture' || cat.name === 'Home'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l2 11h10l2-11Z"></path><path d="M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path></svg>
             
             <svg *ngIf="cat.name === 'Fashion'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>
          </div>
          
          <div class="category-content">
            <h3>{{ cat.name === 'All' ? 'Todas las Soluciones' : cat.name }}</h3>
            <p>Explorar catálogo completo <span class="arrow">→</span></p>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      padding-top: 4rem;
      padding-bottom: 6rem;
      animation: fadeIn 0.5s ease-out;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .page-title {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .brand-text {
      color: var(--brand-blue);
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: var(--text-body);
    }
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .category-card {
      display: flex;
      align-items: center;
      padding: 2rem;
      border-radius: var(--radius-lg);
      text-decoration: none;
      transition: var(--transition);
      cursor: pointer;
    }
    
    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: var(--brand-blue);
    }
    
    .category-icon {
      width: 64px;
      height: 64px;
      background: rgba(37, 99, 235, 0.1);
      color: var(--brand-blue);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.5rem;
      flex-shrink: 0;
      transition: var(--transition);
    }
    
    .category-card:hover .category-icon {
      background: var(--brand-blue);
      color: white;
    }
    
    .category-content h3 {
      font-size: 1.25rem;
      color: var(--text-dark);
      margin-bottom: 0.25rem;
    }
    
    .category-content p {
      color: var(--text-body);
      font-size: 0.875rem;
      display: flex;
      align-items: center;
    }
    
    .arrow {
      margin-left: 0.5rem;
      transition: transform 0.3s ease;
    }
    
    .category-card:hover .arrow {
      transform: translateX(5px);
      color: var(--brand-blue);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class CategoriesPageComponent {
  productService = inject(ProductService);
  
  getDisplayCategories() {
    return this.productService.getCategories().filter(c => c !== 'All').map(c => ({ name: c }));
  }
}
