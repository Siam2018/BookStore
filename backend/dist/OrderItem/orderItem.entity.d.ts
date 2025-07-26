import { Order } from '../Order/order.entity';
import { Product } from '../Products/product.entity';
export declare class OrderItem {
    id: number;
    orderId: number;
    order: Order;
    productId: number;
    product: Product;
    quantity: number;
    price: number;
    subtotal: number;
    createdAt: Date;
    updatedAt: Date;
}
