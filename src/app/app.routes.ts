import { Routes } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog.component';
import { CartComponent } from './components/cart.component';
import { CheckoutComponent } from './components/checkout.component';

export const routes: Routes = [
  { path: '', component: ProductCatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }
];
