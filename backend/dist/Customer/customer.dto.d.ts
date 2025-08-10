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
