import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({ relations: ['orderItems', 'customer'] });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ['orderItems', 'customer'] });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(dto: OrderDto): Promise<OrderEntity> {
  // Only assign fields compatible with OrderEntity
  const { customerId, total, status } = dto;
  const order = this.orderRepository.create({ customerId, total, status });
  return this.orderRepository.save(order);
  }

  async update(id: number, dto: Partial<OrderDto>): Promise<OrderEntity> {
  const order = await this.findOne(id);
  const { customerId, total, status } = dto;
  if (customerId !== undefined) order.customerId = customerId;
  if (total !== undefined) order.total = total;
  if (status !== undefined) order.status = status;
  return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
