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
exports.AdminDto = void 0;
const class_validator_1 = require("class-validator");
class AdminDto {
    imageURL;
    address;
    city;
    country;
    dateOfBirth;
    username;
    fullName;
    password;
    email;
    gender;
    phone;
}
exports.AdminDto = AdminDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminDto.prototype, "imageURL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AdminDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username cannot be empty' }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], AdminDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Full name cannot be empty' }),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], AdminDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password cannot be empty' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase character' }),
    __metadata("design:type", String)
], AdminDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be a valid email address' }),
    (0, class_validator_1.Matches)(/^[\w.-]+@gmail\.com$/, { message: 'Email must contain gmail.com' }),
    __metadata("design:type", String)
], AdminDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['male', 'female'], { message: 'Invalid gender' }),
    __metadata("design:type", String)
], AdminDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'Phone number must contain only numbers' }),
    __metadata("design:type", String)
], AdminDto.prototype, "phone", void 0);
//# sourceMappingURL=admin.dto.js.map