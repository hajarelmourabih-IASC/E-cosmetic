import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { CartItem } from './cart/cart.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './orderby/entities/order.entity';
import { OrderItem } from './orderby/entities/orderitem.entity';

import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './orderby/orderby.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ecosmetic',
      entities: [User, CartItem, Product, Order, OrderItem], 
      synchronize: true,
      logging: true,
    }),
    UserModule,
    CartModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
