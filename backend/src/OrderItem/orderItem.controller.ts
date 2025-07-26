import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe, 
  UsePipes, 
  ValidationPipe,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { OrderItemService } from './orderItem.service';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItemResponseDto } from './orderItem.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  async findAll(): Promise<OrderItemResponseDto[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderItemResponseDto> {
    return this.orderItemService.findOne(id);
  }

  @Get('order/:orderId')
  async findByOrderId(@Param('orderId', ParseIntPipe) orderId: number): Promise<OrderItemResponseDto[]> {
    return this.orderItemService.findByOrderId(orderId);
  }

  @Get('product/:productId')
  async findByProductId(@Param('productId', ParseIntPipe) productId: number): Promise<OrderItemResponseDto[]> {
    return this.orderItemService.findByProductId(productId);
  }

  @Get('order/:orderId/total')
  async getTotalByOrderId(@Param('orderId', ParseIntPipe) orderId: number): Promise<{ total: number }> {
    const total = await this.orderItemService.getTotalByOrderId(orderId);
    return { total };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto
  ): Promise<OrderItemResponseDto> {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderItemService.remove(id);
  }

  @Delete('order/:orderId/all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeByOrderId(@Param('orderId', ParseIntPipe) orderId: number): Promise<void> {
    return this.orderItemService.removeByOrderId(orderId);
  }
}
