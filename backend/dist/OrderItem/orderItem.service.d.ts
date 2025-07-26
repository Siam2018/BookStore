import { Repository } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItemResponseDto } from './orderItem.dto';
export declare class OrderItemService {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
    create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItemResponseDto>;
    findAll(): Promise<OrderItemResponseDto[]>;
    findOne(id: number): Promise<OrderItemResponseDto>;
    findByOrderId(orderId: number): Promise<OrderItemResponseDto[]>;
    findByProductId(productId: number): Promise<OrderItemResponseDto[]>;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItemResponseDto>;
    remove(id: number): Promise<void>;
    removeByOrderId(orderId: number): Promise<void>;
    getTotalByOrderId(orderId: number): Promise<number>;
    private mapToResponseDto;
}
