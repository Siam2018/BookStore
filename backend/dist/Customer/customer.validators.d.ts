import { ValidationOptions } from 'class-validator';
export declare function IsNameWithoutNumbers(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsPasswordWithSpecialChar(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsValidDate(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsValidUrl(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
