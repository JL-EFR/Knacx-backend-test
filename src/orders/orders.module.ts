import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '@/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrderItemsModule } from '@/order_items/order_items.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ProductsModule,
    OrderItemsModule,
    TypeOrmModule.forFeature([Orders]),
  ],
})
export class OrdersModule {}
