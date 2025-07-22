import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body, Put, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { MulterError, diskStorage } from 'multer';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  findAll() {
    return 'This action returns all orders';
  }

  @Get('/:orderId')
  findOne(@Param('orderId') orderId: string): string {
    return this.orderService.getOrderById(+orderId);
  }

  @Post('/addorder')
  @UsePipes(new ValidationPipe())
  addOrder(@Body() orderData: OrderDto): string {
    return this.orderService.addOrder(orderData);
  }

  @Put('/:orderId')
  @UsePipes(new ValidationPipe())
  updateOrder(@Param('orderId') orderId: string, @Body() updateData: OrderDto): string {
    return this.orderService.updateOrder(+orderId, updateData);
  }

  @Delete('/:orderId')
  deleteOrder(@Param('orderId') orderId: string): string {
    return this.orderService.deleteOrder(+orderId);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null, true);
      else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 30000 },
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      },
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return `Uploaded file: ${file.originalname}`;
  }

  @Get('/getfile/:filename')
  getFile(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }
}
