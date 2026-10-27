import { Controller, Post, Body, Get, Param ,Delete,Patch} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() data: { userId: number; productId: number; quantity?: number }) {
    return this.cartService.addToCart(data.userId, data.productId, data.quantity);
  }

  @Get('user/:id')
  getUserCart(@Param('id') id: number) {
    return this.cartService.getUserCart(id);
  }
  @Delete(':id')
removeCartItem(@Param('id') id: number) {
  return this.cartService.removeCartItem(id);
}

@Patch(':id')
updateQuantity(
  @Param('id') id: number,
  @Body() data: { quantity: number },
) {
  return this.cartService.updateQuantity(id, data.quantity);
}
}
