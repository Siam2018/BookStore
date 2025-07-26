import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';
import { OrderItem } from './orderItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService]
})
export class OrderItemModule {}
