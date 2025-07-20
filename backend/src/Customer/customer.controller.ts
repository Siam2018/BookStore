import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  @Get()
  findAll() {
    return 'This action returns all customers';
  }
}