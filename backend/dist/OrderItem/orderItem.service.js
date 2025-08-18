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
exports.OrderItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../Products/product.entity");
const orderItem_entity_1 = require("./orderItem.entity");
const order_service_1 = require("../Order/order.service");
let OrderItemService = class OrderItemService {
    orderItemRepository;
    productRepository;
    orderService;
    constructor(orderItemRepository, productRepository, orderService) {
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.orderService = orderService;
    }
    async findAll() {
        try {
            return await this.orderItemRepository.find();
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get all order items', error.status || 500);
        }
    }
    async findOne(id) {
        try {
            const item = await this.orderItemRepository.findOne({ where: { id } });
            if (!item) {
                throw new common_1.NotFoundException('Order item not found');
            }
            return item;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to get order item', error.status || 500);
        }
    }
    async create(dto) {
        try {
            const item = await this.createOrderItem(dto);
            if (item.orderId) {
                await this.orderService.update(item.orderId, {});
            }
            return item;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to create order item', error.status || 500);
        }
    }
    async createMany(dtos) {
        try {
            const items = await this.createOrderItemsBatch(dtos);
            if (items.length && items[0].orderId) {
                await this.orderService.update(items[0].orderId, {});
            }
            return items;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to create order items', error.status || 500);
        }
    }
    async update(id, dto) {
        try {
            const item = await this.orderItemRepository.findOne({ where: { id } });
            if (!item) {
                throw new common_1.NotFoundException('Order item not found');
            }
            Object.assign(item, dto);
            const saved = await this.orderItemRepository.save(item);
            if (saved.orderId) {
                await this.orderService.update(saved.orderId, {});
            }
            return saved;
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to update order item', error.status || 500);
        }
    }
    async remove(id) {
        const item = await this.orderItemRepository.findOne({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException('Order item not found');
        }
        const orderId = item.orderId;
        await this.orderItemRepository.remove(item);
        if (orderId) {
            await this.orderService.update(orderId, {});
        }
    }
    async createOrderItem(orderItemDto) {
        const product = await this.productRepository.findOne({ where: { id: orderItemDto.productId } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.stock < orderItemDto.quantity) {
            throw new common_1.NotFoundException('Not enough stock');
        }
        product.stock -= orderItemDto.quantity;
        await this.productRepository.save(product);
        const orderItem = this.orderItemRepository.create({
            ...orderItemDto,
            price: product.price,
            subtotal: product.price * orderItemDto.quantity,
        });
        return this.orderItemRepository.save(orderItem);
    }
    async createOrderItemsBatch(orderItemsDto) {
        const createdOrderItems = [];
        for (const itemDto of orderItemsDto) {
            const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
            if (!product) {
                throw new common_1.NotFoundException(`Product with id ${itemDto.productId} not found`);
            }
            if (product.stock < itemDto.quantity) {
                throw new common_1.NotFoundException(`Not enough stock for product ${product.name}`);
            }
            product.stock -= itemDto.quantity;
            await this.productRepository.save(product);
            const orderItem = this.orderItemRepository.create({
                ...itemDto,
                price: product.price,
                subtotal: product.price * itemDto.quantity,
            });
            createdOrderItems.push(await this.orderItemRepository.save(orderItem));
        }
        return createdOrderItems;
    }
    async restoreStock(orderItemId) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id: orderItemId }, relations: ['product'] });
        if (!orderItem) {
            throw new common_1.NotFoundException('Order item not found');
        }
        const product = await this.productRepository.findOne({ where: { id: orderItem.productId } });
        if (product) {
            product.stock += orderItem.quantity;
            await this.productRepository.save(product);
        }
    }
};
exports.OrderItemService = OrderItemService;
exports.OrderItemService = OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItem)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        order_service_1.OrderService])
], OrderItemService);
//# sourceMappingURL=orderItem.service.js.map