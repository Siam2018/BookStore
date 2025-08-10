import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderItemService } from './orderItem.service';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItem } from './orderItem.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  findAll(): OrderItem[] {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): OrderItem | undefined {
    return this.orderItemService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateOrderItemDto): OrderItem {
    return this.orderItemService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() dto: UpdateOrderItemDto): OrderItem | null {
    return this.orderItemService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): OrderItem | null {
    return this.orderItemService.remove(id);
  }
}
