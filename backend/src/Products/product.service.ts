import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private id = 1;

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(p => p.id === id);
  }

  create(dto: Partial<Product>) {
    const product = { ...dto, id: this.id++ } as Product;
    this.products.push(product);
    return product;
  }

  update(id: number, dto: Partial<Product>) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...dto };
    return this.products[idx];
  }

  remove(id: number) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    return this.products.splice(idx, 1)[0];
  }
}

