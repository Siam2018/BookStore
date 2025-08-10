import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async addProduct(productDto: ProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(productDto);
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: number, updateData: Partial<ProductDto>): Promise<ProductEntity> {
    await this.productRepository.update(id, updateData);
    return this.getProductById(id);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return !!result.affected;
  }
}

