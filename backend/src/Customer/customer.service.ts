import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {
  getCustomer(): string {
    return "Hello Customer!";
  }
  getCustomerById(customerId: number): string {
    return `Customer ID: ${customerId}`;
  }
  createCustomer(): string {
  return "Customer created successfully!";
  }
  addCustomer(customerDto: any): string {
      return `Customer added with name: ${customerDto.name}, email: ${customerDto.email}`;
  }
}