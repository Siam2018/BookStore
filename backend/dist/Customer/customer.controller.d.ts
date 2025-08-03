import { CustomerService } from './customer.service';
import { CustomerDto, UpdateCustomerStatusDto } from './customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
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
    updateCustomerStatus(id: number, statusData: UpdateCustomerStatusDto): Promise<{
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
    toggleCustomerStatus(id: number): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    updateCustomer(id: number, updateData: Partial<CustomerDto>): Promise<{
        message: string;
        data: import("./customer.entity").CustomerEntity;
        status: string;
    }>;
    deleteCustomer(id: number): Promise<{
        message: string;
        status: string;
    }>;
    uploadFile(file: Express.Multer.File): {
        message: string;
        data: string;
        status: string;
    };
    getFile(filename: string, res: any): void;
}
