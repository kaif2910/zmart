import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from './product-card.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  template: `
    <div class="zenabmart-root">
      <header>
        <div class="logo">ZenabMart<span>.</span></div>
        <nav class="nav-links">
          <a routerLink="/" class="active">Home</a>
          <a routerLink="/cart">Cart</a>
          <div class="cart-trigger" (click)="showCart = true">
            🛒 ({{ (productService.cart$ | async)?.length }})
          </div>
        </nav>
      </header>

      <main>
        <div class="hero">
          <h1>Modern Gear for Modern Life</h1>
          <p>Discover our curated collection of high-end electronics.</p>
        </div>
        
        <div class="product-grid">
          <app-product-card 
            *ngFor="let p of products" 
            [product]="p"
            (onAdd)="productService.addToCart($event)">
          </app-product-card>
        </div>
      </main>

      <!-- Cart Drawer -->
      <div class="drawer-overlay" *ngIf="showCart" (click)="showCart = false" [@fade]></div>
      <div class="cart-drawer" *ngIf="showCart" [@slideInOut]>
        <div class="drawer-header">
          <h2>Your Cart</h2>
          <button (click)="showCart = false">✕</button>
        </div>
        <div class="cart-items">
          <div class="cart-item" *ngFor="let item of productService.cart$ | async">
            <img [src]="item.image" [alt]="item.name">
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <p>{{ item.quantity }} x {{ item.price | currency:'INR':'symbol':'1.0-0' }}</p>
            </div>
            <button class="remove" (click)="productService.removeFromCart(item.id)">🗑</button>
          </div>
          <div *ngIf="(productService.cart$ | async)?.length === 0" class="empty">
            Your cart is empty.
          </div>
        </div>
        <div class="drawer-footer">
          <button class="checkout-btn" routerLink="/cart">View Cart & Checkout</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .zenabmart-root { font-family: 'Inter', sans-serif; background: #f9f9fb; min-height: 100vh; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 5%; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 50; }
    .logo { font-size: 1.5rem; font-weight: 900; }
    .logo span { color: #3498db; }
    .nav-links { display: flex; align-items: center; gap: 2rem; }
    .nav-links a { text-decoration: none; color: #2c3e50; font-weight: 600; transition: 0.3s; }
    .nav-links a:hover, .nav-links a.active { color: #3498db; }
    .cart-trigger { cursor: pointer; font-weight: 600; background: #f1f2f6; padding: 0.5rem 1.2rem; border-radius: 30px; transition: 0.3s; }
    .cart-trigger:hover { background: #e2e4e9; }
    main { padding: 3rem 5%; }
    .hero { text-align: center; margin-bottom: 4rem; }
    .hero h1 { font-size: 3rem; font-weight: 800; color: #2c3e50; margin-bottom: 0.5rem; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
    
    .drawer-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); z-index: 100; }
    .cart-drawer { position: fixed; top: 0; right: 0; width: 350px; height: 100%; background: white; z-index: 101; box-shadow: -5px 0 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; }
    .drawer-header { padding: 1.5rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
    .cart-items { flex: 1; overflow-y: auto; padding: 1.5rem; }
    .cart-item { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; }
    .cart-item img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; }
    .item-info { flex: 1; }
    .item-info h4 { margin: 0; font-size: 1rem; }
    .remove { background: none; border: none; cursor: pointer; color: #e74c3c; font-size: 1.2rem; }
    .drawer-footer { padding: 1.5rem; border-top: 1px solid #eee; }
    .checkout-btn { width: 100%; background: #3498db; color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: bold; cursor: pointer; }
    @media (max-width: 400px) { .cart-drawer { width: 100%; } }
  `],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProductCatalogComponent {
  products: any[] = [];
  showCart = false;

  constructor(public productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}
