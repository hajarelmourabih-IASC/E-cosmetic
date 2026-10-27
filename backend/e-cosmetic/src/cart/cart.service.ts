import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../cart/cart.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async addToCart(userId: number, productId: number, quantity = 1) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!user || !product) return { success: false, message: 'User or product not found' };

    let cartItem = await this.cartRepo.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepo.create({ user, product, quantity });
    }
    await this.cartRepo.save(cartItem);
    return { success: true, cartItem };
  }

  async getUserCart(userId: number) {
    return this.cartRepo.find({ where: { user: { id: userId } } });
  }
   async removeCartItem(cartItemId: number) {
  await this.cartRepo.delete(cartItemId);
  return { success: true };
}

async updateQuantity(cartItemId: number, quantity: number) {
  const item = await this.cartRepo.findOne({ where: { id: cartItemId } });
  if (!item) return { success: false, message: 'Cart item not found' };

  item.quantity = quantity;
  await this.cartRepo.save(item);
  return { success: true, item };
}


}