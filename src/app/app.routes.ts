import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { 
    path: 'catalog', 
    loadComponent: () => import('./pages/catalog-page/catalog-page').then(m => m.CatalogPageComponent) 
  },
  { 
    path: 'categories', 
    loadComponent: () => import('./pages/categories-page/categories-page').then(m => m.CategoriesPageComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPageComponent) 
  },
  { 
    path: 'checkout', 
    loadComponent: () => import('./pages/checkout-page/checkout-page').then(m => m.CheckoutPageComponent) 
  },
  { path: '**', redirectTo: '' }
];
