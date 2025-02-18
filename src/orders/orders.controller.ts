import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  post(@Body() items: OrdersDto) {
    return this.ordersService.AddOrder(items);
  }

  @Get()
  get() {
    return this.ordersService.FindAllOrder();
  }
}
