import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './Cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
