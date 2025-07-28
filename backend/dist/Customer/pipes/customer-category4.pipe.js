"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaLinkValidationPipe = exports.DateValidationPipe = exports.PasswordValidationPipe = exports.NameValidationPipe = exports.CustomerCategory4ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CustomerCategory4ValidationPipe = class CustomerCategory4ValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const errorMessages = errors.map(error => {
                return Object.values(error.constraints || {}).join(', ');
            });
            throw new common_1.BadRequestException(`Validation failed: ${errorMessages.join('; ')}`);
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
exports.CustomerCategory4ValidationPipe = CustomerCategory4ValidationPipe;
exports.CustomerCategory4ValidationPipe = CustomerCategory4ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CustomerCategory4ValidationPipe);
let NameValidationPipe = class NameValidationPipe {
    transform(value) {
        if (typeof value.name === 'string' && /\d/.test(value.name)) {
            throw new common_1.BadRequestException('Name should not contain any numbers');
        }
        return value;
    }
};
exports.NameValidationPipe = NameValidationPipe;
exports.NameValidationPipe = NameValidationPipe = __decorate([
    (0, common_1.Injectable)()
], NameValidationPipe);
let PasswordValidationPipe = class PasswordValidationPipe {
    transform(value) {
        if (typeof value.password === 'string') {
            if (value.password.length < 6) {
                throw new common_1.BadRequestException('Password must be at least 6 characters long');
            }
            if (!/[@#$&]/.test(value.password)) {
                throw new common_1.BadRequestException('Password must contain one of the special characters (@ or # or $ or &)');
            }
        }
        return value;
    }
};
exports.PasswordValidationPipe = PasswordValidationPipe;
exports.PasswordValidationPipe = PasswordValidationPipe = __decorate([
    (0, common_1.Injectable)()
], PasswordValidationPipe);
let DateValidationPipe = class DateValidationPipe {
    transform(value) {
        if (value.dateOfBirth) {
            const date = new Date(value.dateOfBirth);
            if (isNaN(date.getTime())) {
                throw new common_1.BadRequestException('Date of birth must be a valid date');
            }
        }
        return value;
    }
};
exports.DateValidationPipe = DateValidationPipe;
exports.DateValidationPipe = DateValidationPipe = __decorate([
    (0, common_1.Injectable)()
], DateValidationPipe);
let SocialMediaLinkValidationPipe = class SocialMediaLinkValidationPipe {
    transform(value) {
        if (value.socialMediaLink) {
            try {
                const url = new URL(value.socialMediaLink);
                if (!['http:', 'https:'].includes(url.protocol)) {
                    throw new common_1.BadRequestException('Social media link must be a valid URL format');
                }
            }
            catch {
                throw new common_1.BadRequestException('Social media link must be a valid URL format');
            }
        }
        return value;
    }
};
exports.SocialMediaLinkValidationPipe = SocialMediaLinkValidationPipe;
exports.SocialMediaLinkValidationPipe = SocialMediaLinkValidationPipe = __decorate([
    (0, common_1.Injectable)()
], SocialMediaLinkValidationPipe);
//# sourceMappingURL=customer-category4.pipe.js.map