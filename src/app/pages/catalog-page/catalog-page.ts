import { Component, OnInit, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="catalog-container container">
      <div class="page-header">
        <h1 class="page-title">Catálogo de <span class="brand-text">Soluciones</span></h1>
        <p class="subtitle">Herramientas digitales y hardware robusto para tu operación logística.</p>
      </div>
      
      <div class="filters-container surface">
        <div class="filter-group" style="flex: 1;">
          <label>Filtro por Categoría:</label>
          <div class="category-chips">
            <button 
              *ngFor="let cat of categories()"
              class="chip"
              [class.active]="selectedCategory() === cat"
              (click)="selectedCategory.set(cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>
        
        <div class="filter-group" *ngIf="searchQuery()" style="background: rgba(37,99,235,0.1); padding: 0.5rem 1rem; border-radius: 99px;">
          <span style="font-size: 0.875rem; color: var(--brand-blue); font-weight: 500;">
            Buscando: "{{ searchQuery() }}"
          </span>
          <button (click)="clearSearch()" style="background:none; border:none; color:var(--brand-blue); cursor:pointer; margin-left:0.5rem;">✕</button>
        </div>
        
        <div class="filter-group sort-group">
          <label for="sort">Ordenar por:</label>
          <select id="sort" (change)="onSortChange($event)">
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor Precio</option>
            <option value="price-desc">Mayor Precio</option>
          </select>
        </div>
      </div>

      <div *ngIf="loading()" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando catálogo operativo...</p>
      </div>

      <div *ngIf="!loading() && filteredProducts().length > 0" class="products-grid">
        <app-product-card 
          *ngFor="let product of filteredProducts(); let i = index" 
          [product]="product"
          [style.animation-delay]="(i * 0.1) + 's'"
        ></app-product-card>
      </div>

      <div *ngIf="!loading() && filteredProducts().length === 0" class="empty-state surface">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h3>No se encontraron productos</h3>
        <p>Intenta con otra búsqueda o categoría.</p>
        <button class="btn btn-outline" (click)="clearFilters()">Ver todo el catálogo</button>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding-top: 3rem;
      padding-bottom: 6rem;
      animation: fadeIn 0.5s ease-out;
    }
    
    .page-header {
      margin-bottom: 3rem;
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
    
    .filters-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      margin-bottom: 3rem;
      gap: 1.5rem;
      border-radius: var(--radius-lg);
    }
    
    .filter-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .filter-group label {
      font-weight: 600;
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
      border-color: var(--brand-blue);
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
      padding: 6rem 2rem;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border-color);
      border-radius: 50%;
      border-top-color: var(--brand-blue);
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .filters-container {
        flex-direction: column;
        align-items: flex-start;
      }
      .sort-group {
        width: 100%;
        justify-content: space-between;
      }
      .page-title {
        font-size: 2.25rem;
      }
    }
  `]
})
export class CatalogPageComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  sortBy = signal<string>('featured');
  loading = signal<boolean>(true);
  
  filteredProducts = computed(() => {
    let result = this.products();
    const category = this.selectedCategory();
    if (category !== 'All') result = result.filter(p => p.category === category);
    
    const search = this.searchQuery().toLowerCase();
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    const sort = this.sortBy();
    result = [...result]; 
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    
    return result;
  });

  ngOnInit() {
    this.categories.set(this.productService.getCategories());
    
    // Subscribe to query params to auto-filter
    const sub = this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory.set(params['category']);
      }
      if (params['search']) {
        this.searchQuery.set(params['search']);
      } else {
        this.searchQuery.set('');
      }
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      }
    });
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value);
  }

  clearSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: null },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters() {
    this.selectedCategory.set('All');
    this.clearSearch();
  }
}
