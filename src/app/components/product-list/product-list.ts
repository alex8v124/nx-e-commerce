import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <!-- Hero Banner Auto-Carousel -->
    <section class="hero-carousel">
      <div class="carousel-inner" [style.transform]="'translateX(-' + (currentSlide() * 100) + '%)'">
        <div class="carousel-slide" *ngFor="let slide of carouselSlides">
          <img [src]="slide.image" [alt]="slide.title" class="slide-bg" />
          <div class="slide-overlay">
            <div class="container slide-content">
              <span class="badge">{{ slide.badge }}</span>
              <h2 [innerHTML]="slide.title"></h2>
              <p>{{ slide.description }}</p>
              <div class="hero-actions">
                <a routerLink="/catalog" class="btn btn-primary">Ver Catálogo</a>
                <a href="https://wa.me/51919620888?text=Hola,%20me%20interesa%20hablar%20con%20un%20asesor%20de%20Nodux" target="_blank" class="btn" style="background: white; color: var(--text-dark);">Hablar con Asesor</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <button 
          *ngFor="let slide of carouselSlides; let i = index" 
          class="indicator" 
          [class.active]="currentSlide() === i"
          (click)="setSlide(i)"
          aria-label="Ir a diapositiva"
        ></button>
      </div>
    </section>

    <!-- Why Nodux Features Section -->
    <section class="features-section container">
      <div class="feature-card surface">
        <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
        <h3>Estandarización</h3>
        <p>Reemplazamos registros manuales por tableros automatizados.</p>
      </div>
      <div class="feature-card surface">
        <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
        <h3>Datos en Tiempo Real</h3>
        <p>Decisiones basadas en números, sin adivinar inventarios.</p>
      </div>
      <div class="feature-card surface">
        <div class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>
        <h3>Hardware B2B</h3>
        <p>Equipos diseñados para resistir operaciones logísticas intensas.</p>
      </div>
    </section>

    <section class="products-section container">
      <div class="section-header">
        <h3>Catálogo de Equipamiento Digital</h3>
        <p>Herramientas y hardware para potenciar tu operación.</p>
      </div>

      <div class="loading-state" *ngIf="loading()">
        <div class="spinner"></div>
        <p>Cargando equipos destacados...</p>
      </div>

      <div class="products-grid" *ngIf="!loading()">
        <app-product-card 
          *ngFor="let product of getFeaturedProducts(); let i = index" 
          [product]="product"
          [style.animation-delay]="(i * 0.1) + 's'"
        ></app-product-card>
      </div>
      
      <div style="text-align: center; margin-top: 4rem;">
        <a routerLink="/catalog" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.125rem;">
          Explorar Catálogo Completo
        </a>
      </div>
    </section>
  `,
  styles: [`
    /* Auto Carousel Styles */
    .hero-carousel {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
      background: var(--text-dark);
      margin-bottom: 4rem;
    }
    
    .carousel-inner {
      display: flex;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .carousel-slide {
      min-width: 100%;
      height: 100%;
      position: relative;
    }
    
    .slide-bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.5;
    }
    
    .slide-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.4) 100%);
    }
    
    .slide-content {
      color: white;
      max-width: 600px;
    }
    
    .badge {
      display: inline-block;
      padding: 0.35rem 1rem;
      background: rgba(37, 99, 235, 0.2);
      border: 1px solid var(--brand-blue);
      color: white;
      font-weight: 600;
      font-size: 0.75rem;
      border-radius: 99px;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .slide-content h2 {
      font-size: 3.5rem;
      line-height: 1.1;
      margin-bottom: 1.25rem;
      color: white;
    }
    
    .brand-text {
      color: var(--brand-blue);
    }
    
    .slide-content p {
      font-size: 1.125rem;
      color: #CBD5E1;
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
    }
    
    .carousel-indicators {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 10;
    }
    
    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transition: var(--transition);
      padding: 0;
    }
    
    .indicator.active {
      background: var(--brand-blue);
      width: 32px;
      border-radius: 6px;
    }
    
    /* Features Section */
    .features-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 5rem;
      margin-top: -6rem;
      position: relative;
      z-index: 20;
    }
    
    .feature-card {
      padding: 2rem;
      text-align: center;
      transition: var(--transition);
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      border-color: var(--brand-blue);
    }
    
    .feature-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1.5rem;
      background: var(--bg-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .feature-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
    
    /* Catalog section */
    .products-section {
      padding-bottom: 5rem;
    }
    
    .section-header {
      margin-bottom: 2.5rem;
    }
    
    .section-header h3 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .filters-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      margin-bottom: 3rem;
      gap: 1.5rem;
    }
    
    .filter-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .filter-group label {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-dark);
    }
    
    .category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .chip {
      padding: 0.5rem 1rem;
      border-radius: 99px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: var(--text-body);
      font-size: 0.875rem;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .chip:hover {
      background: var(--bg-secondary);
      border-color: #CBD5E1;
      color: var(--text-dark);
    }
    
    .chip.active {
      background: var(--brand-blue);
      color: white;
      border-color: var(--brand-blue);
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2.5rem;
    }
    
    .loading-state, .empty-state {
      text-align: center;
      padding: 4rem 0;
      color: var(--text-body);
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 6rem 2rem;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border-color);
      border-radius: 50%;
      border-top-color: var(--brand-blue);
      animation: spin 1s ease-in-out infinite;
      margin: 0 auto 1.5rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 992px) {
      .features-section {
        grid-template-columns: 1fr;
        margin-top: 0;
        padding-top: 2rem;
      }
      .slide-content h2 {
        font-size: 2.5rem;
      }
      .filters-container {
        flex-direction: column;
        align-items: flex-start;
      }
      .sort-group {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class ProductListComponent implements OnInit, OnDestroy {
  productService = inject(ProductService);
  
  // Carousel Data
  carouselSlides = [
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      badge: 'Nodux B2B Consulting',
      title: 'Digitaliza tu <span class="brand-text">Logística</span>',
      description: 'Eliminamos fugas de dinero por mermas o quiebres de stock con herramientas automatizadas.'
    },
    {
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200',
      badge: 'Hardware Industrial',
      title: 'Equipamiento <span class="brand-text">Robusto</span>',
      description: 'Terminales PDA, escáneres e impresoras térmicas para resistir la operación en almacenes.'
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      badge: 'Decisiones Basadas en Datos',
      title: 'Tableros de <span class="brand-text">Control</span>',
      description: 'Ten visibilidad completa de tus inventarios y pedidos B2B en tiempo real, desde cualquier dispositivo.'
    }
  ];
  
  currentSlide = signal<number>(0);
  private carouselInterval: any;

  // Catalog State
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string>('All');
  sortBy = signal<string>('featured');
  loading = signal<boolean>(true);
  
  getFeaturedProducts() {
    return this.products().slice(0, 4);
  }

  ngOnInit() {
    this.startCarousel();
    
    this.categories.set(this.productService.getCategories());
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentSlide.set((this.currentSlide() + 1) % this.carouselSlides.length);
    }, 5000);
  }

  setSlide(index: number) {
    this.currentSlide.set(index);
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.startCarousel(); // reset timer
    }
  }

  scrollToCatalog() {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  }

  setCategory(category: string) { this.selectedCategory.set(category); }
  setSort(event: Event) { this.sortBy.set((event.target as HTMLSelectElement).value); }
}
