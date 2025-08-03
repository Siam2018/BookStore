export declare class CustomerEntity {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    imageURL: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    dateOfBirth: Date;
    gender: string;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}
