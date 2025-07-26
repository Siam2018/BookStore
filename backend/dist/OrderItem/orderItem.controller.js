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
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const orderItem_service_1 = require("./orderItem.service");
const orderItem_dto_1 = require("./orderItem.dto");
let OrderItemController = class OrderItemController {
    orderItemService;
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    async create(createOrderItemDto) {
        return this.orderItemService.create(createOrderItemDto);
    }
    async findAll() {
        return this.orderItemService.findAll();
    }
    async findOne(id) {
        return this.orderItemService.findOne(id);
    }
    async findByOrderId(orderId) {
        return this.orderItemService.findByOrderId(orderId);
    }
    async findByProductId(productId) {
        return this.orderItemService.findByProductId(productId);
    }
    async getTotalByOrderId(orderId) {
        const total = await this.orderItemService.getTotalByOrderId(orderId);
        return { total };
    }
    async update(id, updateOrderItemDto) {
        return this.orderItemService.update(id, updateOrderItemDto);
    }
    async remove(id) {
        return this.orderItemService.remove(id);
    }
    async removeByOrderId(orderId) {
        return this.orderItemService.removeByOrderId(orderId);
    }
};
exports.OrderItemController = OrderItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orderItem_dto_1.CreateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('order/:orderId'),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findByProductId", null);
__decorate([
    (0, common_1.Get)('order/:orderId/total'),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "getTotalByOrderId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, orderItem_dto_1.UpdateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('order/:orderId/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "removeByOrderId", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, common_1.Controller)('order-items'),
    __metadata("design:paramtypes", [orderItem_service_1.OrderItemService])
], OrderItemController);
//# sourceMappingURL=orderItem.controller.js.map