"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderItem_controller_1 = require("./orderItem.controller");
const orderItem_service_1 = require("./orderItem.service");
const orderItem_entity_1 = require("./orderItem.entity");
const product_entity_1 = require("../Products/product.entity");
const common_2 = require("@nestjs/common");
const order_module_1 = require("../Order/order.module");
let OrderItemModule = class OrderItemModule {
};
exports.OrderItemModule = OrderItemModule;
exports.OrderItemModule = OrderItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orderItem_entity_1.OrderItem, product_entity_1.ProductEntity]), (0, common_2.forwardRef)(() => order_module_1.OrderModule)],
        controllers: [orderItem_controller_1.OrderItemController],
        providers: [orderItem_service_1.OrderItemService],
        exports: [orderItem_service_1.OrderItemService],
    })
], OrderItemModule);
//# sourceMappingURL=orderItem.module.js.map