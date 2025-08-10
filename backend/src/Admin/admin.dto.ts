import { IsString, MinLength, MaxLength, IsNotEmpty, IsEmail, Matches, IsIn } from 'class-validator';

export class AdminDto {
    // Previous fields
    @IsString()
    @IsNotEmpty({ message: 'Username cannot be empty' })
    @MaxLength(100)
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'Full name cannot be empty' })
    @MaxLength(150)
    fullName: string;

    @IsString()
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Matches(/^[\w.-]+@aiub\.edu$/, { message: 'Email must contain aiub.edu' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase character' })
    adminPassword: string;

    @IsString()
    @IsIn(['male', 'female'], { message: 'Invalid gender' })
    gender: string;

    @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
    phone: string;
}



