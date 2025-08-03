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
    async addCustomer(customerDto) {
        const customer = this.customerRepository.create(customerDto);
        return await this.customerRepository.save(customer);
    }
    async getAllCustomers() {
        return await this.customerRepository.find();
    }
    async getCustomerById(id) {
        const customer = await this.customerRepository.findOneBy({ id: id });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
    async updateCustomerStatus(id, statusDto) {
        const customer = await this.getCustomerById(id);
        customer.status = statusDto.status;
        return await this.customerRepository.save(customer);
    }
    async getInactiveCustomers() {
        return await this.customerRepository.find({
            where: { status: 'inactive' }
        });
    }
    async getCustomersOlderThan(minAge) {
        const currentDate = new Date();
        const cutoffDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
        return await this.customerRepository.createQueryBuilder('customer')
            .where('customer.dateOfBirth < :date', { date: cutoffDate })
            .andWhere('customer.dateOfBirth IS NOT NULL')
            .getMany();
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
        return await this.customerRepository.find({
            where: { city }
        });
    }
    async getCustomersByGender(gender) {
        return await this.customerRepository.find({
            where: { gender }
        });
    }
    async searchCustomersByName(searchTerm) {
        return await this.customerRepository.createQueryBuilder('customer')
            .where('customer.fullName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
            .getMany();
    }
    async updateCustomer(id, updateData) {
        await this.customerRepository.update(id, updateData);
        const updatedCustomer = await this.customerRepository.findOneBy({ id: id });
        if (!updatedCustomer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found after update`);
        }
        return updatedCustomer;
    }
    async deleteCustomer(id) {
        await this.customerRepository.delete(id);
    }
    async toggleCustomerStatus(id) {
        const customer = await this.getCustomerById(id);
        customer.status = customer.status === 'active' ? 'inactive' : 'active';
        return await this.customerRepository.save(customer);
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