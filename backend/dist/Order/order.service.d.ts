import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderDto } from './order.dto';
import { OrderItemService } from '../OrderItem/orderItem.service';
export declare class OrderService {
    private readonly orderRepository;
    readonly orderItemService: OrderItemService;
    private readonly configService;
    private pusher;
    constructor(orderRepository: Repository<OrderEntity>, orderItemService: OrderItemService, configService: ConfigService);
    findAll(customerId?: number): Promise<OrderEntity[]>;
    findOne(id: number, customerId?: number): Promise<OrderEntity>;
    create(dto: OrderDto): Promise<OrderEntity>;
    update(id: number, dto: Partial<OrderDto>): Promise<OrderEntity>;
    calculateOrderTotal(orderId: number): Promise<number>;
    remove(id: number): Promise<void>;
}
