import { Module } from '@nestjs/common';
import { OrderItemController } from './orderItem.controller';
import { OrderItemService } from './orderItem.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService]
})
export class OrderItemModule {}
