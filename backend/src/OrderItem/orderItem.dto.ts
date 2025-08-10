import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  orderId: number;

  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  subtotal: number;
}

export class UpdateOrderItemDto {
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  subtotal?: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
}
