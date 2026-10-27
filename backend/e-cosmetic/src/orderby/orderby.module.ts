import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { OrderService } from './orderby.service';
import { OrderController } from './orderby.controller';
import { CartItem } from '../cart/cart.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, CartItem, User]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}