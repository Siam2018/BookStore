import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller("Order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }
}
