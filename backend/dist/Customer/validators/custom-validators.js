"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNameWithoutNumbers = IsNameWithoutNumbers;
exports.IsPasswordWithSpecialChar = IsPasswordWithSpecialChar;
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
                validate(value, args) {
                    if (typeof value !== 'string')
                        return false;
                    return !/\d/.test(value);
                },
                defaultMessage(args) {
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
                validate(value, args) {
                    if (typeof value !== 'string')
                        return false;
                    return /[@#$&]/.test(value);
                },
                defaultMessage(args) {
                    return 'Password must contain one of the special characters (@ or # or $ or &)';
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
                validate(value, args) {
                    if (!value)
                        return true;
                    if (typeof value !== 'string')
                        return false;
                    try {
                        const url = new URL(value);
                        return ['http:', 'https:'].includes(url.protocol);
                    }
                    catch {
                        return false;
                    }
                },
                defaultMessage(args) {
                    return 'Social media link must be a valid URL format';
                },
            },
        });
    };
}
//# sourceMappingURL=custom-validators.js.map