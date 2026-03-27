import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';
import { DiscountPipe } from '../pipes/discount.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, DiscountPipe],
  template: `
    <div class="cart-container">
      <header>
        <div class="logo">ZenabMart<span>.</span></div>
        <a routerLink="/">Back to Catalog</a>
      </header>

      <main>
        <h1>Your Shopping Cart</h1>
        <div class="cart-content">
          <div class="cart-items-list">
            <div class="cart-item" *ngFor="let item of productService.cart$ | async">
              <img [src]="item.image" [alt]="item.name">
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p>{{ item.brand }}</p>
                <div class="quantity-controls">
                  <span>Qty: {{ item.quantity }}</span>
                </div>
              </div>
              <div class="item-price">
                <span class="discounted">{{ item.price | discount:item.discountPercent | currency }}</span>
                <span class="original" *ngIf="item.discountPercent > 0">{{ item.price | currency }}</span>
              </div>
              <button class="remove-btn" (click)="productService.removeFromCart(item.id)">Remove</button>
            </div>
            <div *ngIf="(productService.cart$ | async)?.length === 0" class="empty-msg">
              Your cart is lonely. Let's add some stuff!
              <br><br>
              <button routerLink="/" class="shop-btn">Go Shopping</button>
            </div>
          </div>

          <div class="order-summary" *ngIf="(productService.cart$ | async)?.length! > 0">
            <h2>Order Summary</h2>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ productService.getTotalPrice() | currency:'INR':'symbol':'1.0-0' }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ productService.getTotalPrice() | currency:'INR':'symbol':'1.0-0' }}</span>
            </div>
            <button class="checkout-btn" routerLink="/checkout">Proceed to Checkout</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .cart-container { padding: 2rem 5%; font-family: 'Inter', sans-serif; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
    .logo { font-size: 1.5rem; font-weight: 900; }
    .logo span { color: #3498db; }
    h1 { margin-bottom: 2rem; font-weight: 800; }
    .cart-content { display: grid; grid-template-columns: 1fr 350px; gap: 3rem; }
    .cart-item { display: flex; align-items: center; gap: 2rem; padding: 1.5rem; background: white; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
    .cart-item img { width: 100px; height: 100px; border-radius: 8px; object-fit: cover; }
    .item-details { flex: 1; }
    .item-details h3 { margin: 0; }
    .item-price { text-align: right; }
    .discounted { display: block; font-weight: 800; font-size: 1.2rem; color: #27ae60; }
    .original { display: block; text-decoration: line-through; color: #bdc3c7; font-size: 0.9rem; }
    .remove-btn { color: #e74c3c; background: none; border: none; cursor: pointer; font-weight: 600; }
    .order-summary { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); height: fit-content; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; color: #7f8c8d; }
    .total { border-top: 1px solid #eee; padding-top: 1rem; font-weight: 800; color: #2c3e50; font-size: 1.2rem; }
    .checkout-btn { width: 100%; background: #3498db; color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 1rem; }
    .empty-msg { text-align: center; padding: 4rem; background: white; border-radius: 12px; }
    .shop-btn { background: #3498db; color: white; border: none; padding: 0.8rem 2rem; border-radius: 6px; cursor: pointer; }
    @media (max-width: 900px) { .cart-content { grid-template-columns: 1fr; } }
  `]
})
export class CartComponent {
  constructor(public productService: ProductService) {}
}
