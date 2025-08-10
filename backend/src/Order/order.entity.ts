import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Customer } from '../Customer/customer.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  customerId: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
