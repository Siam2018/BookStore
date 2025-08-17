import { CustomerService } from './customer.service';
import { MailService } from '../Mail/mail.service';
import { CustomerDto, UpdateCustomerStatusDto } from './customer.dto';
export declare class CustomerController {
    private readonly customerService;
    private readonly mailService;
    constructor(customerService: CustomerService, mailService: MailService);
    findAll(): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    addCustomer(customerData: CustomerDto): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    updateCustomerStatus(id: number, statusData: UpdateCustomerStatusDto, req: any): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    getInactiveCustomers(): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    getActiveCustomers(): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    getCustomersOlderThan(minAge: number): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    getCustomersByAge(minAge: number, maxAge?: string): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    getCustomersByCity(city: string): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    getCustomersByGender(gender: string): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    searchCustomersByName(searchTerm: string): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity[];
        status: string;
    }>;
    toggleCustomerStatus(id: number, req: any): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    updateCustomer(id: number, updateData: Partial<CustomerDto>, req: any): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    deleteCustomer(id: number, req: any): Promise<{
        message: string;
        status: string;
    }>;
    uploadImage(id: number, file: Express.Multer.File, req: any): Promise<{
        message: string;
        status: string;
        data?: undefined;
        imageURL?: undefined;
    } | {
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
        imageURL: string;
    }>;
    getCustomerImage(id: number, res: any): Promise<any>;
}
