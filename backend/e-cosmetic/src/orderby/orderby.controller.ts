import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { OrderService } from './orderby.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: any) {
    return this.orderService.createOrder(body);
  }

  @Get('user/:id')
  getUserOrders(@Param('id') id: number) {
    return this.orderService.getUserOrders(id);
  }

 
  @Patch('pay/:id')
  payOrder(@Param('id') id: number) {
    return this.orderService.payOrder(+id);
  }
}