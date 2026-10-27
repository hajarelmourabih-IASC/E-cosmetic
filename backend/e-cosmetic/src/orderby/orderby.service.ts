import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { CartItem } from '../cart/cart.entity';
import { User } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

 
  async createOrder(data: {
    userId: number;
    fullName: string;
    phone: string;
    city: string;
    address: string;
    email?: string;
    shippingCost: number;
  }) {
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (!user) return { success: false, message: 'Utilisateur introuvable' };

    const cartItems = await this.cartRepo.find({ where: { user: { id: user.id } } });
    if (cartItems.length === 0) return { success: false, message: 'Panier vide' };

    let totalProducts = 0;
    const orderItems = cartItems.map((item) => {
      totalProducts += item.product.price * item.quantity;
      return this.orderItemRepo.create({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      });
    });

    const total = totalProducts + data.shippingCost;

    const order = this.orderRepo.create({
      user,
      fullName: data.fullName,
      phone: data.phone,
      city: data.city,
      address: data.address,
      email: data.email,
      shippingCost: data.shippingCost,
      total,
      items: orderItems,
      status: 'pending', // paiement simulé
    });

    const savedOrder = await this.orderRepo.save(order);

    // 🧹 Vider le panier
    await this.cartRepo.remove(cartItems);

    return {
      success: true,
      message: 'Commande enregistrée avec succès',
      order: savedOrder,
    };
  }

  // 🔹 Récupérer les commandes d'un utilisateur
  async getUserOrders(userId: number) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  // 🔹 Simuler paiement
  async payOrder(orderId: number) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) return { success: false, message: 'Commande introuvable' };

    order.status = 'paid';
    await this.orderRepo.save(order);

    return { success: true, message: 'Paiement effectué', order };
  }
}