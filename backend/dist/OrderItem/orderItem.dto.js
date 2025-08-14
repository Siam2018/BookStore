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
exports.OrderItemDto = void 0;
const class_validator_1 = require("class-validator");
class OrderItemDto {
    orderId;
    productId;
    quantity;
    price;
    subtotal;
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Order ID must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Order ID must be positive' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Order ID is required' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Product ID must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Product ID must be positive' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product ID is required' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Quantity must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity is required' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Price must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Price must be positive' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Price is required' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Subtotal must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Subtotal must be positive' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Subtotal is required' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "subtotal", void 0);
//# sourceMappingURL=orderItem.dto.js.map