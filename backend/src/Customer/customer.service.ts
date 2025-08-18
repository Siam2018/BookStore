import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomerDto, UpdateCustomerStatusDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  // Find customer by email (for authentication)
  async findByEmail(email: string): Promise<CustomerEntity | null> {
    try {
      return await this.customerRepository.findOne({ where: { email } });
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to find customer by email',
        error.status || 500
      );
    }
  }

  // Get customer image path by ID
  async getCustomerImagePath(id: number): Promise<string | null> {
    try {
      const customer = await this.getCustomerById(id);
      return customer.imageURL || null;
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to get customer image path',
        error.status || 500
      );
    }
  }

  // Create a customer (includes User Category 1 Operation 1: Create a user)
  async addCustomer(customerDto: CustomerDto): Promise<CustomerEntity> {
    try {
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(customerDto.password, saltRounds);
      const customer = this.customerRepository.create({ ...customerDto, password: hashedPassword });
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to add customer',
        error.status || 500
      );
    }
  }

  // Get all customers
  async getAllCustomers(): Promise<CustomerEntity[]> {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to get all customers',
        error.status || 500
      );
    }
  }

  // Get customer by ID
  async getCustomerById(id: number): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.findOneBy({ id: id });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return customer;
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to get customer by ID',
        error.status || 500
      );
    }
  }

  // User Category 1 Operation 2: Change the status of a user to either 'active' or 'inactive'
  async updateCustomerStatus(id: number, statusDto: UpdateCustomerStatusDto): Promise<CustomerEntity> {
    try {
      const customer = await this.getCustomerById(id);
      customer.status = statusDto.status;
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to update customer status',
        error.status || 500
      );
    }
  }

  // User Category 1 Operation 3: Retrieve a list of users based on their 'inactive' status
  async getInactiveCustomers(): Promise<CustomerEntity[]> {
    try {
      return await this.customerRepository.find({ 
        where: { status: 'inactive' } 
      });
    } catch (error) {
      throw new (error.constructor || require('@nestjs/common').HttpException)(
        error.message || 'Failed to get inactive customers',
        error.status || 500
      );
    }
  }

  // User Category 1 Operation 4: Get a list of users older than specified age
  async getCustomersOlderThan(minAge: number): Promise<CustomerEntity[]> {
    const currentDate = new Date();
    const cutoffDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
    
    return await this.customerRepository.createQueryBuilder('customer')
      .where('customer.dateOfBirth < :date', { date: cutoffDate })
      .andWhere('customer.dateOfBirth IS NOT NULL')
      .getMany();
  }

  // Keep the original method for backward compatibility
  async getCustomersOlderThan40(): Promise<CustomerEntity[]> {
    return this.getCustomersOlderThan(40);
  }

  // Additional useful methods for comprehensive functionality
  async getActiveCustomers(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find({ 
      where: { status: 'active' } 
    });
  }

  async getCustomersByAge(minAge: number, maxAge?: number): Promise<CustomerEntity[]> {
    const currentDate = new Date();
    const minBirthDate = new Date(currentDate.getFullYear() - (maxAge || 150), currentDate.getMonth(), currentDate.getDate());
    const maxBirthDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
    
    const query = this.customerRepository.createQueryBuilder('customer')
      .where('customer.dateOfBirth IS NOT NULL')
      .andWhere('customer.dateOfBirth <= :maxBirthDate', { maxBirthDate })
      .andWhere('customer.dateOfBirth >= :minBirthDate', { minBirthDate });
    
    return await query.getMany();
  }

  async getCustomersByCity(city: string): Promise<CustomerEntity[]> {
    return await this.customerRepository.find({ 
      where: { city } 
    });
  }

  async getCustomersByGender(gender: string): Promise<CustomerEntity[]> {
    return await this.customerRepository.find({ 
      where: { gender } 
    });
  }

  async searchCustomersByName(searchTerm: string): Promise<CustomerEntity[]> {
    return await this.customerRepository.createQueryBuilder('customer')
      .where('customer.fullName ILIKE :searchTerm', 
        { searchTerm: `%${searchTerm}%` })
      .getMany();
  }

  // Update customer (general)
  async updateCustomer(id: number, updateData: Partial<CustomerDto>): Promise<CustomerEntity> {
    await this.customerRepository.update(id, updateData);
    const updatedCustomer = await this.customerRepository.findOneBy({ id: id });
    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found after update`);
    }
    return updatedCustomer;
  }

  // Update customer image
  async updateCustomerImage(id: number, imageURL: string): Promise<CustomerEntity> {
    const customer = await this.getCustomerById(id);
    customer.imageURL = imageURL;
    return await this.customerRepository.save(customer);
  }

  // Delete customer
  async deleteCustomer(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  // Toggle customer status between active/inactive (User Category 1 convenience method)
  async toggleCustomerStatus(id: number): Promise<CustomerEntity> {
    const customer = await this.getCustomerById(id);
    customer.status = customer.status === 'active' ? 'inactive' : 'active';
    return await this.customerRepository.save(customer);
  }

  // Helper method to calculate age from date of birth
  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}