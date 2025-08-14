export declare class CustomerDto {
    id?: number;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    imageURL?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    dateOfBirth?: string;
    gender?: string;
    status?: 'active' | 'inactive';
}
export declare class UpdateCustomerStatusDto {
    status: 'active' | 'inactive';
}
declare const UpdateCustomerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CustomerDto>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
export {};
