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
exports.CustomerEntity = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../Order/order.entity");
let CustomerEntity = class CustomerEntity {
    id;
    role;
    fullName;
    email;
    password;
    phone;
    imageURL;
    address;
    city;
    postalCode;
    country;
    dateOfBirth;
    gender;
    status;
    orders;
    createdAt;
    updatedAt;
};
exports.CustomerEntity = CustomerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], CustomerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'customer' }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "imageURL", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], CustomerEntity.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active'
    }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, order => order.customer),
    __metadata("design:type", Array)
], CustomerEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CustomerEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CustomerEntity.prototype, "updatedAt", void 0);
exports.CustomerEntity = CustomerEntity = __decorate([
    (0, typeorm_1.Entity)('customers')
], CustomerEntity);
//# sourceMappingURL=customer.entity.js.map