import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { LayoutService } from '../../services/layout.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header surface">
      <div class="container header-content">
        <div class="logo" routerLink="/" style="cursor: pointer;">
          <img src="/assets/images/logo.png" alt="Nodux Logo" class="brand-logo" />
        </div>
        
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Inicio</a>
          <a routerLink="/catalog" routerLinkActive="active" class="nav-link">Catálogo</a>
          <a routerLink="/categories" routerLinkActive="active" class="nav-link">Categorías</a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">Sobre Nosotros</a>
        </nav>
        
        <div class="header-actions">
          <button class="theme-btn" (click)="toggleTheme()" aria-label="Toggle dark mode">
            <svg *ngIf="isDarkTheme()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg *ngIf="!isDarkTheme()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
          
          <div class="search-bar">
            <input #searchInput type="text" placeholder="Buscar soluciones..." (keyup.enter)="onSearch(searchInput.value)" />
            <button class="search-btn" (click)="onSearch(searchInput.value)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
          
          <button class="cart-btn btn btn-primary" (click)="toggleCart()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>Carrito ({{ cartService.totalItems() }})</span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-top: none;
      box-shadow: var(--shadow-sm);
      background-color: var(--surface-header);
      transition: background-color 0.3s ease;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .brand-logo {
      height: 60px;
      width: auto;
      object-fit: cover;
      transform: scale(1.15);
      margin-left: 0.5rem;
      /* CSS Hack to make white backgrounds transparent and keep logo color */
      filter: invert(1) hue-rotate(180deg) brightness(1.5);
      mix-blend-mode: screen;
    }
    
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    
    .nav-link {
      color: #94A3B8;
      font-weight: 500;
      font-size: 0.875rem;
      transition: var(--transition);
      position: relative;
    }
    
    .nav-link:hover, .nav-link.active {
      color: #FFFFFF;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--brand-blue);
      transition: var(--transition);
    }
    
    .nav-link:hover::after, .nav-link.active::after {
      width: 100%;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .search-bar {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .theme-btn {
      color: #94A3B8;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 50%;
      transition: var(--transition);
      margin-right: 0.5rem;
    }
    
    .theme-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
    }
    
    .search-bar input {
      padding-right: 2.5rem;
      width: 300px;
    }
    
    .search-btn {
      position: absolute;
      right: 12px;
      color: var(--text-body);
      transition: var(--transition);
    }
    
    .search-btn:hover {
      color: var(--brand-blue);
    }
    
    @media (max-width: 992px) {
      .nav-links, .search-bar {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  cartService = inject(CartService);
  layout = inject(LayoutService);
  router = inject(Router);
  isDarkTheme = signal<boolean>(false);
  
  toggleCart() {
    this.layout.toggleCart();
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
    if (this.isDarkTheme()) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  onSearch(query: string) {
    if (query.trim()) {
      this.router.navigate(['/catalog'], { queryParams: { search: query.trim() }, queryParamsHandling: 'merge' });
    }
  }
}
