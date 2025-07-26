import { Customer } from '../Customer/customer.entity';
import { OrderItem } from '../OrderItem/orderItem.entity';
export declare class Order {
    id: number;
    customerId: number;
    customer: Customer;
    orderItems: OrderItem[];
    totalAmount: number;
    status: string;
    orderDate: Date;
    updatedAt: Date;
}
