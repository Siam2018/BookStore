"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async findByEmail(email) {
        try {
            return await this.customerRepository.findOne({ where: { email } });
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to find customer by email', error.status || 500);
        }
    }
    async getCustomerImagePath(id) {
        try {
            const customer = await this.getCustomerById(id);
            return customer.imageURL || null;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get customer image path', error.status || 500);
        }
    }
    async addCustomer(customerDto) {
        try {
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(customerDto.password, saltRounds);
            const customer = this.customerRepository.create({ ...customerDto, password: hashedPassword });
            return await this.customerRepository.save(customer);
        }
        catch (error) {
            if (error.code === '23505' && error.detail?.includes('email')) {
                throw new (require('@nestjs/common').BadRequestException)('Email already exists');
            }
            if (error.code === 'ER_DUP_ENTRY' && error.message?.includes('email')) {
                throw new (require('@nestjs/common').BadRequestException)('Email already exists');
            }
            if (error.message?.toLowerCase().includes('duplicate') && error.message?.toLowerCase().includes('email')) {
                throw new (require('@nestjs/common').BadRequestException)('Email already exists');
            }
            if (error.message?.toLowerCase().includes('not null') && error.message?.toLowerCase().includes('full name')) {
                throw new (require('@nestjs/common').BadRequestException)('Full name is required');
            }
            if (error.message?.toLowerCase().includes('not null') && error.message?.toLowerCase().includes('email')) {
                throw new (require('@nestjs/common').BadRequestException)('Email is required');
            }
            if (error.message?.toLowerCase().includes('not null') && error.message?.toLowerCase().includes('password')) {
                throw new (require('@nestjs/common').BadRequestException)('Password is required');
            }
            if (error.message?.toLowerCase().includes('invalid input syntax for type date')) {
                throw new (require('@nestjs/common').BadRequestException)('Date of birth must be a valid date (YYYY-MM-DD)');
            }
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to add customer', error.status || 500);
        }
    }
    async getAllCustomers() {
        try {
            return await this.customerRepository.find();
        }
        catch (error) {
            if (error.message?.toLowerCase().includes('not found')) {
                throw new (require('@nestjs/common').NotFoundException)('No customers found');
            }
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get all customers', error.status || 500);
        }
    }
    async getCustomerById(id) {
        try {
            const customer = await this.customerRepository.findOneBy({ id: id });
            if (!customer) {
                throw new (require('@nestjs/common').NotFoundException)(`Customer with ID ${id} not found`);
            }
            return customer;
        }
        catch (error) {
            if (error.message?.toLowerCase().includes('not found')) {
                throw new (require('@nestjs/common').NotFoundException)(`Customer with ID ${id} not found`);
            }
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get customer by ID', error.status || 500);
        }
    }
    async updateCustomerStatus(id, statusDto) {
        try {
            const customer = await this.getCustomerById(id);
            customer.status = statusDto.status;
            return await this.customerRepository.save(customer);
        }
        catch (error) {
            if (error.message?.toLowerCase().includes('not found')) {
                throw new (require('@nestjs/common').NotFoundException)(`Customer with ID ${id} not found`);
            }
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to update customer status', error.status || 500);
        }
    }
    async getInactiveCustomers() {
        try {
            return await this.customerRepository.find({
                where: { status: 'inactive' }
            });
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get inactive customers', error.status || 500);
        }
    }
    async getCustomersOlderThan(minAge) {
        try {
            const currentDate = new Date();
            const cutoffDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
            return await this.customerRepository.createQueryBuilder('customer')
                .where('customer.dateOfBirth < :date', { date: cutoffDate })
                .andWhere('customer.dateOfBirth IS NOT NULL')
                .getMany();
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get customers older than specified age', error.status || 500);
        }
    }
    async getCustomersOlderThan40() {
        return this.getCustomersOlderThan(40);
    }
    async getActiveCustomers() {
        return await this.customerRepository.find({
            where: { status: 'active' }
        });
    }
    async getCustomersByAge(minAge, maxAge) {
        const currentDate = new Date();
        const minBirthDate = new Date(currentDate.getFullYear() - (maxAge || 150), currentDate.getMonth(), currentDate.getDate());
        const maxBirthDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
        const query = this.customerRepository.createQueryBuilder('customer')
            .where('customer.dateOfBirth IS NOT NULL')
            .andWhere('customer.dateOfBirth <= :maxBirthDate', { maxBirthDate })
            .andWhere('customer.dateOfBirth >= :minBirthDate', { minBirthDate });
        return await query.getMany();
    }
    async getCustomersByCity(city) {
        try {
            return await this.customerRepository.find({
                where: { city }
            });
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to get customers from city: ${city}`, error.status || 500);
        }
    }
    async getCustomersByGender(gender) {
        try {
            return await this.customerRepository.find({
                where: { gender }
            });
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to get customers by gender: ${gender}`, error.status || 500);
        }
    }
    async searchCustomersByName(searchTerm) {
        try {
            return await this.customerRepository.createQueryBuilder('customer')
                .where('customer.fullName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                .getMany();
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to search customers by name: ${searchTerm}`, error.status || 500);
        }
    }
    async updateCustomer(id, updateData) {
        try {
            if (updateData.password) {
                const bcrypt = require('bcrypt');
                const saltRounds = 10;
                updateData.password = await bcrypt.hash(updateData.password, saltRounds);
            }
            await this.customerRepository.update(id, updateData);
            const updatedCustomer = await this.customerRepository.findOneBy({ id: id });
            if (!updatedCustomer) {
                throw new (require('@nestjs/common').NotFoundException)(`Customer with ID ${id} not found after update`);
            }
            if (updatedCustomer) {
                updatedCustomer.password = '';
            }
            return updatedCustomer;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to update customer with ID ${id}`, error.status || 500);
        }
    }
    async updateCustomerImage(id, imageURL) {
        try {
            const customer = await this.getCustomerById(id);
            customer.imageURL = imageURL;
            return await this.customerRepository.save(customer);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to update image for customer with ID ${id}`, error.status || 500);
        }
    }
    async deleteCustomer(id) {
        try {
            await this.customerRepository.delete(id);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to delete customer with ID ${id}`, error.status || 500);
        }
    }
    async toggleCustomerStatus(id) {
        try {
            const customer = await this.getCustomerById(id);
            customer.status = customer.status === 'active' ? 'inactive' : 'active';
            return await this.customerRepository.save(customer);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || `Failed to toggle status for customer with ID ${id}`, error.status || 500);
        }
    }
    calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map