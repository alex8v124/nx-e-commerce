import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CartDrawerComponent, RouterModule],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <app-cart-drawer></app-cart-drawer>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="footer">
        <div class="container footer-content">
          <div class="footer-col brand-col">
            <img src="/assets/images/logo.png" alt="Nodux Logo" class="footer-logo" />
            <p>Conectamos la realidad física del negocio con la ingeniería de datos y la automatización. Digitaliza tu logística hoy.</p>
          </div>
          <div class="footer-col">
            <h4>Soluciones</h4>
            <a routerLink="/catalog" [queryParams]="{category: 'Software'}">Gestión de Inventarios</a>
            <a routerLink="/catalog" [queryParams]="{category: 'Software'}">Automatización de Flujos</a>
            <a routerLink="/catalog" [queryParams]="{category: 'Software'}">Tableros de Control</a>
            <a routerLink="/catalog">Equipamiento Hardware</a>
          </div>
          <div class="footer-col">
            <h4>Empresa</h4>
            <a routerLink="/about">Sobre Nosotros</a>
            <a routerLink="/about">Casos de Éxito</a>
            <a routerLink="/about">Blog y Noticias</a>
            <a href="https://wa.me/51919620888?text=Hola,%20quisiera%20más%20información%20sobre%20las%20soluciones%20B2B%20de%20Nodux" target="_blank">Contacto B2B</a>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <p>&copy; 2026 Nodux B2B Consulting. Estandarizando operaciones.</p>
          </div>
        </div>
      </footer>

      <!-- Floating WhatsApp Button -->
      <a href="https://wa.me/51919620888" target="_blank" class="whatsapp-float" aria-label="Contact via WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      position: relative;
    }
    
    .footer {
      background: var(--text-dark);
      padding: 4rem 0 0 0;
      margin-top: auto;
      color: #94A3B8;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      padding-bottom: 3rem;
    }
    
    .footer-col h4 {
      color: #FFFFFF;
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }
    
    .footer-col a {
      display: block;
      color: #94A3B8;
      margin-bottom: 0.75rem;
      transition: color 0.2s ease;
    }
    
    .footer-col a:hover {
      color: var(--brand-blue);
    }
    
    .brand-col p {
      line-height: 1.7;
      margin-top: 1.25rem;
      max-width: 80%;
    }
    
    .footer-logo {
      height: 44px;
      width: auto;
      object-fit: contain;
      mix-blend-mode: screen;
      margin-bottom: 1rem;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      text-align: center;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .brand-col p {
        max-width: 100%;
      }
    }
  `]
})
export class AppComponent {
  title = 'Nodux Store';
}
