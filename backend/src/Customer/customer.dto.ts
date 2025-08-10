import { IsString, IsNumber, IsEmail, IsOptional, IsDateString, MinLength, MaxLength, IsBoolean, IsNotEmpty, Matches, IsUrl, IsEnum, Min } from 'class-validator';

export class CustomerDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name should not contain any numbers' })
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/.*[@#$&].*/, { message: 'Password must contain one of the special characters (@ or # or $ or &)' })
    password: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    postalCode?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Date of birth must be a valid date string YYYY-MM-DD' })
    dateOfBirth?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive' })
    @IsOptional()
    status?: 'active' | 'inactive';
}

export class UpdateCustomerStatusDto {
    @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive' })
    status: 'active' | 'inactive';
}
