import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';
import { DiscountPipe } from '../pipes/discount.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, DiscountPipe],
  template: `
    <div class="checkout-container">
      <header>
        <div class="logo">ZenabMart<span>.</span></div>
        <a routerLink="/cart">Back to Cart</a>
      </header>

      <main>
        <h1>Secure Checkout</h1>
        <div class="checkout-grid">
          <div class="checkout-form">
            <section>
              <h3>1. Shipping Information</h3>
              <div class="form-group">
                <input type="text" placeholder="Full Name">
              </div>
              <div class="form-group">
                <input type="email" placeholder="Email Address">
              </div>
              <div class="form-group">
                <input type="text" placeholder="Shipping Address">
              </div>
              <div class="form-row">
                <input type="text" placeholder="City">
                <input type="text" placeholder="Zip Code">
              </div>
            </section>

            <section>
              <h3>2. Payment Method</h3>
              <div class="payment-options">
                <label class="radio-card">
                  <input type="radio" name="payment" checked>
                  <div class="card-content">
                    <span>Credit / Debit Card</span>
                    <small>Visa, Mastercard, AMEX</small>
                  </div>
                </label>
                <label class="radio-card">
                  <input type="radio" name="payment">
                  <div class="card-content">
                    <span>PayPal</span>
                    <small>Easy and secure</small>
                  </div>
                </label>
              </div>
            </section>

            <button class="place-order-btn" (click)="placeOrder()">Place Order</button>
          </div>

          <div class="order-preview">
            <h3>Your Order</h3>
            <div class="order-items">
              <div class="mini-item" *ngFor="let item of productService.cart$ | async">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>{{ (item.price | discount:item.discountPercent) * item.quantity | currency:'INR':'symbol':'1.0-0' }}</span>
              </div>
            </div>
            <div class="total-row">
              <strong>Total to Pay</strong>
              <strong>{{ productService.getTotalPrice() | currency:'INR':'symbol':'1.0-0' }}</strong>
            </div>
          </div>
        </div>
      </main>

      <div class="success-overlay" *ngIf="orderPlaced">
        <div class="success-card">
          <div class="icon">✓</div>
          <h2>Order Placed!</h2>
          <p>Thank you for shopping at ZenabMart. Your order is on its way!</p>
          <button routerLink="/">Back to Home</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container { padding: 2rem 5%; font-family: 'Inter', sans-serif; position: relative; min-height: 100vh; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
    .logo { font-size: 1.5rem; font-weight: 900; }
    .logo span { color: #3498db; }
    h1 { margin-bottom: 2rem; }
    .checkout-grid { display: grid; grid-template-columns: 1fr 400px; gap: 4rem; }
    section { background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
    h3 { margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
    .payment-options { display: flex; flex-direction: column; gap: 1rem; }
    .radio-card { border: 1px solid #eee; padding: 1rem; border-radius: 8px; display: flex; gap: 1rem; align-items: center; cursor: pointer; }
    .radio-card input { width: auto; }
    .card-content span { display: block; font-weight: 600; }
    .card-content small { color: #7f8c8d; }
    .place-order-btn { width: 100%; background: #27ae60; color: white; border: none; padding: 1.2rem; border-radius: 8px; font-weight: bold; font-size: 1.1rem; cursor: pointer; }
    .order-preview { background: #f8f9fa; padding: 2rem; border-radius: 12px; height: fit-content; }
    .mini-item { display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.9rem; color: #34495e; }
    .total-row { border-top: 2px solid #eee; margin-top: 1.5rem; padding-top: 1rem; display: flex; justify-content: space-between; font-size: 1.2rem; }
    .success-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .success-card { background: white; padding: 3rem; border-radius: 20px; text-align: center; max-width: 400px; }
    .icon { width: 60px; height: 60px; background: #27ae60; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; }
    .success-card h2 { margin-bottom: 1rem; }
    .success-card button { background: #3498db; color: white; border: none; padding: 0.8rem 2rem; border-radius: 6px; cursor: pointer; }
    @media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; } }
  `]
})
export class CheckoutComponent {
  orderPlaced = false;
  constructor(public productService: ProductService) {}

  placeOrder() {
    this.orderPlaced = true;
    // Real app would send data to server here
  }
}
