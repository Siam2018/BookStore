import { IsString, IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class CreateOrderItemDto {
    @IsNumber()
    @IsPositive()
    orderId: number;

    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    subtotal: number;
}

export class UpdateOrderItemDto {
    @IsNumber()
    @IsOptional()
    @IsPositive()
    orderId?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    productId?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(1)
    quantity?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    price?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    subtotal?: number;
}

export class OrderItemResponseDto {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    subtotal: number;
    createdAt: Date;
    updatedAt: Date;
    product?: {
        id: number;
        name: string;
        price: number;
    };
}
