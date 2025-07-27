import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {
  getCustomer(): string {
    return "Hello Customer!";
  }

  getCustomerById(customerId: number): string {
    return `Customer ID: ${customerId}`;
  }

  addCustomer(customerDto: any): string {
    return `Customer added with name: ${customerDto.name}, email: ${customerDto.email}`;
  }

  updateCustomer(id: number, updateData: any): string {
    return `Customer ${id} updated with details: ${JSON.stringify(updateData)}`;
  }

  deleteCustomer(id: number): string {
    return `Customer ${id} deleted`;
  }
}