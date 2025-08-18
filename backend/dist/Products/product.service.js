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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getProductImagePath(id) {
        try {
            const product = await this.getProductById(id);
            return product.imageURL || null;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get product image path', error.status || 500);
        }
    }
    async addProduct(productDto) {
        try {
            const product = this.productRepository.create(productDto);
            return await this.productRepository.save(product);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to add product', error.status || 500);
        }
    }
    async getAllProducts() {
        try {
            return await this.productRepository.find();
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get all products', error.status || 500);
        }
    }
    async getProductById(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get product by ID', error.status || 500);
        }
    }
    async updateProduct(id, updateData) {
        try {
            await this.productRepository.update(id, updateData);
            return this.getProductById(id);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to update product', error.status || 500);
        }
    }
    async deleteProduct(id) {
        try {
            const result = await this.productRepository.delete(id);
            return !!result.affected;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to delete product', error.status || 500);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map