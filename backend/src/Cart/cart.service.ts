import { Injectable } from "@nestjs/common";

@Injectable()
export class CartService {
  getCartItems(): string {
    return "Cart items retrieved successfully!";
  }
    addItemToCart(item: any): string {
        return `Item added to cart: ${item.name}, Quantity: ${item.quantity}`;
    }
}