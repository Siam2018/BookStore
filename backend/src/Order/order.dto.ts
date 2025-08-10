import { IsNumber, IsString, IsArray, IsDateString, IsOptional, IsDecimal, IsPositive } from 'class-validator';

export class OrderDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    customerId: number;

    @IsArray()
    @IsOptional()
    orderItems?: number[];

    @IsDecimal({ decimal_digits: '0,2' })
    @IsPositive()
    total: number;

    @IsString()
    status: string;

    @IsDateString()
    @IsOptional()
    createdAt?: string;

    @IsDateString()
    @IsOptional()
    updatedAt?: string;
}