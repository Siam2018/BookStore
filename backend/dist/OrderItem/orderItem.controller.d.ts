import { OrderItemService } from './orderItem.service';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItemResponseDto } from './orderItem.dto';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItemResponseDto>;
    findAll(): Promise<OrderItemResponseDto[]>;
    findOne(id: number): Promise<OrderItemResponseDto>;
    findByOrderId(orderId: number): Promise<OrderItemResponseDto[]>;
    findByProductId(productId: number): Promise<OrderItemResponseDto[]>;
    getTotalByOrderId(orderId: number): Promise<{
        total: number;
    }>;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItemResponseDto>;
    remove(id: number): Promise<void>;
    removeByOrderId(orderId: number): Promise<void>;
}
