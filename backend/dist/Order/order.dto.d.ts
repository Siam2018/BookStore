import { OrderItemDto } from '../OrderItem/orderItem.dto';
export declare class OrderDto {
    id?: number;
    customerId?: number;
    orderItems?: OrderItemDto[];
    total?: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}
