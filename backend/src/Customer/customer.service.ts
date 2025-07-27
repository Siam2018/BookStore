import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {
  getCustomer(): string {
    return "Hello Customer!";
  }

  getCustomerById(customerId: number): string {
    return `Customer ID: ${customerId}`;
  }

  addCustomer(customerDto: any): any {
    // Simulate adding customer and return structured data
    const newCustomer = {
      id: Math.floor(Math.random() * 1000) + 1, // Mock ID generation
      name: customerDto.name,
      email: customerDto.email,
      phone: customerDto.phone || null,
      imageURL: customerDto.imageURL || null,
      address: customerDto.address || null,
      city: customerDto.city || null,
      postalCode: customerDto.postalCode || null,
      country: customerDto.country || null,
      dateOfBirth: customerDto.dateOfBirth || null,
      gender: customerDto.gender || null,
      isActive: customerDto.isActive !== undefined ? customerDto.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newCustomer;
  }

  updateCustomer(id: number, updateData: any): string {
    return `Customer ${id} updated with details: ${JSON.stringify(updateData)}`;
  }

  deleteCustomer(id: number): string {
    return `Customer ${id} deleted`;
  }
}