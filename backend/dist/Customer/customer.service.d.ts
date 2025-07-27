export declare class CustomerService {
    getCustomer(): string;
    getCustomerById(customerId: number): string;
    addCustomer(customerDto: any): string;
    updateCustomer(id: number, updateData: any): string;
    deleteCustomer(id: number): string;
}
