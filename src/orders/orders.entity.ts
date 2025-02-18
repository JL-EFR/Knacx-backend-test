import { OrderItems } from '@/order_items/order_items.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn()
  CreateAt: Date;

  @OneToMany((type) => OrderItems, (orderItems) => orderItems.Order)
  Items: OrderItems[];
}
