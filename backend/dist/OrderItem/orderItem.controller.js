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
    async findAll() {
        const items = await this.orderItemService.findAll();
        return {
            message: 'Get all order items',
            data: items,
            status: 'success',
        };
    }
    async findOne(id) {
        const item = await this.orderItemService.findOne(id);
        return {
            message: `Get order item with ID: ${id}`,
            data: item,
            status: 'success',
        };
    }
    async create(dto) {
        if (Array.isArray(dto)) {
            const items = await this.orderItemService.createMany(dto);
            return {
                message: 'Order items created successfully',
                data: items,
                status: 'success',
            };
        }
        else {
            const newItem = await this.orderItemService.create(dto);
            return {
                message: 'Order item created successfully',
                data: newItem,
                status: 'success',
            };
        }
    }
    async update(id, dto) {
        const updated = await this.orderItemService.update(id, dto);
        return {
            message: 'Order item updated successfully',
            data: updated,
            status: 'success',
        };
    }
    async patch(id, dto) {
        const updated = await this.orderItemService.update(id, dto);
        return {
            message: 'Order item patched successfully',
            data: updated,
            status: 'success',
        };
    }
    async remove(id) {
        await this.orderItemService.remove(id);
        return { message: 'Order item deleted successfully', status: 'success' };
    }
};
exports.OrderItemController = OrderItemController;
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
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, orderItem_dto_1.OrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "remove", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, common_1.Controller)('orderItems'),
    __metadata("design:paramtypes", [orderItem_service_1.OrderItemService])
], OrderItemController);
//# sourceMappingURL=orderItem.controller.js.map