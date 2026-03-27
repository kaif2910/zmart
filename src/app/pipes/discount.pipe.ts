import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, percent: number): number {
    if (!percent || percent <= 0) return price;
    return price - (price * percent / 100);
  }
}
