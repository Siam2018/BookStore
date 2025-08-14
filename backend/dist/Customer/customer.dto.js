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
exports.UpdateCustomerDto = exports.UpdateCustomerStatusDto = exports.CustomerDto = void 0;
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
class CustomerDto {
    id;
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
}
exports.CustomerDto = CustomerDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CustomerDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Full name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Full name is required' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s]+$/, { message: 'Name should not contain any numbers' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters' }),
    (0, class_validator_1.Matches)(/.*[@#$&].*/, { message: 'Password must contain one of the special characters (@ or # or $ or &)' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "imageURL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Date of birth must be a valid date string YYYY-MM-DD' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['active', 'inactive'], { message: 'Status must be either active or inactive' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerDto.prototype, "status", void 0);
class UpdateCustomerStatusDto {
    status;
}
exports.UpdateCustomerStatusDto = UpdateCustomerStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(['active', 'inactive'], { message: 'Status must be either active or inactive' }),
    __metadata("design:type", String)
], UpdateCustomerStatusDto.prototype, "status", void 0);
class UpdateCustomerDto extends (0, mapped_types_1.PartialType)(CustomerDto) {
}
exports.UpdateCustomerDto = UpdateCustomerDto;
//# sourceMappingURL=customer.dto.js.map