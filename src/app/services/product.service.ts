import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'UltraBook Pro', brand: 'Zenith', price: 95000, discountPercent: 10, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', category: 'Laptops', inStock: true },
    { id: 2, name: 'Noise Cancel Headphones', brand: 'AudioMax', price: 18500, discountPercent: 15, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', category: 'Audio', inStock: true },
    { id: 3, name: 'Smart Watch Series 5', brand: 'TechWear', price: 25000, discountPercent: 0, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Wearables', inStock: false }
  ];

  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  getProducts() { return this.products; }

  addToCart(product: Product) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.cartSubject.next([...this.cart]);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercent / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  }
}
