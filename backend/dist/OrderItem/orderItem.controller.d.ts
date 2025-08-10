import { OrderItemService } from './orderItem.service';
import { OrderItemDto } from './orderItem.dto';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    findAll(): Promise<{
        message: string;
        data: import("./orderItem.entity").OrderItem[];
        status: string;
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./orderItem.entity").OrderItem;
        status: string;
    }>;
    create(dto: OrderItemDto): Promise<{
        message: string;
        data: import("./orderItem.entity").OrderItem;
        status: string;
    }>;
    update(id: number, dto: OrderItemDto): Promise<{
        message: string;
        data: import("./orderItem.entity").OrderItem;
        status: string;
    }>;
    patch(id: number, dto: Partial<OrderItemDto>): Promise<{
        message: string;
        data: import("./orderItem.entity").OrderItem;
        status: string;
    }>;
    remove(id: number): Promise<{
        message: string;
        status: string;
    }>;
}
