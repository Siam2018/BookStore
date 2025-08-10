import { CustomerEntity } from '../Customer/customer.entity';
import { OrderItem } from '../OrderItem/orderItem.entity';
export declare class OrderEntity {
    id: number;
    customerId: number;
    customer: CustomerEntity;
    orderItems: OrderItem[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
