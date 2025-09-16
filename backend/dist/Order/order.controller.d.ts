import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(body: any, params: any, req: any): Promise<import("./order.entity").OrderEntity[]>;
    findOne(id: string, req: any): Promise<import("./order.entity").OrderEntity>;
    create(dto: OrderDto, req: any): Promise<import("./order.entity").OrderEntity>;
    update(id: string, dto: OrderDto): Promise<import("./order.entity").OrderEntity>;
    patch(id: string, dto: Partial<OrderDto>): Promise<import("./order.entity").OrderEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadFile(file: Express.Multer.File): string;
    getFile(filename: any, res: any): void;
}
