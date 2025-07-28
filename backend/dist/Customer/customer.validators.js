"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNameWithoutNumbers = IsNameWithoutNumbers;
exports.IsPasswordWithSpecialChar = IsPasswordWithSpecialChar;
exports.IsValidDate = IsValidDate;
exports.IsValidUrl = IsValidUrl;
const class_validator_1 = require("class-validator");
function IsNameWithoutNumbers(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNameWithoutNumbers',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && !/\d/.test(value);
                },
                defaultMessage() {
                    return 'Name should not contain any numbers';
                },
            },
        });
    };
}
function IsPasswordWithSpecialChar(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isPasswordWithSpecialChar',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && /[@#$&]/.test(value);
                },
                defaultMessage() {
                    return 'Password must contain one of the special characters (@ or # or $ or &)';
                },
            },
        });
    };
}
function IsValidDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (!value)
                        return true;
                    const date = new Date(value);
                    return !isNaN(date.getTime()) && date.toString() !== 'Invalid Date';
                },
                defaultMessage() {
                    return 'Date must be a valid date type';
                },
            },
        });
    };
}
function IsValidUrl(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidUrl',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (!value)
                        return true;
                    try {
                        new URL(value);
                        return true;
                    }
                    catch {
                        return false;
                    }
                },
                defaultMessage() {
                    return 'Social media link must be a valid URL format';
                },
            },
        });
    };
}
//# sourceMappingURL=customer.validators.js.map