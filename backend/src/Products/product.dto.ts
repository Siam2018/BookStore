import { IsString, IsNumber, IsOptional, IsBoolean, IsNotEmpty, IsDecimal, IsPositive, MinLength, MaxLength } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  imageURL?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  weight?: number;
}
