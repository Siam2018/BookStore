import {IsString, IsNumber, IsEmail} from 'class-validator';

export class CustomerDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    password: string;

}
