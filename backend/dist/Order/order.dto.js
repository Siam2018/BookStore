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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const orderItem_dto_1 = require("../OrderItem/orderItem.dto");
class OrderDto {
    id;
    customerId;
    orderItems;
    total;
    status;
    createdAt;
    updatedAt;
}
exports.OrderDto = OrderDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Customer ID must be a number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => orderItem_dto_1.OrderItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "orderItems", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Total must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Total must be a positive number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Status must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    __metadata("design:type", String)
], OrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=order.dto.js.map