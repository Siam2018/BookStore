import { Repository } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { OrderItemDto } from './orderItem.dto';
export declare class OrderItemService {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
    findAll(): Promise<OrderItem[]>;
    findOne(id: number): Promise<OrderItem>;
    create(dto: OrderItemDto): Promise<OrderItem>;
    update(id: number, dto: Partial<OrderItemDto>): Promise<OrderItem>;
    remove(id: number): Promise<void>;
}
