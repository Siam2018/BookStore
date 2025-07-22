import { IsString, IsNumber, IsArray, IsDateString } from "class-validator";

export class OrderDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    details: string;

    @IsNumber()
    customerId: number;

    @IsArray()
    productIds: number[];

    @IsNumber()
    totalAmount: number;

    @IsDateString()
    orderDate: string;

    @IsString()
    status: string;
}