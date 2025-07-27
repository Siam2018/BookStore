import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    findAll(): {
        message: string;
        data: never[];
        status: string;
    };
    findOne(id: number): {
        message: string;
        data: string;
        status: string;
    };
    addCustomer(customerData: CustomerDto): {
        message: string;
        data: string;
        status: string;
    };
    updateCustomer(id: number, updateData: Partial<CustomerDto>): {
        message: string;
        data: string;
        status: string;
    };
    deleteCustomer(id: number): {
        message: string;
        data: string;
        status: string;
    };
    uploadFile(file: Express.Multer.File): {
        message: string;
        data: string;
        status: string;
    };
    getFile(filename: any, res: any): void;
}
