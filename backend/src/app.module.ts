import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customer/customer.module';
import { ProductModule } from './Products/product.module';
import { OrderModule } from './Order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CustomerModule,
    ProductModule, 
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
