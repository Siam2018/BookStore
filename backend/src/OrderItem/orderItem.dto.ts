import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  orderId?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  subtotal?: number;
}

