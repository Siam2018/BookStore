import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  getOrder(): string {
    return 'Ready to order?';
  }

  getOrderById(orderid: number): string {
    return `Order ID: ${orderid}`;
  }

  addOrder(orderData: any): string {
    return `Order added with name: ${orderData.name}, details: ${orderData.details}`;
  }

  updateOrder(id: number, updateData: any): string {
    return `Order ${id} updated with details: ${JSON.stringify(updateData)}`;
  }

  deleteOrder(id: number): string {
    return `Order ${id} deleted`;
  }
}
