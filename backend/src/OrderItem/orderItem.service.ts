import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto, OrderItem } from './orderItem.dto';

@Injectable()
export class OrderItemService {
  private items: OrderItem[] = [];
  private id = 1;

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find(i => i.id === id);
  }

  create(dto: CreateOrderItemDto) {
    const item: OrderItem = { id: this.id++, ...dto };
    this.items.push(item);
    return item;
  }

  update(id: number, dto: UpdateOrderItemDto) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...dto };
    return this.items[idx];
  }

  remove(id: number) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    return this.items.splice(idx, 1)[0];
  }
}
