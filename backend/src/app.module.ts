import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customer/customer.module';
import { CartModule } from './Cart/cart.module';
import { ProductModule } from './Products/product.module';
import { OrderModule } from './Order/order.module';

@Module({
  imports: [CustomerModule, CartModule, ProductModule , OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
