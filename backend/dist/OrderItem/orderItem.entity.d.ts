import { OrderEntity } from '../Order/order.entity';
import { ProductEntity } from '../Products/product.entity';
export declare class OrderItem {
    id: number;
    orderId: number;
    order: OrderEntity;
    productId: number;
    product: ProductEntity;
    quantity: number;
    price: number;
    subtotal: number;
    createdAt: Date;
    updatedAt: Date;
}
