import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProduct(): string {
    return 'Want to add product?';
  }

  getProductById(productid: number): string {
    return `Product ID: ${productid}`;
  }

  addProduct(productData: any): string {
    return `Product added with name: ${productData.name}, details: ${productData.details}`;
  }

  updateProduct(id: number, updateData: any): string {
    return `Product ${id} updated with details: ${JSON.stringify(updateData)}`;
  }

  deleteProduct(id: number): string {
    return `Product ${id} deleted`;
  }
}
