import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItemResponseDto } from './orderItem.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    try {
      // Calculate subtotal if not provided
      if (!createOrderItemDto.subtotal) {
        createOrderItemDto.subtotal = createOrderItemDto.price * createOrderItemDto.quantity;
      }

      const orderItem = this.orderItemRepository.create(createOrderItemDto);
      const savedOrderItem = await this.orderItemRepository.save(orderItem);
      
      return this.findOne(savedOrderItem.id);
    } catch (error) {
      throw new BadRequestException('Failed to create order item: ' + error.message);
    }
  }

  async findAll(): Promise<OrderItemResponseDto[]> {
    const orderItems = await this.orderItemRepository.find({
      relations: ['product', 'order'],
      order: { createdAt: 'DESC' }
    });

    return orderItems.map(item => this.mapToResponseDto(item));
  }

  async findOne(id: number): Promise<OrderItemResponseDto> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['product', 'order']
    });

    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    return this.mapToResponseDto(orderItem);
  }

  async findByOrderId(orderId: number): Promise<OrderItemResponseDto[]> {
    const orderItems = await this.orderItemRepository.find({
      where: { orderId },
      relations: ['product'],
      order: { createdAt: 'ASC' }
    });

    return orderItems.map(item => this.mapToResponseDto(item));
  }

  async findByProductId(productId: number): Promise<OrderItemResponseDto[]> {
    const orderItems = await this.orderItemRepository.find({
      where: { productId },
      relations: ['product', 'order'],
      order: { createdAt: 'DESC' }
    });

    return orderItems.map(item => this.mapToResponseDto(item));
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItemResponseDto> {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    // Recalculate subtotal if quantity or price is updated
    if (updateOrderItemDto.quantity || updateOrderItemDto.price) {
      const newQuantity = updateOrderItemDto.quantity || orderItem.quantity;
      const newPrice = updateOrderItemDto.price || orderItem.price;
      updateOrderItemDto.subtotal = newQuantity * newPrice;
    }

    Object.assign(orderItem, updateOrderItemDto);
    await this.orderItemRepository.save(orderItem);
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    await this.orderItemRepository.remove(orderItem);
  }

  async removeByOrderId(orderId: number): Promise<void> {
    await this.orderItemRepository.delete({ orderId });
  }

  async getTotalByOrderId(orderId: number): Promise<number> {
    const result = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .select('SUM(orderItem.subtotal)', 'total')
      .where('orderItem.orderId = :orderId', { orderId })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  private mapToResponseDto(orderItem: OrderItem): OrderItemResponseDto {
    return {
      id: orderItem.id,
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      price: orderItem.price,
      subtotal: orderItem.subtotal,
      createdAt: orderItem.createdAt,
      updatedAt: orderItem.updatedAt,
      product: orderItem.product ? {
        id: orderItem.product.id,
        name: orderItem.product.name,
        price: orderItem.product.price
      } : undefined
    };
  }
}
