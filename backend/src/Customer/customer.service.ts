import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async addCustomer(customerDto: CustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(customerDto);
    return this.customerRepository.save(customer);
  }

  async updateCustomer(id: number, updateData: Partial<CustomerDto>): Promise<Customer | null> {
    await this.customerRepository.update(id, updateData);
    return this.getCustomerById(id);
  }

  async deleteCustomer(id: number): Promise<boolean> {
    const result = await this.customerRepository.delete(id);
    return result.affected > 0;
  }
}