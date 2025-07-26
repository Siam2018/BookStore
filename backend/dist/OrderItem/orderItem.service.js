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
const orderItem_entity_1 = require("./orderItem.entity");
let OrderItemService = class OrderItemService {
    orderItemRepository;
    constructor(orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }
    async create(createOrderItemDto) {
        try {
            if (!createOrderItemDto.subtotal) {
                createOrderItemDto.subtotal = createOrderItemDto.price * createOrderItemDto.quantity;
            }
            const orderItem = this.orderItemRepository.create(createOrderItemDto);
            const savedOrderItem = await this.orderItemRepository.save(orderItem);
            return this.findOne(savedOrderItem.id);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create order item: ' + error.message);
        }
    }
    async findAll() {
        const orderItems = await this.orderItemRepository.find({
            relations: ['product', 'order'],
            order: { createdAt: 'DESC' }
        });
        return orderItems.map(item => this.mapToResponseDto(item));
    }
    async findOne(id) {
        const orderItem = await this.orderItemRepository.findOne({
            where: { id },
            relations: ['product', 'order']
        });
        if (!orderItem) {
            throw new common_1.NotFoundException(`Order item with ID ${id} not found`);
        }
        return this.mapToResponseDto(orderItem);
    }
    async findByOrderId(orderId) {
        const orderItems = await this.orderItemRepository.find({
            where: { orderId },
            relations: ['product'],
            order: { createdAt: 'ASC' }
        });
        return orderItems.map(item => this.mapToResponseDto(item));
    }
    async findByProductId(productId) {
        const orderItems = await this.orderItemRepository.find({
            where: { productId },
            relations: ['product', 'order'],
            order: { createdAt: 'DESC' }
        });
        return orderItems.map(item => this.mapToResponseDto(item));
    }
    async update(id, updateOrderItemDto) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new common_1.NotFoundException(`Order item with ID ${id} not found`);
        }
        if (updateOrderItemDto.quantity || updateOrderItemDto.price) {
            const newQuantity = updateOrderItemDto.quantity || orderItem.quantity;
            const newPrice = updateOrderItemDto.price || orderItem.price;
            updateOrderItemDto.subtotal = newQuantity * newPrice;
        }
        Object.assign(orderItem, updateOrderItemDto);
        await this.orderItemRepository.save(orderItem);
        return this.findOne(id);
    }
    async remove(id) {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new common_1.NotFoundException(`Order item with ID ${id} not found`);
        }
        await this.orderItemRepository.remove(orderItem);
    }
    async removeByOrderId(orderId) {
        await this.orderItemRepository.delete({ orderId });
    }
    async getTotalByOrderId(orderId) {
        const result = await this.orderItemRepository
            .createQueryBuilder('orderItem')
            .select('SUM(orderItem.subtotal)', 'total')
            .where('orderItem.orderId = :orderId', { orderId })
            .getRawOne();
        return parseFloat(result.total) || 0;
    }
    mapToResponseDto(orderItem) {
        return {
            id: orderItem.id,
            orderId: orderItem.orderId,
            productId: orderItem.productId,
            quantity: orderItem.quantity,
            price: orderItem.price,
            subtotal: orderItem.subtotal,
            createdAt: orderItem.createdAt,
            updatedAt: orderItem.updatedAt,
            product: orderItem.product ? {
                id: orderItem.product.id,
                name: orderItem.product.name,
                price: orderItem.product.price
            } : undefined
        };
    }
};
exports.OrderItemService = OrderItemService;
exports.OrderItemService = OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderItemService);
//# sourceMappingURL=orderItem.service.js.map