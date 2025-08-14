import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderDto } from './order.dto';
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    findAll(): Promise<OrderEntity[]>;
    findOne(id: number): Promise<OrderEntity>;
    create(dto: OrderDto): Promise<OrderEntity>;
    update(id: number, dto: Partial<OrderDto>): Promise<OrderEntity>;
    calculateOrderTotal(orderId: number): Promise<number>;
    remove(id: number): Promise<void>;
}
