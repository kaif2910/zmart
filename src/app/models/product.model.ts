export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountPercent: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
