import { Controller, Get, Param, Post, UseInterceptors, UsePipes, ValidationPipe, Body, UploadedFile, Res } from '@nestjs/common';
import { Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { MulterError, diskStorage } from 'multer';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  findAll() {
    return 'This action returns all orders';
  }

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return this.productService.getProductById(+id);
  }

  @Post('/addproduct')
  @UsePipes(new ValidationPipe())
  addProduct(@Body() orderData: any): string {
    return this.productService.addProduct(productData);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() updateData: any): string {
    return this.productService.updateProduct(+id, updateData);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): string {
    return this.productService.deleteProduct(+id);
  }

}