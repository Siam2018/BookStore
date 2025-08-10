import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { OrderItemDto } from './orderItem.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({ relations: ['order', 'product'] });
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepository.findOne({ where: { id }, relations: ['order', 'product'] });
    if (!item) throw new NotFoundException('OrderItem not found');
    return item;
  }

  async create(dto: OrderItemDto): Promise<OrderItem> {
    const item = this.orderItemRepository.create(dto);
    return this.orderItemRepository.save(item);
  }

  async update(id: number, dto: Partial<OrderItemDto>): Promise<OrderItem> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.orderItemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.orderItemRepository.remove(item);
  }
}
