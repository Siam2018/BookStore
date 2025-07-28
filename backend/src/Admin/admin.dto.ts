import { IsString, IsEmail, Matches, MinLength, IsIn } from 'class-validator';

export class AdminDto {
    @IsString()
    name: string;

    @IsEmail({}, { message: 'email must be a valid email address' })
    @Matches(/^[\w.-]+@aiub\.edu$/, { message: 'Email must contain aiub.edu' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Z]).+$/, { message: 'Password must contain at least one uppercase character' })
    password: string;

    @IsString()
    @IsIn(['male', 'female'], { message: 'invlid gender' })
    gender: string;

    @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
    phone: string;
}
