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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const orderItem_service_1 = require("../OrderItem/orderItem.service");
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});
let OrderService = class OrderService {
    orderRepository;
    orderItemService;
    configService;
    pusher;
    constructor(orderRepository, orderItemService, configService) {
        this.orderRepository = orderRepository;
        this.orderItemService = orderItemService;
        this.configService = configService;
        const Pusher = require('pusher');
        this.pusher = new Pusher({
            appId: this.configService.get('PUSHER_APP_ID'),
            key: this.configService.get('PUSHER_KEY'),
            secret: this.configService.get('PUSHER_SECRET'),
            cluster: this.configService.get('PUSHER_CLUSTER'),
            useTLS: true,
        });
    }
    async findAll(customerId) {
        return await this.orderRepository.find({ where: { customerId }, relations: ['orderItems', 'customer'] });
    }
    async findOne(id, customerId) {
        const order = await this.orderRepository.findOne({ where: { id, customerId }, relations: ['orderItems', 'customer'] });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async create(dto) {
        try {
            let { customerId, status, orderItems } = dto;
            if (orderItems && Array.isArray(orderItems) && orderItems.length > 0) {
                for (const item of orderItems) {
                    await this.orderItemService.checkProductStock(item.productId, item.quantity);
                }
            }
            const order = this.orderRepository.create({ customerId, status, total: 0 });
            const savedOrder = await this.orderRepository.save(order);
            if (orderItems && Array.isArray(orderItems) && orderItems.length > 0) {
                const itemsWithOrderId = orderItems.map(item => ({ ...item, orderId: savedOrder.id }));
                if (this['orderItemService']) {
                    await this['orderItemService'].createMany(itemsWithOrderId);
                }
                else {
                    throw new Error('OrderItemService not injected');
                }
            }
            savedOrder.total = await this.calculateOrderTotal(savedOrder.id);
            if (savedOrder.status === 'pending') {
                await this.pusher.trigger('orders', 'pending-order', { orderId: savedOrder.id });
            }
            return this.orderRepository.save(savedOrder);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').BadRequestException)(error.message || 'Failed to create order', error.status || 400);
        }
    }
    async update(id, dto) {
        try {
            const order = await this.findOne(id);
            const { customerId, status } = dto;
            if (customerId !== undefined)
                order.customerId = customerId;
            if (status !== undefined)
                order.status = status;
            order.total = await this.calculateOrderTotal(order.id);
            return this.orderRepository.save(order);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to update order', error.status || 500);
        }
    }
    async calculateOrderTotal(orderId) {
        try {
            const order = await this.orderRepository.findOne({ where: { id: orderId }, relations: ['orderItems'] });
            if (!order || !order.orderItems)
                return 0;
            return order.orderItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to calculate order total', error.status || 500);
        }
    }
    async remove(id) {
        try {
            const order = await this.findOne(id);
            await this.orderRepository.remove(order);
        }
        catch (error) {
            throw new (error.constructor || require('@nestjs/common').HttpException)(error.message || 'Failed to delete order', error.status || 500);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => orderItem_service_1.OrderItemService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        orderItem_service_1.OrderItemService,
        config_1.ConfigService])
], OrderService);
//# sourceMappingURL=order.service.js.map