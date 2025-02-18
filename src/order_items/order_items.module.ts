import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from './order_items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItems])],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
