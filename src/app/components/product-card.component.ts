import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ZoomDirective } from '../directives/zoom.directive';
import { DiscountPipe } from '../pipes/discount.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ZoomDirective, DiscountPipe],
  template: `
    <div class="product-card" [class.out-of-stock]="!product.inStock">
      <div class="img-box">
        <img [src]="product.image" appZoom [alt]="product.name">
        <span class="badge" *ngIf="product.discountPercent > 0">-{{ product.discountPercent }}%</span>
      </div>
      <div class="info">
        <small>{{ product.brand }}</small>
        <h3>{{ product.name }}</h3>
        <div class="price-row">
          <span class="current">{{ product.price | discount:product.discountPercent | currency:'INR':'symbol':'1.0-0' }}</span>
          <span class="original" *ngIf="product.discountPercent > 0">{{ product.price | currency:'INR':'symbol':'1.0-0' }}</span>
        </div>
        <button (click)="onAdd.emit(product)" [disabled]="!product.inStock">
          {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-card { background: white; padding: 1rem; border-radius: 12px; transition: 0.3s; position: relative; }
    .product-card:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    .img-box { height: 200px; overflow: hidden; border-radius: 8px; position: relative; }
    img { width: 100%; height: 100%; object-fit: cover; }
    .badge { position: absolute; top: 10px; left: 10px; background: #eb4d4b; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
    .info { margin-top: 1rem; }
    small { color: #95a5a6; text-transform: uppercase; letter-spacing: 1px; }
    h3 { margin: 0.5rem 0; font-size: 1.1rem; color: #2c3e50; }
    .price-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
    .current { font-size: 1.3rem; font-weight: 800; color: #27ae60; }
    .original { text-decoration: line-through; color: #bdc3c7; font-size: 0.9rem; }
    button { width: 100%; background: #2c3e50; color: white; border: none; padding: 0.8rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
    button:disabled { background: #ecf0f1; color: #bdc3c7; cursor: not-allowed; }
    .out-of-stock { opacity: 0.7; }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() onAdd = new EventEmitter<Product>();
}
