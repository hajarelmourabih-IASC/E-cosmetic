
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { OrderItem } from './orderitem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  // 🔹 Livraison
  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  shippingCost: number;

  //  Total de la commande (produits + livraison)
  @Column()
  total: number;

  //  Produits commandés
  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];

  // 🔹 Statut de paiement
  @Column({ default: 'pending' })
  status: 'pending' | 'paid';

  @CreateDateColumn()
  createdAt: Date;
}