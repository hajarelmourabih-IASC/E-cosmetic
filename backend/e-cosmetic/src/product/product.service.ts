import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepo.findOneBy({ id });
  }

  async searchByName(name: string): Promise<Product[]> {
    if (!name) return [];

    return this.productRepo.find({
      where: { name: ILike(`%${name}%`) },
    });
  }
}

