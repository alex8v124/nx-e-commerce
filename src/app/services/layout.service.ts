import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isCartOpen = signal(false);

  toggleCart() {
    this.isCartOpen.update(val => !val);
    if (this.isCartOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeCart() {
    this.isCartOpen.set(false);
    document.body.style.overflow = '';
  }
}
