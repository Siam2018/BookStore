"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
let CustomerService = class CustomerService {
    getCustomer() {
        return "Hello Customer!";
    }
    getCustomerById(customerId) {
        return `Customer ID: ${customerId}`;
    }
    addCustomer(customerDto) {
        const newCustomer = {
            id: Math.floor(Math.random() * 1000) + 1,
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
    updateCustomer(id, updateData) {
        return `Customer ${id} updated with details: ${JSON.stringify(updateData)}`;
    }
    deleteCustomer(id) {
        return `Customer ${id} deleted`;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)()
], CustomerService);
//# sourceMappingURL=customer.service.js.map