import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Or, Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { OrdersDto } from './dto';
import { OrderItems } from '@/order_items/order_items.entity';
import { ProductsService } from '@/products/products.service';
import { OrderItemsService } from '@/order_items/order_items.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    private productsService: ProductsService,
    private orderItemsService: OrderItemsService,
  ) {}
  async AddOrder(items: OrdersDto) {
    const order = new Orders();
    order.Items = [];

    const saved = await this.ordersRepository.save(order);
    order.id = saved.id;
    const i = items.items.length;
    items.items.forEach(async (element) => {
      const prod = (await this.productsService.Find(element)).products;
      if (prod) {
        const oi = new OrderItems();
        oi.Product = prod;
        oi.Order = saved;
        this.orderItemsService.AddOrderItem(oi);
      }
    });
    return { message: ['Successfully add order'], statusCode: 200 };
  }

  async FindAllOrder() {
    const allorders = await this.ordersRepository.find({
      relations: { Items: { Product: true } },
    });
    return {
      message: ['Successfully find all orders'],
      Orders: allorders,
      statusCode: 200,
    };
  }
}
