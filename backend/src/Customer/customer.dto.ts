import {IsString, IsNumber, IsEmail, IsOptional, IsPhoneNumber, IsDateString, MinLength, MaxLength, IsBoolean} from 'class-validator';

export class CustomerDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    @MaxLength(15)
    phone?: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    address?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    city?: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    postalCode?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    country?: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    gender?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

}
