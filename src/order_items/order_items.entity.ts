import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from '@/orders/orders.entity';
import { Product } from '@/products/products.entity';

@Entity('order_items')
export class OrderItems {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn()
  CreateAt: Date;

  @ManyToOne((type) => Orders, (orders) => orders.Items)
  Order: Orders;

  @ManyToOne((type) => Product, (product) => product.Items)
  Product: Product;
}
