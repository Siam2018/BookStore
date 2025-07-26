import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): string;
    findOne(orderId: string): string;
    addOrder(orderData: OrderDto): string;
    updateOrder(orderId: string, updateData: OrderDto): string;
    deleteOrder(orderId: string): string;
    uploadFile(file: Express.Multer.File): string;
    getFile(filename: any, res: any): void;
}
