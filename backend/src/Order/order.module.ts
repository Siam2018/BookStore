import {Module} from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})

export class OrderModule {}