import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomerDto, UpdateCustomerStatusDto } from './customer.dto';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<CustomerEntity>);
    getCustomerImagePath(id: number): Promise<string | null>;
    addCustomer(customerDto: CustomerDto): Promise<CustomerEntity>;
    getAllCustomers(): Promise<CustomerEntity[]>;
    getCustomerById(id: number): Promise<CustomerEntity>;
    updateCustomerStatus(id: number, statusDto: UpdateCustomerStatusDto): Promise<CustomerEntity>;
    getInactiveCustomers(): Promise<CustomerEntity[]>;
    getCustomersOlderThan(minAge: number): Promise<CustomerEntity[]>;
    getCustomersOlderThan40(): Promise<CustomerEntity[]>;
    getActiveCustomers(): Promise<CustomerEntity[]>;
    getCustomersByAge(minAge: number, maxAge?: number): Promise<CustomerEntity[]>;
    getCustomersByCity(city: string): Promise<CustomerEntity[]>;
    getCustomersByGender(gender: string): Promise<CustomerEntity[]>;
    searchCustomersByName(searchTerm: string): Promise<CustomerEntity[]>;
    updateCustomer(id: number, updateData: Partial<CustomerDto>): Promise<CustomerEntity>;
    updateCustomerImage(id: number, imageURL: string): Promise<CustomerEntity>;
    deleteCustomer(id: number): Promise<void>;
    toggleCustomerStatus(id: number): Promise<CustomerEntity>;
    calculateAge(dateOfBirth: Date): number;
}
