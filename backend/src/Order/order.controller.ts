import { Controller, Get, Param, Post, UseInterceptors, UsePipes, ValidationPipe, Body, UploadedFile, Res } from '@nestjs/common';
import { Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { MulterError, diskStorage } from 'multer';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  findAll() {
    return 'This action returns all orders';
  }

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return this.orderService.getOrderById(+id);
  }

  @Post('/addorder')
  @UsePipes(new ValidationPipe())
  addOrder(@Body() orderData: any): string {
    return this.orderService.addOrder(orderData);
  }

  @Put('/:id')
  updateOrder(@Param('id') id: string, @Body() updateData: any): string {
    return this.orderService.updateOrder(+id, updateData);
  }

  @Delete('/:id')
  deleteOrder(@Param('id') id: string): string {
    return this.orderService.deleteOrder(+id);
  }

}
