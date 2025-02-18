import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItems } from './order_items.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItems)
    private orderItemRepository: Repository<OrderItems>,
  ) {}
  async AddOrderItem(oi: OrderItems) {
    return await this.orderItemRepository.save(oi);
  }
}
