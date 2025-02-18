import { OrderItems } from '@/order_items/order_items.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  Name: string;

  @Column({ type: 'varchar', length: 200 })
  Description: string;

  @Column({ type: 'varchar', length: 45 })
  Category: string;

  @OneToMany((type) => OrderItems, (orderItems) => orderItems.Product)
  Items: OrderItems[];

  @CreateDateColumn()
  CreateAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
