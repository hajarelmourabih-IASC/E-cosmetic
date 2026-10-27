import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from '../cart/cart.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, User, Product])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

