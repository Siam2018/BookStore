"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
let OrderService = class OrderService {
    getOrder() {
        return 'Ready to order?';
    }
    getOrderById(orderid) {
        return `Order ID: ${orderid}`;
    }
    addOrder(orderData) {
        return `Order added with name: ${orderData.name}, details: ${orderData.details}`;
    }
    updateOrder(id, updateData) {
        return `Order ${id} updated with details: ${JSON.stringify(updateData)}`;
    }
    deleteOrder(id) {
        return `Order ${id} deleted`;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order.service.js.map