import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;
    
    @IsString()
    category: string;

    @IsNumber()
    stock: number;
}
