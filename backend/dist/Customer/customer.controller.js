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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const jwt_auth_guard_1 = require("../Auth/jwt-auth.guard");
const file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
const customer_dto_1 = require("./customer.dto");
const multer_1 = require("multer");
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    async findAll() {
        const customers = await this.customerService.getAllCustomers();
        return {
            message: 'Get all customers',
            data: customers,
            status: 'success'
        };
    }
    async findOne(id) {
        const customer = await this.customerService.getCustomerById(id);
        return {
            message: `Get customer with ID: ${id}`,
            data: customer,
            status: 'success'
        };
    }
    async addCustomer(customerData) {
        const newCustomer = await this.customerService.addCustomer(customerData);
        return {
            message: 'Customer added successfully',
            data: newCustomer,
            status: 'success'
        };
    }
    async updateCustomerStatus(id, statusData) {
        const updatedCustomer = await this.customerService.updateCustomerStatus(id, statusData);
        return {
            message: 'Customer status updated successfully',
            data: updatedCustomer,
            status: 'success'
        };
    }
    async getInactiveCustomers() {
        const inactiveCustomers = await this.customerService.getInactiveCustomers();
        return {
            message: 'Retrieved inactive customers',
            data: inactiveCustomers,
            status: 'success'
        };
    }
    async getActiveCustomers() {
        const activeCustomers = await this.customerService.getActiveCustomers();
        return {
            message: 'Retrieved active customers',
            data: activeCustomers,
            status: 'success'
        };
    }
    async getCustomersOlderThan(minAge) {
        const customers = await this.customerService.getCustomersOlderThan(minAge);
        return {
            message: `Retrieved customers older than ${minAge}`,
            data: customers,
            status: 'success'
        };
    }
    async getCustomersByAge(minAge, maxAge) {
        const customers = await this.customerService.getCustomersByAge(minAge, maxAge ? parseInt(maxAge) : undefined);
        return {
            message: `Retrieved customers by age range`,
            data: customers,
            status: 'success'
        };
    }
    async getCustomersByCity(city) {
        const customers = await this.customerService.getCustomersByCity(city);
        return {
            message: `Retrieved customers from city: ${city}`,
            data: customers,
            status: 'success'
        };
    }
    async getCustomersByGender(gender) {
        const customers = await this.customerService.getCustomersByGender(gender);
        return {
            message: `Retrieved customers by gender: ${gender}`,
            data: customers,
            status: 'success'
        };
    }
    async searchCustomersByName(searchTerm) {
        const customers = await this.customerService.searchCustomersByName(searchTerm);
        return {
            message: `Search results for: ${searchTerm}`,
            data: customers,
            status: 'success'
        };
    }
    async toggleCustomerStatus(id) {
        const customer = await this.customerService.toggleCustomerStatus(id);
        return {
            message: 'Customer status toggled successfully',
            data: customer,
            status: 'success'
        };
    }
    async updateCustomer(id, updateData) {
        const updatedCustomer = await this.customerService.updateCustomer(id, updateData);
        return {
            message: 'Customer updated successfully',
            data: updatedCustomer,
            status: 'success'
        };
    }
    async deleteCustomer(id) {
        await this.customerService.deleteCustomer(id);
        return {
            message: 'Customer deleted successfully',
            status: 'success'
        };
    }
    async uploadImage(id, file) {
        if (!file) {
            return { message: 'No file uploaded', status: 'error' };
        }
        const imageURL = `/uploads/customers/${file.filename}`;
        const updated = await this.customerService.updateCustomerImage(id, imageURL);
        return {
            message: 'Customer image uploaded successfully',
            data: updated,
            status: 'success',
            imageURL,
        };
    }
    async getCustomerImage(id, res) {
        const imagePath = await this.customerService.getCustomerImagePath(id);
        if (!imagePath) {
            return res.status(404).json({ message: 'No image found for this customer.' });
        }
        const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        return res.sendFile(normalizedPath, { root: './' });
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/addcustomer'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addCustomer", null);
__decorate([
    (0, common_1.Put)('/:id/status'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, customer_dto_1.UpdateCustomerStatusDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomerStatus", null);
__decorate([
    (0, common_1.Get)('/status/inactive'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getInactiveCustomers", null);
__decorate([
    (0, common_1.Get)('/status/active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getActiveCustomers", null);
__decorate([
    (0, common_1.Get)('/age/older-than/:minAge'),
    __param(0, (0, common_1.Param)('minAge', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersOlderThan", null);
__decorate([
    (0, common_1.Get)('/age/range'),
    __param(0, (0, common_1.Query)('minAge', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('maxAge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersByAge", null);
__decorate([
    (0, common_1.Get)('/city/:city'),
    __param(0, (0, common_1.Param)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersByCity", null);
__decorate([
    (0, common_1.Get)('/gender/:gender'),
    __param(0, (0, common_1.Param)('gender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomersByGender", null);
__decorate([
    (0, common_1.Get)('/search/:searchTerm'),
    __param(0, (0, common_1.Param)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "searchCustomersByName", null);
__decorate([
    (0, common_1.Put)('/:id/toggle-status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "toggleCustomerStatus", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Patch)('/:id/image'),
    (0, common_1.UseInterceptors)((0, file_interceptor_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/customers',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + '-' + file.originalname);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
                cb(null, true);
            }
            else {
                cb(new Error('Only image files are allowed!'), false);
            }
        },
        limits: { fileSize: 2 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)('/:id/image'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerImage", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map