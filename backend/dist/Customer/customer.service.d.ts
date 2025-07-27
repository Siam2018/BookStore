export declare class CustomerService {
    getCustomer(): string;
    getCustomerById(customerId: number): string;
    addCustomer(customerDto: any): any;
    updateCustomer(id: number, updateData: any): string;
    deleteCustomer(id: number): string;
}
