import { Repository } from 'typeorm';
import { ProductEntity } from '../Products/product.entity';
import { OrderItemDto } from './orderItem.dto';
import { OrderItem } from './orderItem.entity';
import { OrderService } from '../Order/order.service';
export declare class OrderItemService {
    private readonly orderItemRepository;
    private readonly productRepository;
    private readonly orderService;
    constructor(orderItemRepository: Repository<OrderItem>, productRepository: Repository<ProductEntity>, orderService: OrderService);
    checkProductStock(productId: number, quantity: number): Promise<void>;
    findAll(): Promise<OrderItem[]>;
    findOne(id: number): Promise<OrderItem>;
    create(dto: OrderItemDto): Promise<OrderItem>;
    createMany(dtos: OrderItemDto[]): Promise<OrderItem[]>;
    update(id: number, dto: Partial<OrderItemDto>): Promise<OrderItem>;
    remove(id: number): Promise<void>;
    createOrderItem(orderItemDto: OrderItemDto): Promise<OrderItem>;
    createOrderItemsBatch(orderItemsDto: OrderItemDto[]): Promise<OrderItem[]>;
    restoreStock(orderItemId: number): Promise<void>;
}
