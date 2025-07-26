import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(): string;
    findOne(id: string): string;
    addCustomer(customerData: CustomerDto): string;
    uploadFile(file: Express.Multer.File): string;
    getFile(filename: any, res: any): void;
}
