import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class CustomerCategory4ValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
export declare class NameValidationPipe implements PipeTransform {
    transform(value: any): any;
}
export declare class PasswordValidationPipe implements PipeTransform {
    transform(value: any): any;
}
export declare class DateValidationPipe implements PipeTransform {
    transform(value: any): any;
}
export declare class SocialMediaLinkValidationPipe implements PipeTransform {
    transform(value: any): any;
}
